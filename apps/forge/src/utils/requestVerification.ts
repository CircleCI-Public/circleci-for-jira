import { fetch, storage } from '@forge/api';
import jwkToPem, { RSA } from 'jwk-to-pem';
import { decode, verify } from 'jws';

import { STORAGE_KEY } from '../constants/storage';
import * as Errors from '../types/errors';
import { CircleCiTokenPayload, JWKS, UserConfiguration, WebTriggerRequest } from '../types/types';
import { isBuildPayload, isDeploymentPayload } from './payloadUtils';

export function verifyBody(request: WebTriggerRequest): void {
  if (request.body === undefined) throw new Errors.MissingRequestBodyError();
  if (request.body === '') throw new Errors.EmptyRequestBodyError();
  const reqBody: unknown = JSON.parse(request.body);
  if (!isBuildPayload(reqBody) && !isDeploymentPayload(reqBody))
    throw new Errors.InvalidPayloadError();
}

export async function verifyAuth(request: WebTriggerRequest): Promise<void> {
  const authHeader = request.headers.authorization;
  if (authHeader === undefined) throw new Errors.MissingAuthHeaderError();
  if (authHeader.length === 0 || authHeader[0] === '') throw new Errors.EmptyAuthHeaderError();

  const userConfig = await getUserConfig();
  const orgId = userConfig?.organizationId;
  const jwtAudience = userConfig?.audience;

  if (!orgId || typeof orgId !== 'string' || orgId.trim() === '')
    throw new Errors.MissingOrganizationIdError();
  if (!jwtAudience || typeof jwtAudience !== 'string' || jwtAudience.trim() === '')
    throw new Errors.MissingJwtAudienceError();

  const token = authHeader[0];
  const decodedToken = decode(token);
  const kid = decodedToken?.header.kid;
  if (kid === undefined) throw new Errors.MissingKeyIdError();

  const jwksUri = `https://oidc.circleci.com/org/${orgId}/.well-known/jwks-pub.json`;
  const jwk = await getJwk(jwksUri, kid);
  const pem = jwkToPem(jwk);

  const isTokenSignatureValid = verify(token, 'RS256', pem);
  if (!isTokenSignatureValid) throw new Errors.InvalidTokenSignatureError();

  const tokenPayload = decodedToken?.payload as CircleCiTokenPayload;
  if (tokenPayload === undefined) throw new Errors.EmptyTokenPayloadError();

  const tokenExpiration = tokenPayload.exp ?? 0;
  const isTokenExpirationValid = verifyExpiration(tokenExpiration);
  if (!isTokenExpirationValid) throw new Errors.TokenExpiredError();

  const tokenIssuer = tokenPayload.iss ?? '';
  const isTokenIssuerValid = verifyIssuer(tokenIssuer, `https://oidc.circleci.com/org/${orgId}`);
  if (!isTokenIssuerValid) throw new Errors.InvalidTokenIssuerError();

  const tokenAudience = tokenPayload.aud ?? '';
  const isTokenAudienceValid = verifyAudience(tokenAudience, jwtAudience);
  if (!isTokenAudienceValid) throw new Errors.InvalidTokenAudienceError();
}

function verifyExpiration(tokenExpiration: number): Boolean {
  const now = Date.now() / 1000;
  return tokenExpiration > now;
}

function verifyIssuer(tokenIssuer: string, expectedIssuer: string): Boolean {
  return tokenIssuer === expectedIssuer;
} 

function verifyAudience(tokenAudience: string, expectedAudience: string): Boolean {
  return tokenAudience === expectedAudience;
}

async function getJwk(uri: string, kid: string): Promise<RSA> {
  const response = await fetch(uri);
  if (!response.ok) throw new Errors.FailedToFetchJwksError(uri);

  const jwks = (await response.json()) as JWKS;
  const jwk = jwks.keys.find(key => key.kid === kid);
  if (jwk === undefined) throw new Errors.FailedToFindJwkError(kid);
  return { e: jwk.e, kty: 'RSA', n: jwk.n };
}

async function getUserConfig(): Promise<UserConfiguration | undefined> {
  return await storage.get(STORAGE_KEY);
}

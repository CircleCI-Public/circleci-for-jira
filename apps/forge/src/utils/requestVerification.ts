import { decode, verify } from 'jsonwebtoken';
import jwkToPem, { RSA } from 'jwk-to-pem';
import { fetch } from '@forge/api';

import * as Errors from '../types/errors';
import { JWKS, WebTriggerRequest } from '../types/types';
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

  const orgId = getOrganizationId();
  if (orgId === '') throw new Errors.MissingOrganizationIdError();

  const token = authHeader[0];
  const decodedToken = decode(token, { complete: true });
  const kid = decodedToken?.header.kid;
  if (kid === undefined) throw new Errors.MissingKeyIdError();

  const jwksUri = `https://oidc.circleci.com/org/${orgId}/.well-known/jwks-pub.json`;
  const jwk = await getJwk(jwksUri, kid);
  const pem = jwkToPem(jwk);

  const verifiedToken = verify(token, pem, {
    algorithms: ['RS256'],
    audience: [orgId],
    issuer: [`https://oidc.circleci.com/org/${orgId}`],
  });
  if (verifiedToken === undefined) throw new Errors.InvalidTokenError();
}

async function getJwk(uri: string, kid: string): Promise<RSA> {
  const response = await fetch(uri);
  if (!response.ok) throw new Errors.FailedToFetchJwksError(uri);

  const jwks = (await response.json()) as JWKS;
  const jwk = jwks.keys.find(key => key.kid === kid);
  if (jwk === undefined) throw new Errors.FailedToFindJwkError(kid);
  return { e: jwk.e, kty: 'RSA', n: jwk.n };
}

function getOrganizationId(): string {
  // Temporary solution until we have a better way to get the organization ID
  // We will likely use the storage API to store and retrieve it in the future
  return process.env.ORGANIZATION_ID ?? '';
}

declare global {
  // eslint-disable-next-line no-var
  var requestId: string;
  // eslint-disable-next-line no-var
  var verbosity: LoggingLevel;
}

export interface WebTriggerRequest {
  queryParameters: {
    verbosity?: string[];
  };
  headers: {
    authorization: string[];
  };
  body: string;
}

export interface WebTriggerResponse {
  body: string;
  statusCode: number;
  headers: { 'Content-Type': string[] };
}

export interface ForgeTriggerContext {
  installContext: string;
}

export interface BuildPayload {
  properties: {
    accountId: string;
    projectId: string;
  };
  builds: Build[];
  providerMetadata: {
    product: string;
  };
}

interface Build {
  schemaVersion: string;
  pipelineId: string;
  buildNumber: number;
  updateSequenceNumber: number;
  displayName: string;
  description: string;
  label: string;
  url: string;
  state: string;
  lastUpdated: string;
  issueKeys: string[];
  testInfo: {
    totalNumber: number;
    numberPassed: number;
    numberFailed: number;
    numberSkipped: number;
  };
  references: Reference[];
}

interface Reference {
  commit: {
    id: string;
    repositoryUri: string;
  };
  ref: {
    name: string;
    uri: string;
  };
}

export interface DeploymentPayload {
  deployments: Deployment[];
  providerMetadata: {
    product: string;
  };
}

interface Deployment {
  deploymentSequenceNumber: number;
  updateSequenceNumber: number;
  associations: Association[];
  displayName: string;
  url: string;
  description: string;
  lastUpdated: string;
  label: string;
  state: string;
  pipeline: {
    id: string;
    displayName: string;
    url: string;
  };
  environment: {
    id: string;
    displayName: string;
    type: string;
  };
  schemaVersion: string;
}

interface Association {
  associationType: string;
  values: string[];
}

export interface JWKS {
  keys: Key[];
}

interface Key {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
}

export enum LoggingLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  LOG = 4,
}

export interface UserConfiguration {
  organizationId?: string;
  audience?: string;
}

export interface SetStorageValuePayload {
  storageKey: string;
  storageValue: unknown;
}

export interface CircleCiTokenPayload {
  aud: string
  exp: number
  iat: number
  iss: string
  "oidc.circleci.com/context-ids": string[]
  "oidc.circleci.com/project-id": string
  "oidc.circleci.com/ssh-rerun": boolean
  "oidc.circleci.com/vcs-origin": string
  "oidc.circleci.com/vcs-ref": string
  sub: string
}

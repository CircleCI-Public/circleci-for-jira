export interface WebTriggerRequest {
  queryParameters: {
    debug?: string[];
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

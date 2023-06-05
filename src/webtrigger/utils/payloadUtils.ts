import { BuildPayload, DeploymentPayload } from '../types/types';

export function resolveEndpoint(payload: BuildPayload | DeploymentPayload | unknown): string {
  if (isBuildPayload(payload)) return 'builds';
  if (isDeploymentPayload(payload)) return 'deployments';
  return '';
}

export function isBuildPayload(payload: unknown): payload is BuildPayload {
  return (
    (payload as BuildPayload).builds !== undefined &&
    Array.isArray((payload as BuildPayload).builds)
  );
}

export function isDeploymentPayload(payload: unknown): payload is DeploymentPayload {
  return (
    (payload as DeploymentPayload).deployments !== undefined &&
    Array.isArray((payload as DeploymentPayload).deployments)
  );
}

import {
  EmptyRequestBodyError,
  InvalidPayloadError,
  MissingRequestBodyError,
} from '../types/errors';
import { WebTriggerRequest } from '../types/types';
import { isBuildPayload, isDeploymentPayload } from './payloadUtils';

export function validateRequest(request: WebTriggerRequest): void {
  if (request.body === undefined) throw new MissingRequestBodyError();
  if (request.body === '') throw new EmptyRequestBodyError();
  const reqBody: unknown = JSON.parse(request.body);
  if (!isBuildPayload(reqBody) && !isDeploymentPayload(reqBody)) throw new InvalidPayloadError();
}

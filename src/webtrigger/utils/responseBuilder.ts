import {
  EmptyRequestBodyError,
  InvalidPayloadError,
  MissingRequestBodyError,
} from '../types/errors';
import { WebTriggerResponse } from '../types/types';

export function buildResponse(body: object | string, statusCode: number): WebTriggerResponse {
  return {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    statusCode,
    headers: { 'Content-Type': ['application/json'] },
  };
}

export function buildErrorResponse(error: unknown): WebTriggerResponse {
  if (error instanceof MissingRequestBodyError || error instanceof EmptyRequestBodyError) {
    return buildResponse({ error: error.message }, 400);
  }

  if (error instanceof InvalidPayloadError) {
    return buildResponse(
      {
        error: error.message,
        message:
          "See 'https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds' for build and 'https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments' for deployment examples.",
      },
      400,
    );
  }

  return buildResponse(
    {
      error: `An unexpected error occurred. Please try again or open an issue. ${
        (<Error>error).message
      }`,
    },
    500,
  );
}

import { TokenExpiredError } from 'jsonwebtoken';

import * as Errors from '../types/errors';
import { WebTriggerResponse } from '../types/types';

export function buildResponse(body: object | string, statusCode: number): WebTriggerResponse {
  return {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    statusCode,
    headers: { 'Content-Type': ['application/json'] },
  };
}

export function buildErrorResponse(error: unknown): WebTriggerResponse {
  if (
    error instanceof Errors.MissingRequestBodyError ||
    error instanceof Errors.EmptyRequestBodyError
  ) {
    return buildResponse({ error: error.message }, 400);
  }

  if (error instanceof Errors.InvalidPayloadError) {
    return buildResponse(
      {
        error: error.message,
        message:
          "See 'https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds' for build and 'https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments' for deployment examples.",
      },
      400,
    );
  }

  if (error instanceof TokenExpiredError) {
    return buildResponse(
      { error: error.message, message: 'Please try again with a new token.' },
      401,
    );
  }

  if (
    error instanceof Errors.EmptyAuthHeaderError ||
    error instanceof Errors.FailedToFindJwkError ||
    error instanceof Errors.InvalidTokenError ||
    error instanceof Errors.MissingAuthHeaderError ||
    error instanceof Errors.MissingKeyIdError
  ) {
    return buildResponse({ error: error.message }, 401);
  }

  if (
    error instanceof Errors.MissingOrganizationIdError ||
    error instanceof Errors.FailedToFetchJwksError
  ) {
    return buildResponse({ error: error.message }, 500);
  }

  return buildResponse(
    {
      error: 'An unexpected error occurred. Please try again or open an issue.',
      message: (<Error>error).message,
      stack: (<Error>error).stack,
      name: (<Error>error).name,
    },
    500,
  );
}

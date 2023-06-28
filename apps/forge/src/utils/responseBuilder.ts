import * as Errors from '../types/errors';
import { WebTriggerResponse } from '../types/types';

export function buildResponse(body: object | string, statusCode: number): WebTriggerResponse {
  return {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    statusCode,
    headers: { 'Content-Type': ['application/json'] },
  };
}

export function buildErrorResponse(error: Error, requestId: string): WebTriggerResponse {
  // If it is a known error, fetch the status code from the error.
  // If it is a third party error, map it to the proper status code.
  // Otherwise, default to 500.
  const statusCode = isKnownError(error, Errors)
    ? (error as Errors.WebTriggerErrorResponse).statusCode
    : Errors.getThirdPartyErrorMap().get(error.constructor) ?? 500;

  return buildResponse(
    {
      error: error.name,
      message: error.message,
      stack: error.stack,
      requestId,
    },
    statusCode,
  );
}

function isKnownError(error: Error, errors: typeof Errors) {
  return Object.values(errors).some(
    errorType =>
      error instanceof Error && typeof errorType === 'function' && error.constructor === errorType,
  );
}

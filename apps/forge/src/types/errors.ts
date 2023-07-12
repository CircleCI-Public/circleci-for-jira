import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export class WebTriggerErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class MissingRequestBodyError extends WebTriggerErrorResponse {
  constructor() {
    super('Invalid request. Request body is missing.', 400);
    this.name = 'MissingRequestBodyError';
  }
}

export class EmptyRequestBodyError extends WebTriggerErrorResponse {
  constructor() {
    super('Invalid request. Request body is empty.', 400);
    this.name = 'EmptyRequestBodyError';
  }
}

export class InvalidPayloadError extends WebTriggerErrorResponse {
  constructor() {
    super(
      "See 'https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds' for build and 'https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments' for deployment examples.",
      400,
    );
    this.name = 'InvalidPayloadError';
  }
}

export class MissingAuthHeaderError extends WebTriggerErrorResponse {
  constructor() {
    super('Invalid request. Authorization header is missing.', 401);
    this.name = 'MissingAuthHeaderError';
  }
}

export class EmptyAuthHeaderError extends WebTriggerErrorResponse {
  constructor() {
    super('Invalid request. Authorization header is empty.', 401);
    this.name = 'EmptyAuthHeaderError';
  }
}

export class MissingKeyIdError extends WebTriggerErrorResponse {
  constructor() {
    super("Invalid request. 'kid' is missing in the JWT header.", 401);
    this.name = 'MissingKeyIdError';
  }
}

export class MissingOrganizationIdError extends WebTriggerErrorResponse {
  constructor() {
    super(
      'The Organization ID is missing. Ensure that the Organization ID is set in the Forge App Configuration page.',
      500,
    );
    this.name = 'MissingOrganizationIdError';
  }
}

export class MissingJwtAudienceError extends WebTriggerErrorResponse {
  constructor() {
    super(
      'The JWT Audience is missing. Ensure that the JWT audience is set in the Forge App Configuration page.',
      500,
    );
    this.name = 'MissingJwtAudienceError';
  }
}

export class InvalidTokenError extends WebTriggerErrorResponse {
  constructor() {
    super('Invalid request. JWT is invalid.', 401);
    this.name = 'InvalidTokenError';
  }
}

export class FailedToFetchJwksError extends WebTriggerErrorResponse {
  constructor(uri: string) {
    super(`Failed to fetch JWKS from ${uri}.`, 500);
    this.name = 'FailedToFetchJwksError';
  }
}

export class FailedToFindJwkError extends WebTriggerErrorResponse {
  constructor(kid: string) {
    super(`Failed to find JWK with kid "${kid}" in JWKS.`, 401);
    this.name = 'FailedToFindJwkError';
  }
}

export function getThirdPartyErrorMap(): Map<unknown, number> {
  return new Map<unknown, number>([
    [TokenExpiredError, 401],
    [JsonWebTokenError, 401],
  ]);
}

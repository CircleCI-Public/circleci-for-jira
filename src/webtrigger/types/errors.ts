export class MissingRequestBodyError extends Error {
  constructor() {
    super('Invalid request. Request body is missing.');
    this.name = 'MissingRequestBodyError';
  }
}

export class EmptyRequestBodyError extends Error {
  constructor() {
    super('Invalid request. Request body is empty.');
    this.name = 'EmptyRequestBodyError';
  }
}

export class InvalidPayloadError extends Error {
  constructor() {
    super('Invalid request. Request body is not a valid build or deployment payload.');
    this.name = 'InvalidPayloadError';
  }
}

export class MissingAuthHeaderError extends Error {
  constructor() {
    super('Invalid request. Authorization header is missing.');
    this.name = 'MissingAuthHeaderError';
  }
}

export class EmptyAuthHeaderError extends Error {
  constructor() {
    super('Invalid request. Authorization header is empty.');
    this.name = 'EmptyAuthHeaderError';
  }
}

export class MissingKeyIdError extends Error {
  constructor() {
    super("Invalid request. 'kid' is missing in the JWT header.");
    this.name = 'MissingKeyIdError';
  }
}

export class MissingOrganizationIdError extends Error {
  constructor() {
    super(
      'Server error. Organization ID is missing. Please open an issue on GitHub or contact support.',
    );
    this.name = 'MissingOrganizationIdError';
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid request. JWT is invalid.');
    this.name = 'InvalidTokenError';
  }
}

export class FailedToFetchJwksError extends Error {
  constructor(uri: string) {
    super(`Failed to fetch JWKS from ${uri}.`);
    this.name = 'FailedToFetchJwksError';
  }
}

export class FailedToFindJwkError extends Error {
  constructor(kid: string) {
    super(`Failed to find JWK with kid ${kid} in JWKS.`);
    this.name = 'FailedToFindJwkError';
  }
}

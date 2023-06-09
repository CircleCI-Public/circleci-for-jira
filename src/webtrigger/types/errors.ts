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

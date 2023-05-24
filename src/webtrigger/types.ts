export interface WebTriggerRequest {
  queryParameters: object;
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

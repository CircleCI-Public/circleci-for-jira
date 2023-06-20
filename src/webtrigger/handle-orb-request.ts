import { v4 as uuidv4 } from 'uuid';

import {
  ForgeTriggerContext,
  LoggingLevel,
  WebTriggerRequest,
  WebTriggerResponse,
} from './types/types';
import { extractCloudIdFromContext } from './utils/contextUtils';
import { parseLevel, printDebug, printError } from './utils/logger';
import { resolveEventType } from './utils/payloadUtils';
import { verifyAuth, verifyBody } from './utils/requestVerification';
import { buildErrorResponse, buildResponse } from './utils/responseBuilder';

export async function handleOrbRequest(
  request: WebTriggerRequest,
  context: ForgeTriggerContext,
): Promise<WebTriggerResponse> {
  global.requestId = uuidv4();
  global.verbosity = parseLevel(request.queryParameters.verbosity?.[0]);

  try {
    await verifyAuth(request);
    verifyBody(request);

    const cloudId = extractCloudIdFromContext(context);
    const payload: unknown = JSON.parse(request.body);
    const eventType = resolveEventType(payload);
    const endpoint = `/jira/${eventType}/0.1/cloud/${cloudId}/bulk`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: required so that Typescript doesn't complain about the missing "api" property
    const response = await global.api.asApp().__requestAtlassian(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return buildResponse(
      {
        ...(await response.json()),
        ...(global.verbosity === LoggingLevel.DEBUG ? { cloudId } : {}),
        ...(global.verbosity === LoggingLevel.DEBUG ? { eventType } : {}),
        ...(global.verbosity === LoggingLevel.DEBUG ? { jiraRequestBody: payload } : {}),
        ...(global.verbosity === LoggingLevel.DEBUG ? { jiraRequestEndpoint: endpoint } : {}),
        ...(global.verbosity === LoggingLevel.DEBUG ? { jiraResponseMetadata: response } : {}),
        ...(global.verbosity === LoggingLevel.DEBUG ? { orbRequestMetadata: request } : {}),
        requestId,
      },
      response.status,
    );
  } catch (error) {
    printError(error as Error);
    printDebug(request);
    return buildErrorResponse(error as Error, requestId);
  }
}

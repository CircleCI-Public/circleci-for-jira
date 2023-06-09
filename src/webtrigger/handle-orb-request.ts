import { ForgeTriggerContext, WebTriggerRequest, WebTriggerResponse } from './types/types';
import { extractCloudIdFromContext } from './utils/contextUtils';
import { resolveEventType } from './utils/payloadUtils';
import { validateRequest } from './utils/requestValidation';
import { buildErrorResponse, buildResponse } from './utils/responseBuilder';

export async function handleOrbRequest(
  request: WebTriggerRequest,
  context: ForgeTriggerContext,
): Promise<WebTriggerResponse> {
  try {
    validateRequest(request);

    const cloudId = extractCloudIdFromContext(context);
    const payload: unknown = JSON.parse(request.body);
    const eventType = resolveEventType(payload);
    const endpoint = `/jira/${eventType}/0.1/cloud/${cloudId}/bulk`;
    const isDebug = request.queryParameters.debug?.[0] === 'true';
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
        ...(isDebug ? { cloudId } : {}),
        ...(isDebug ? { eventType } : {}),
        ...(isDebug ? { jiraRequestBody: payload } : {}),
        ...(isDebug ? { jiraRequestEndpoint: endpoint } : {}),
        ...(isDebug ? { jiraResponseMetadata: response } : {}),
        ...(isDebug ? { orbRequestMetadata: request } : {}),
      },
      response.status,
    );
  } catch (error) {
    return buildErrorResponse(error);
  }
}

import { ForgeTriggerContext, WebTriggerRequest, WebTriggerResponse } from './types/types';
import { extractCloudIdFromContext } from './utils/contextUtils';
import { resolveEndpoint } from './utils/payloadUtils';
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
    const endpoint = resolveEndpoint(payload);
    const url = `/jira/${endpoint}/0.1/cloud/${cloudId}/bulk`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: required so that Typescript doesn't complain about the missing "api" property
    const response = await global.api.asApp().__requestAtlassian(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return buildResponse(
      {
        jiraResponse: await response.json(),
        jiraRequestEndpoint: url,
        cloudId,
        jiraRequestBody: payload,
      },
      response.status,
    );
  } catch (error) {
    return buildErrorResponse(error);
  }
}

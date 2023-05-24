import { webTrigger } from '@forge/api';
import { ForgeTriggerContext, WebTriggerRequest, WebTriggerResponse } from './types';

export async function handleOrbRequest(
  request: WebTriggerRequest,
  context: ForgeTriggerContext,
): Promise<WebTriggerResponse> {
  console.log('request', request);
  console.log('');
  console.log('context', context);
  console.log('');
  console.log('webTriggerUrl', await webTrigger.getUrl('orb-webtrigger'));

  return {
    body: JSON.stringify({ message: "Hello from CPE's app!" }),
    statusCode: 200,
    headers: { 'Content-Type': ['application/json'] },
  };
}

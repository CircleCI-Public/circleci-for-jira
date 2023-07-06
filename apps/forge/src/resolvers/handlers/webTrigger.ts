import { webTrigger } from '@forge/api';
import { printError, printLog } from '../../utils/logger';

export async function getWebTriggerUrl({ payload, context }: { payload: any; context: any }) {
  printLog('getWebTriggerUrl - Context', context);
  printLog('getWebTriggerUrl - Payload', payload);

  const moduleKey: string = payload.moduleKey;
  if (!moduleKey) {
    const errorMessage = 'No module key provided. Please provide one and try again.';
    printError(errorMessage);
    return { error: errorMessage };
  }

  const url = await webTrigger.getUrl(moduleKey);
  printLog('getWebTriggerUrl - URL', url);
  return { url };
}

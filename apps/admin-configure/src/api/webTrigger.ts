import { invoke } from '@forge/bridge';

interface GetWebTriggerUrlResponse {
  error: string;
  url: string;
}

export async function getWebTriggerUrl(moduleKey: string): Promise<string> {
  const { error, url }: GetWebTriggerUrlResponse = await invoke('getWebTriggerUrl', {
    moduleKey,
  });

  if (error) throw new Error(error);
  return url;
}

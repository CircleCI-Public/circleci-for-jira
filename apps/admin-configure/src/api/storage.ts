import { invoke } from '@forge/bridge';

import FormData from '../types/FormData';

interface GetItemResponse {
  error: string;
  storageValue: { organizationId: string; audience: string };
}

interface SetItemResponse {
  error: string | undefined;
}

export async function getItem(storageKey: string): Promise<FormData> {
  const { error, storageValue }: GetItemResponse = await invoke('getStorageValue', {
    storageKey,
  });

  if (error) throw new Error(error);
  return storageValue;
}

export async function setItem(storageKey: string, storageValue: unknown): Promise<void> {
  const { error }: SetItemResponse = await invoke('setStorageValue', {
    storageKey,
    storageValue,
  });

  if (error) throw new Error(error);
}

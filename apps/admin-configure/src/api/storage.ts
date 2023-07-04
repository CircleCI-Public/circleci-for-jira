import { invoke } from '@forge/bridge';

interface GetStorageValueResponse {
  error: string;
  storageValue: { organizationId: string; audience: string };
}

interface SetStorageValueResponse {
  error: string | undefined;
}

export async function getStorageValue(storageKey: string): Promise<GetStorageValueResponse> {
  const { error, storageValue }: GetStorageValueResponse = await invoke('getStorageValue', {
    storageKey,
  });

  return { error, storageValue };
}

export async function setStorageValue(
  storageKey: string,
  storageValue: string,
): Promise<SetStorageValueResponse> {
  const { error }: SetStorageValueResponse = await invoke('setStorageValue', {
    storageKey,
    storageValue,
  });

  return { error };
}

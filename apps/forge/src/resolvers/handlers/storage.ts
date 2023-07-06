import { storage } from '@forge/api';
import { SetStorageValuePayload } from '../../types/types';
import { printError, printLog } from '../../utils/logger';

export async function getStorageValue({ payload, context }: { payload: any; context: any }) {
  printLog('getStorageValue - Context', context);
  printLog('getStorageValue - Payload', payload);

  const storageKey: string = payload.storageKey;
  if (!storageKey) {
    const errorMessage = 'No storage key provided. Please provide one and try again.';
    printError(errorMessage);
    return { error: errorMessage };
  }

  const storageValue = await storage.get(storageKey);
  printLog('getStorageValue - Storage Value', storageValue);
  return { storageValue };
}

export async function setStorageValue({ payload, context }: { payload: any; context: any }) {
  printLog('setStorageValue - Context', context);
  printLog('setStorageValue - Payload', payload);

  const { storageKey, storageValue } = payload as SetStorageValuePayload;
  if (!storageKey) {
    const errorMessage = 'No storage key provided. Please provide one and try again.';
    printError(errorMessage);
    return { error: errorMessage };
  }

  await storage.set(storageKey, storageValue);
}

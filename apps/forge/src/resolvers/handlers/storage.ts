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



  // Type narrowing before using storage.set
  if (
    typeof storageValue === 'string' || 
    typeof storageValue === 'number' || 
    typeof storageValue === 'boolean' ||
    Array.isArray(storageValue) ||
    (storageValue !== null && typeof storageValue === 'object')
  ) {
    await storage.set(storageKey, storageValue);
    return { success: true };
  } else {
    const errorMessage = 'Invalid storage value type';
    printError(errorMessage);
    return { error: errorMessage };
  }
}
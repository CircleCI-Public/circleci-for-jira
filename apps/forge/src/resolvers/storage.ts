import { storage } from '@forge/api';
import Resolver from '@forge/resolver';
import { SetStorageValuePayload } from '../types/types';
import { printError, printLog } from '../utils/logger';

const resolver = new Resolver();

resolver.define('getStorageValue', async ({ payload, context }) => {
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
});

resolver.define('setStorageValue', async ({ payload, context }) => {
  printLog('setStorageValue - Context', context);
  printLog('setStorageValue - Payload', payload);

  const { storageKey, storageValue } = payload as SetStorageValuePayload;
  if (!storageKey) {
    const errorMessage = 'No storage key provided. Please provide one and try again.';
    printError(errorMessage);
    return { error: errorMessage };
  }

  await storage.set(storageKey, storageValue);
});

export const storageHandler = resolver.getDefinitions();

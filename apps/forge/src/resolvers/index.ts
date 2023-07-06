import Resolver from '@forge/resolver';
import { getStorageValue, setStorageValue } from './handlers/storage';
import { getWebTriggerUrl } from './handlers/webTrigger';

const resolver = new Resolver();

resolver.define('getStorageValue', async ({ payload, context }) => {
  return await getStorageValue({ payload, context });
});

resolver.define('setStorageValue', async ({ payload, context }) => {
  return await setStorageValue({ payload, context });
});

resolver.define('getWebTriggerUrl', async ({ payload, context }) => {
  return await getWebTriggerUrl({ payload, context });
});

export const handler = resolver.getDefinitions();

import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', req => {
  console.log(req);
  return 'Hello from the storage resolver!';
});

export const storageHandler = resolver.getDefinitions();

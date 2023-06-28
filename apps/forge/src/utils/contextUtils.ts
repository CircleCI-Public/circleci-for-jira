import { ForgeTriggerContext } from '../types/types';

export function extractCloudIdFromContext(context: ForgeTriggerContext): string {
  return context.installContext.replace('ari:cloud:jira::site/', '');
}

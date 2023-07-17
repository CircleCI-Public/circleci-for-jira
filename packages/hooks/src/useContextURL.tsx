import { useContext } from './useContext';

type AppUrls = {
  configure: string;
  getStarted: string;
};

export const useContextURL = (): AppUrls | null => {
  const context = useContext();

  if (context.isError) {
    console.error('Failed to fetch context', context.error);
    return null;
  }

  if (context.isLoading) {
    return { configure: 'Loading...', getStarted: 'Loading...' };
  }

  if (!context.data) {
    return { configure: 'No data', getStarted: 'No data' };
  }

  const { siteUrl = '', localId = '' } = context.data;

  if (typeof localId !== 'string' || !localId.includes('extension/')) {
    console.error('Unexpected localId format', localId);
    return null;
  }

  const localIdExtension = localId.split('extension/')[1];
  const appUrls: AppUrls = {
    configure: `${siteUrl}/jira/settings/apps/configure/${localIdExtension}`,
    getStarted: `${siteUrl}/jira/settings/apps/get-started/${localIdExtension}`,
  };

  return appUrls;
};

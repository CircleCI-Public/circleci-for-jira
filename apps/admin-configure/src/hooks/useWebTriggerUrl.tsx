import { useQuery } from '@tanstack/react-query';

import { getWebTriggerUrl } from '../api/webTrigger';
import { WEB_TRIGGER_QUERY_ERROR } from '../constants/errors';
import { WEB_TRIGGER_MODULE_KEY } from '../constants/forge';

const useWebTriggerUrl = () => {
  const { data, ...queryInfo } = useQuery({
    meta: { errorMessage: WEB_TRIGGER_QUERY_ERROR },
    queryFn: () => getWebTriggerUrl(WEB_TRIGGER_MODULE_KEY),
    queryKey: ['webTriggerUrl', WEB_TRIGGER_MODULE_KEY],
    staleTime: Infinity,
  });

  return {
    webTriggerUrl: data,
    webTriggerUrlQueryInfo: queryInfo,
  };
};

export default useWebTriggerUrl;

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getItem } from '../api/storage';
import { FORM_DATA_QUERY_ERROR } from '../constants/errors';
import { STORAGE_KEY } from '../constants/forge';
import FormData from '../types/FormData';

const useFormData = () => {
  const [draft, setDraft] = useState<Partial<FormData> | undefined>(undefined);

  const { data, ...queryInfo } = useQuery({
    meta: { errorMessage: FORM_DATA_QUERY_ERROR },
    queryFn: () => getItem(STORAGE_KEY),
    queryKey: ['formData', STORAGE_KEY],
    enabled: !draft,
  });

  return {
    formData: draft ?? data,
    formDataQueryInfo: queryInfo,
    setFormData: setDraft,
  };
};

export default useFormData;

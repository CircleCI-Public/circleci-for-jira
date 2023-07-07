import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getItem, setItem } from '../api/storage';
import {
  FORM_DATA_MUTATION_ERROR,
  FORM_DATA_MUTATION_SUCCESS,
  FORM_DATA_QUERY_ERROR,
} from '../constants/errors';
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

  const { mutate, ...mutationInfo } = useMutation({
    mutationFn: ({ key, formData }: { key: string; formData: FormData }) => setItem(key, formData),
    meta: { errorMessage: FORM_DATA_MUTATION_ERROR, successMessage: FORM_DATA_MUTATION_SUCCESS },
  });

  return {
    formData: draft ?? data,
    formDataMutate: mutate,
    formDataMutationInfo: mutationInfo,
    formDataQueryInfo: queryInfo,
    setFormData: setDraft,
  };
};

export default useFormData;

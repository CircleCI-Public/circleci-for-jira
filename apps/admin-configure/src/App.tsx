import 'react-toastify/dist/ReactToastify.css';

import { Container, Link } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { getItem, setItem } from './api/storage';
import { getWebTriggerUrl } from './api/webTrigger';
import FormDataInput from './components/FormDataInput';
import SubmitButton from './components/SubmitButton';
import WebTriggerInput from './components/WebTriggerInput';
import {
  FORM_DATA_MUTATION_ERROR,
  FORM_DATA_MUTATION_SUCCESS,
  FORM_DATA_QUERY_ERROR,
  WEB_TRIGGER_QUERY_ERROR,
} from './constants/errors';
import { STORAGE_KEY, WEB_TRIGGER_MODULE_KEY } from './constants/forge';
import FormData from './types/FormData';

const MyForm = () => {
  const [formData, setFormData] = useState<FormData>({ organizationId: '', audience: '' });
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);

  const formDataQuery = useQuery({
    queryKey: ['formData', STORAGE_KEY],
    queryFn: () => getItem(STORAGE_KEY),
    meta: { errorMessage: FORM_DATA_QUERY_ERROR },
  });
  const webTriggerQuery = useQuery({
    queryKey: ['webTriggerUrl', WEB_TRIGGER_MODULE_KEY],
    queryFn: () => getWebTriggerUrl(WEB_TRIGGER_MODULE_KEY),
    meta: { errorMessage: WEB_TRIGGER_QUERY_ERROR },
  });
  const formDataMutation = useMutation({
    mutationFn: ({ key, formData }: { key: string; formData: FormData }) => setItem(key, formData),
    meta: { errorMessage: FORM_DATA_MUTATION_ERROR, successMessage: FORM_DATA_MUTATION_SUCCESS },
  });

  useEffect(() => {
    if (!formDataQuery.isLoading && formDataQuery.data) setFormData(formDataQuery.data);
  }, [formDataQuery.isLoading, formDataQuery.data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formDataMutation.mutate({ key: STORAGE_KEY, formData });
    setFormData({ ...formData });
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(webTriggerQuery.data || '');
    setTooltipOpen(true);
    // Close tooltip after 2 seconds.
    const timerId = setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
    return () => clearTimeout(timerId);
  };
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <WebTriggerInput
          handleCopyToClipboard={handleCopyToClipboard}
          handleTooltipClose={handleTooltipClose}
          isTooltipOpen={isTooltipOpen}
          isWebTriggerUrlLoading={webTriggerQuery.isLoading}
          value={webTriggerQuery.data}
        />
        <FormDataInput
          onChange={handleInputChange}
          disabled={formDataQuery.isLoading || formDataMutation.isLoading}
          helperText={
            <>
              You can find it by navigating to <b>Organization Settings &gt; Overview</b> in the{' '}
              <Link href='https://app.circleci.com/'>CircleCI web app.</Link>
            </>
          }
          id='organizationId'
          label='CircleCI Organization ID'
          name='organizationId'
          required={true}
          value={formData.organizationId}
        />
        <FormDataInput
          onChange={handleInputChange}
          disabled={formDataQuery.isLoading || formDataMutation.isLoading}
          helperText={
            <>
              The OIDC token audience.{' '}
              <b>If left empty, the default value is your Organization ID</b>.
            </>
          }
          id='audience'
          label='Audience'
          name='audience'
          value={formData.audience}
          placeholder={formData.organizationId}
        />
        <SubmitButton isLoading={formDataQuery.isLoading || formDataMutation.isLoading} />
      </form>
    </Container>
  );
};

export default MyForm;

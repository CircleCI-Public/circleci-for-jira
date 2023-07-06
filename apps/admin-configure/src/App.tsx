import { Container, Link } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { getItem, setItem } from './api/storage';
import { getWebTriggerUrl } from './api/webTrigger';
import AlertsHandler from './components/AlertsHandler';
import FormDataInput from './components/FormDataInput';
import SubmitButton from './components/SubmitButton';
import WebTriggerInput from './components/WebTriggerInput';
import { STORAGE_KEY, WEB_TRIGGER_MODULE_KEY } from './constants/index';
import { AlertData } from './types/AlertData';
import FormData from './types/FormData';

const MyForm = () => {
  const [formData, setFormData] = useState<FormData>({ organizationId: '', audience: '' });
  const [isAlertOpen, setAlertOpen] = React.useState(false);
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);

  const formDataQuery = useQuery({
    queryKey: ['formData', STORAGE_KEY],
    queryFn: () => getItem(STORAGE_KEY),
  });

  const webTriggerQuery = useQuery({
    queryKey: ['webTriggerUrl', WEB_TRIGGER_MODULE_KEY],
    queryFn: () => getWebTriggerUrl(WEB_TRIGGER_MODULE_KEY),
  });

  const mutation = useMutation({
    mutationFn: ({ key, formData }: { key: string; formData: FormData }) => setItem(key, formData),
  });

  useEffect(() => {
    if (!formDataQuery.isLoading && formDataQuery.data) setFormData(formDataQuery.data);
    if (formDataQuery.isError) setAlertOpen(true);
    if (webTriggerQuery.isError) setAlertOpen(true);
  }, [formDataQuery.isLoading, formDataQuery.isError, formDataQuery.data, webTriggerQuery.isError]);

  const alertsData: AlertData[] = [
    {
      open: isAlertOpen && mutation.isSuccess,
      severity: 'success',
      message: 'Your changes have been saved!',
    },
    {
      open: isAlertOpen && mutation.isError,
      severity: 'error',
      message: 'Something went wrong while saving your changes. Please try again or open an issue.',
    },
    {
      open: isAlertOpen && formDataQuery.isError,
      severity: 'error',
      message:
        'Something went wrong while fetching your data! Please refresh the page or open an issue.',
    },
    {
      open: isAlertOpen && webTriggerQuery.isError,
      severity: 'error',
      message:
        'Something went wrong while fetching your web trigger URL. Please refresh the page or open an issue.',
    },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ key: STORAGE_KEY, formData });
    setFormData({ ...formData });
    setAlertOpen(true);
  };

  const handleAlertClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(webTriggerQuery.data || '');
    setTooltipOpen(true);
    // Close tooltip after 2 seconds.
    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <WebTriggerInput
          handleCopyToClipboard={handleCopyToClipboard}
          handleTooltipClose={() => setTooltipOpen(false)}
          isTooltipOpen={isTooltipOpen}
          isWebTriggerUrlLoading={webTriggerQuery.isLoading}
          value={webTriggerQuery.data}
        />
        <FormDataInput
          onChange={handleInputChange}
          disabled={formDataQuery.isLoading || mutation.isLoading}
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
          disabled={formDataQuery.isLoading || mutation.isLoading}
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
        <SubmitButton isLoading={formDataQuery.isLoading || mutation.isLoading} />
        <AlertsHandler alerts={alertsData} onClose={handleAlertClose} />
      </form>
    </Container>
  );
};

export default MyForm;

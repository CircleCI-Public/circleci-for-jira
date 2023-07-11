import 'react-toastify/dist/ReactToastify.css';

import { Container } from '@mui/material';
import { Link } from 'ui'
import React, { useState } from 'react';
import { validate as uuidValidate } from 'uuid';

import FormDataInput from './components/FormDataInput';
import SubmitButton from './components/SubmitButton';
import WebTriggerInput from './components/WebTriggerInput';
import { STORAGE_KEY } from './constants/forge';
import useFormData from './hooks/useFormData';
import useWebTriggerUrl from './hooks/useWebTriggerUrl';

const MyForm = () => {
  const {
    formData,
    formDataMutate,
    formDataMutationInfo: { isLoading: isFormDataMutationLoading },
    formDataQueryInfo: { isLoading: isFormDataQueryLoading },
    setFormData,
  } = useFormData();
  const {
    webTriggerUrl: webTriggerUrlQueryData,
    webTriggerUrlQueryInfo: { isLoading: isWebTriggerUrlLoading },
  } = useWebTriggerUrl();

  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isOrgIdInvalid, setOrgIdInvalid] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clear the error state when the user starts typing in the organizationId field.
    if (event.target.name === 'organizationId') {
      setOrgIdInvalid(false);
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData) throw new Error('Form data is undefined.');

    const organizationId = formData.organizationId as string;
    if (!uuidValidate(organizationId)) {
      setOrgIdInvalid(true);
      return;
    }

    const audience = formData?.audience === '' ? organizationId : (formData.audience as string);
    const updatedFormData = { organizationId, audience };
    setFormData(updatedFormData);
    formDataMutate({ key: STORAGE_KEY, formData: updatedFormData });
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(webTriggerUrlQueryData || '');
    setTooltipOpen(true);
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
          isWebTriggerUrlLoading={isWebTriggerUrlLoading}
          value={webTriggerUrlQueryData}
        />
        <FormDataInput
          onChange={handleInputChange}
          disabled={isFormDataQueryLoading || isFormDataMutationLoading}
          error={isOrgIdInvalid}
          formHelperText={
            <>
              You can find it by navigating to <b>Organization Settings &gt; Overview</b> in the{' '}
              <Link href='https://app.circleci.com/'>CircleCI web app.</Link>
            </>
          }
          id='organizationId'
          label='CircleCI Organization ID'
          name='organizationId'
          required={true}
          value={formData?.organizationId || ''}
          {...(isOrgIdInvalid
            ? {
                errorHelperText:
                  'Please ensure the format is a valid UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.',
              }
            : {})}
        />
        <FormDataInput
          onChange={handleInputChange}
          disabled={isFormDataQueryLoading || isFormDataMutationLoading}
          formHelperText={
            <>
              The OIDC token audience.{' '}
              <b>If left empty, the default value is your Organization ID</b>.
            </>
          }
          id='audience'
          label='Audience'
          name='audience'
          value={formData?.audience || ''}
          placeholder={formData?.organizationId}
        />
        <SubmitButton isLoading={isFormDataQueryLoading || isFormDataMutationLoading} />
      </form>
    </Container>
  );
};

export default MyForm;

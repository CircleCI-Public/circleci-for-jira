import { invoke } from '@forge/bridge';
import { Button, Container, FormControl, FormHelperText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface FormState {
  organizationId: string;
  audience: string;
}

const MyForm = () => {
  const [values, setValues] = useState<FormState>({ organizationId: '', audience: '' });

  useEffect(() => {
    const fetchData = async () => {
      const {
        error,
        storageValue,
      }: { error: string; storageValue: { organizationId: string; audience: string } } =
        await invoke('getStorageValue', {
          storageKey: 'organizationId',
        });
      if (error) {
        console.error(error);
        setValues({ organizationId: 'Error', audience: 'Error' });
      } else {
        setValues({
          organizationId: storageValue.organizationId || '',
          audience: storageValue.audience || '',
        });
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await invoke('setStorageValue', {
      storageKey: 'organizationId',
      storageValue: values,
    });
    console.log(values);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <TextField
            autoFocus
            id='organizationId'
            label='Organization ID'
            name='organizationId'
            onChange={handleInputChange}
            required
            value={values.organizationId}
            variant='outlined'
          />
          <FormHelperText id='organizationId-helper-text'>
            Enter your Organization ID
          </FormHelperText>
        </FormControl>
        <TextField
          fullWidth
          id='audience'
          label='Audience'
          margin='normal'
          name='audience'
          onChange={handleInputChange}
          required
          value={values.audience}
          variant='outlined'
        />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default MyForm;

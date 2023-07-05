import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { getItem, setItem } from './api/storage';
import FormData from './types/FormData';

const MyForm = () => {
  const [isAlertOpen, setOpen] = React.useState(false);
  const [formData, setFormData] = useState<FormData>({ organizationId: '', audience: '' });
  const storageKey = 'organizationId';

  const query = useQuery({
    queryKey: ['formData', storageKey],
    queryFn: async () => {
      const response = await getItem(storageKey);
      setFormData(response);
      return response;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ key, formData }: { key: string; formData: FormData }) => setItem(key, formData),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ key: storageKey, formData });
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <TextField
            autoFocus
            disabled={query.isLoading || mutation.isLoading}
            id='organizationId'
            label='Organization ID'
            name='organizationId'
            onChange={handleInputChange}
            required
            value={formData.organizationId}
            variant='outlined'
          />
          <FormHelperText id='organizationId-helper-text'>
            Navigate to https://app.circleci.com/
          </FormHelperText>
        </FormControl>
        <TextField
          disabled={query.isLoading || mutation.isLoading}
          fullWidth
          id='audience'
          label='Audience'
          margin='normal'
          name='audience'
          onChange={handleInputChange}
          required
          value={formData.audience}
          variant='outlined'
        />
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            color='primary'
            disabled={query.isLoading || mutation.isLoading}
            fullWidth
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
          {(query.isLoading || mutation.isLoading) && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
        {isAlertOpen && mutation.isSuccess && (
          <Alert
            onClose={handleClose}
            icon={<CheckIcon fontSize='inherit' />}
            severity={'success'}
            sx={{ mt: 4 }}
          >
            This is a success alert — check it out!
          </Alert>
        )}
        {isAlertOpen && mutation.isError && (
          <Alert
            onClose={handleClose}
            icon={<ErrorIcon fontSize='inherit' />}
            severity='error'
            sx={{ mt: 4 }}
          >
            This is an error alert — check it out!
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default MyForm;

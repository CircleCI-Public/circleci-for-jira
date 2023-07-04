import { invoke } from '@forge/bridge';
import CheckIcon from '@mui/icons-material/Check';
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
import React, { useEffect, useState } from 'react';

interface FormState {
  organizationId: string;
  audience: string;
}

enum FormStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const MyForm = () => {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [values, setValues] = useState<FormState>({ organizationId: '', audience: '' });

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FormStatus.LOADING);
      const {
        error,
        storageValue,
      }: { error: string; storageValue: { organizationId: string; audience: string } } =
        await invoke('getStorageValue', {
          storageKey: 'organizationId',
        });
      if (error) {
        // TODO: Handle error
        console.error(error);
        setValues({ organizationId: 'Error', audience: 'Error' });
        setStatus(FormStatus.ERROR);
      } else {
        setValues({
          organizationId: storageValue?.organizationId || '',
          audience: storageValue?.audience || '',
        });
        setStatus(FormStatus.SUCCESS);
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

    if (status !== FormStatus.LOADING) {
      setStatus(FormStatus.LOADING);
      const { error }: { error: string } = await invoke('setStorageValue', {
        storageKey: 'organizationId',
        storageValue: values,
      });
      // TODO: Handle error
      if (error) setStatus(FormStatus.ERROR);
      else setStatus(FormStatus.SUCCESS);
      setOpen(true);
    }
    console.log(values);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <TextField
            autoFocus
            disabled={status === FormStatus.LOADING}
            id='organizationId'
            label='Organization ID'
            name='organizationId'
            onChange={handleInputChange}
            required
            value={values.organizationId}
            variant='outlined'
          />
          <FormHelperText id='organizationId-helper-text'>
            Navigate to https://app.circleci.com/
          </FormHelperText>
        </FormControl>
        <TextField
          disabled={status === FormStatus.LOADING}
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
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            color='primary'
            disabled={status === FormStatus.LOADING}
            fullWidth
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
          {status === FormStatus.LOADING && (
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
        {open && (
          <Alert
            onClose={handleClose}
            icon={<CheckIcon fontSize='inherit' />}
            severity={status === FormStatus.SUCCESS ? 'success' : 'error'}
            sx={{ mt: 4 }}
          >
            {status === FormStatus.SUCCESS
              ? 'This is a success alert — check it out!'
              : 'This is an error alert — check it out!'}
          </Alert>
        )}
      </form>
    </Container>
  );
};

export default MyForm;

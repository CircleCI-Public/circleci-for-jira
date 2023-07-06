import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { getItem, setItem } from './api/storage';
import { getWebTriggerUrl } from './api/webTrigger';
import FormData from './types/FormData';

const MyForm = () => {
  const [isAlertOpen, setOpen] = React.useState(false);
  const [formData, setFormData] = useState<FormData>({ organizationId: '', audience: '' });
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);

  const storageKey = 'organizationId';
  const webTriggerModuleKey = 'orb-webtrigger';

  const formDataQuery = useQuery({
    queryKey: ['formData', storageKey],
    queryFn: () => getItem(storageKey),
  });

  const webTriggerQuery = useQuery({
    queryKey: ['webTriggerUrl', webTriggerModuleKey],
    queryFn: () => getWebTriggerUrl(webTriggerModuleKey),
  });

  const mutation = useMutation({
    mutationFn: ({ key, formData }: { key: string; formData: FormData }) => setItem(key, formData),
  });

  useEffect(() => {
    if (!formDataQuery.isLoading && formDataQuery.data) {
      setFormData(formDataQuery.data);
    }
  }, [formDataQuery.isLoading, formDataQuery.data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ key: storageKey, formData });
    setFormData({ ...formData });
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(webTriggerQuery.data || '');
    setTooltipOpen(true);
    // Close tooltip after 2 seconds.
    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <Container component='main' maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin='normal'>
          <TextField
            disabled
            fullWidth
            id='webTriggerUrl'
            label='Web Trigger URL'
            name='webTriggerUrl'
            value={webTriggerQuery.data || ''}
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={isTooltipOpen}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title='Copied!'
                      >
                        <IconButton
                          onClick={handleCopyToClipboard}
                          disabled={webTriggerQuery.isLoading}
                        >
                          {isTooltipOpen ? <CheckIcon /> : <FileCopyIcon />}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </ClickAwayListener>
                </InputAdornment>
              ),
            }}
          />
          <FormHelperText id='webTrigger-helper-text'>
            Paste this URL into your CircleCI Context used by the Jira Orb.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <TextField
            disabled={formDataQuery.isLoading || mutation.isLoading}
            id='organizationId'
            label='CircleCI Organization ID'
            name='organizationId'
            onChange={handleInputChange}
            required
            value={formData.organizationId}
            variant='outlined'
          />
          <FormHelperText id='organizationId-helper-text'>
            You can find it by navigating to <b>Organization Settings &gt; Overview</b> in the{' '}
            <Link href='https://app.circleci.com/'>CircleCI web app</Link>.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <TextField
            disabled={formDataQuery.isLoading || mutation.isLoading}
            fullWidth
            id='audience'
            label='Audience'
            name='audience'
            onChange={handleInputChange}
            value={formData.audience}
            variant='outlined'
          />
          <FormHelperText id='audience-helper-text'>
            The CircleCI OIDC token audience. If left empty, the default value is your Organization
            ID.
          </FormHelperText>
        </FormControl>

        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            color='primary'
            disabled={formDataQuery.isLoading || mutation.isLoading}
            fullWidth
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
          {(formDataQuery.isLoading || mutation.isLoading) && (
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

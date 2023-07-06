import { Box, Button, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';

type SubmitButtonProps = {
  isLoading: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => (
  <Box sx={{ m: 1, position: 'relative' }}>
    <Button color='primary' disabled={isLoading} fullWidth type='submit' variant='contained'>
      Submit
    </Button>
    {isLoading && (
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
);

export default SubmitButton;

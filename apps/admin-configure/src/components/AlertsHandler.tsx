import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { Alert } from '@mui/material';
import React from 'react';

import { AlertData } from '../types/AlertData';

type AlertsHandlerProps = {
  alerts: AlertData[];
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
};

const AlertsHandler = ({ alerts, onClose }: AlertsHandlerProps) => {
  return (
    <>
      {alerts.map(
        (alert, index) =>
          alert.open && (
            <Alert
              key={index}
              onClose={onClose}
              icon={
                alert.severity === 'success' ? (
                  <CheckIcon fontSize='inherit' />
                ) : (
                  <ErrorIcon fontSize='inherit' />
                )
              }
              severity={alert.severity}
              sx={{ mt: 4 }}
            >
              {alert.message}
            </Alert>
          ),
      )}
    </>
  );
};

export default AlertsHandler;

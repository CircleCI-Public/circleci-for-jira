// components/FormDataInput.tsx

import { FormControl, FormHelperText, TextField } from '@mui/material';
import React from 'react';

type FormDataInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  helperText: React.ReactNode;
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
};

const FormDataInput: React.FC<FormDataInputProps> = ({
  onChange,
  disabled,
  helperText,
  id,
  label,
  name,
  placeholder = '',
  required = false,
  value,
}) => {
  return (
    <FormControl fullWidth margin='normal'>
      <TextField
        autoFocus
        disabled={disabled}
        id={id}
        label={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={value}
        variant='outlined'
        InputLabelProps={{ shrink: true }}
      />
      <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormDataInput;

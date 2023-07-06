import CheckIcon from '@mui/icons-material/Check';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  ClickAwayListener,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';

type WebTriggerInputProps = {
  handleCopyToClipboard: () => void;
  handleTooltipClose: () => void;
  isTooltipOpen: boolean;
  isWebTriggerUrlLoading: boolean;
  value: string | undefined;
};

const WebTriggerInput: React.FC<WebTriggerInputProps> = ({
  handleCopyToClipboard,
  handleTooltipClose,
  isTooltipOpen,
  isWebTriggerUrlLoading,
  value,
}) => {
  return (
    <FormControl fullWidth margin='normal'>
      <TextField
        disabled
        fullWidth
        id='webTriggerUrl'
        label='Web Trigger URL'
        name='webTriggerUrl'
        value={value || ''}
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
                    <IconButton onClick={handleCopyToClipboard} disabled={isWebTriggerUrlLoading}>
                      {isTooltipOpen ? <CheckIcon sx={{ color: green[500] }} /> : <FileCopyIcon />}
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
  );
};

export default WebTriggerInput;

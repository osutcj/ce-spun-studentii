import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { AlertType } from '../../types/game';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicAlerts(props:AlertType) {
  const [open, setOpen] = useState(true);
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        { 
          props.errorType == 1 
          ? <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>

          : <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.message}
        </Alert>
      }
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open alert log
      </Button>
    </Box>
  );
}
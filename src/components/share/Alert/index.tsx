import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useAppState, useAppDispatch} from '../../../contexts/app-context';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CustomizedSnackbars() {
  const {alert} = useAppState();
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    // close alert
    dispatch({
      type: 'SET_ALERT',
      alert: {
        open: false,
      }
    })
  };

  return (
      <Snackbar open={alert.open} autoHideDuration={alert.duration} onClose={handleClose} action={(
        <IconButton
          color="inherit"
          style={{padding: 4}}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      )} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={handleClose} severity={alert.variant}>
          {alert.message}
        </Alert>
      </Snackbar>
  );
}

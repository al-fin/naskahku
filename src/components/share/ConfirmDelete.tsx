import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface Props {
  open: boolean,
  handleClose: () => void,
  handleDelete: () => void,
  judul?: string,
}

export default function ConfirmDelete(props: Props) {
  const {open, judul, handleDelete, handleClose} = props;

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography color="secondary" style={{fontWeight: 'bold'}}>Konfirmasi hapus naskah - {judul}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Naskah ini akan dihapus permanen, kamu yakin ingin menghapusnya ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" style={{textTransform: 'none', color: '#AAA'}}>
            Nggak jadi
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained" style={{textTransform: 'none', fontWeight: 'bold'}}>
            Iya, Hapus
          </Button>
        </DialogActions>
      </Dialog>
  );
}

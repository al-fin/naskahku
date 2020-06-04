import React from 'react';

import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import DialogTitle from './DialogTitle'
import DialogContent from './DialogContent'
import DialogActions from './DialogActions'
import {Naskah} from '../../../interfaces/naskah';
import db from '../../../services/db';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import {useAppDispatch} from '../../../contexts/app-context';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    paper: {
      borderRadius: 12,
      padding: theme.spacing(2)
    },
    button: {
      borderRadius: 50,
      width: '100%',
      textTransform: 'capitalize',
      boxShadow: theme.palette.type === 'light' ? '0px 2px 4px 2px rgba(83, 196, 247, 0.3)' : '0px 2px 4px 2px rgba(0,0,0, 0.1)',
      fontWeight: 'bold',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    disabled: {
      borderRadius: 50,
      width: '100%',
      textTransform: 'capitalize',
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
      fontWeight: 'bold',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },

    title: {
      fontWeight: 'bold'
    },
    icon: {
      fontSize: 40,
      marginRight: theme.spacing(2)
    },
    input: {
      paddingBottom: theme.spacing(2)
    }
  }),
);


interface Props {
  open: boolean,
  naskah: Naskah,
  handleClickOpen: () => void,
  handleClose: () => void,
  getNaskah: () => void,
}

export default function EditDialog(props: Props) {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const {naskah, getNaskah, handleClose} = props;
  const [loading, setLoading] = React.useState<boolean | null>(null)
  const [judul, setJudul] = React.useState(naskah.judul)
  const [produksi, setProduksi] = React.useState(naskah.produksi)
  const [penulis, setPenulis] = React.useState(naskah.penulis)
  const resetForm = () => {
    setJudul(naskah.judul)
    setProduksi(naskah.produksi)
  }
  const editNaskah = () => {
    setLoading(true)
    if (judul === '' || produksi === '') {
      setLoading(false)
    } else {
      const now = new Date().getTime()
      const newNaskah: Naskah = {
        judul: judul,
        produksi: produksi,
        penulis: penulis,
        updatedAt: now,
        type: 'Wide Margin',
      }
  
      db.table('naskah').update(naskah.id, newNaskah).then(res => {
        console.log(res);
        console.log('sukses')
        getNaskah()
        handleClose()
        resetForm()
        setLoading(false) 
        // error alert
        dispatch({
          type: 'SET_ALERT',
          alert: {
            open: true,
            variant: 'success',
            message: 'Naskah berhasil diedit!',
            duration: 6000
          }
        })
      }).catch(err => {
        console.error(err)
        setLoading(false)
        handleClose()
        // error alert
        dispatch({
          type: 'SET_ALERT',
          alert: {
            open: true,
            variant: 'error',
            message: 'Gagal menghapus naskah!',
            duration: 6000
          }
        })
      })
    }

  }

  return (
    <div>
      <Dialog TransitionComponent={Transition} onClose={props.handleClose} open={props.open} classes={{
        paper: classes.paper
      }}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          <Grid container justify="center" alignItems="center">
            <EditOutlinedIcon color="primary" className={classes.icon} />
            <Typography display="inline" variant="h6" color="primary" className={classes.title}>Edit Naskah</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth autoFocus
            label="Judul"
            value={judul}
            onChange={e => setJudul(e.target.value)}
            className={classes.input}
            error={loading !== null && judul === ''}
          />
          <TextField fullWidth
            label="Nama Produksi"
            value={produksi}
            onChange={e => setProduksi(e.target.value)}
            className={classes.input}
            error={loading !== null && produksi === ''}
          /> 
          <TextField fullWidth
            label="Penulis naskah"
            value={penulis}
            onChange={e => setPenulis(e.target.value)}
            className={classes.input}
            error={loading !== null && penulis === ''}
          /> 

        </DialogContent>
        <DialogActions>
          <Button
            onClick={editNaskah}
            color="primary"
            variant="contained"
            className={loading ? classes.disabled : classes.button}
            disabled={loading ? true : false}
          >
            {loading ? 'Tunggu sebentar...' : 'Edit Naskah'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

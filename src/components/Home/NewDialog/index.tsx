import React from 'react';
import { useHistory } from "react-router-dom";

import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import TextField from '@material-ui/core/TextField';

import DialogTitle from './DialogTitle'
import DialogContent from './DialogContent'
import DialogActions from './DialogActions'
import {Naskah} from '../../../interfaces/naskah';
import db from '../../../services/db';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import {useAppDispatch} from '../../../contexts/app-context';

import shortid from 'shortid';

interface Props {
  open: boolean
  handleClickOpen: () => void
  handleClose: () => void
}

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


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function NewDialog(props: Props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState<boolean | null>(null)
  const [judul, setJudul] = React.useState('')
  const [produksi, setProduksi] = React.useState('')
  const [penulis, setPenulis] = React.useState('')
  const resetForm = () => {
    setJudul('')
    setProduksi('')
    setPenulis('')
  }
  const buatNaskah = () => {
    setLoading(true)
    if (judul === '' || produksi === '' || penulis === '') {
      setLoading(false)
    } else {
      const now = new Date().getTime()
      const newNaskah: Naskah = {
        judul: judul,
        produksi: produksi,
        penulis: penulis,
        content: [{
          id: shortid.generate(),
          elemen: 'GENERAL',
          text: ''
        }],
        createdAt: now,
        updatedAt: now,
        type: 'Wide Margin',
        lock: false,
      }
  
      db.table('naskah').put(newNaskah).then(id => {
        console.log(id);
        console.log('sukses')
        sessionStorage.setItem('naskah_active', JSON.stringify({...newNaskah, id}))
        resetForm()
        setLoading(false)
        history.push('/editor')
      }).catch(err => {
        console.error(err)
        // error alert
        dispatch({
          type: 'SET_ALERT',
          alert: {
            open: true,
            variant: 'error',
            message: 'Gagal mengimport naskah!',
            duration: 6000
          }
        })
        setLoading(false)


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
            <MovieFilterOutlinedIcon color="primary" className={classes.icon} />
            <Typography display="inline" variant="h6" color="primary" className={classes.title}>Buat Naskah</Typography>
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
            onClick={buatNaskah}
            color="primary"
            variant="contained"
            className={loading ? classes.disabled : classes.button}
            disabled={loading ? true : false}
          >
            {loading ? 'Tunggu sebentar...' : 'Buat Naskah'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

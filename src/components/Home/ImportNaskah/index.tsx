import React from 'react';

import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import DialogTitle from './DialogTitle'
import DialogContent from './DialogContent'
import db from '../../../services/db';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useAppDispatch} from '../../../contexts/app-context';

interface Props {
  open: boolean,
  handleClickOpen: () => void,
  handleClose: () => void,
  getNaskah: () => void,
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
      boxShadow: '0px 2px 4px 2px rgba(83, 196, 247, 0.3)',
      fontWeight: 'bold',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    buttonUpload: {
      width: '100%',
      textTransform: 'capitalize',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
      borderStyle: 'dashed',
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
    },
    hidden: {
      display: 'none',
    },

  }),
);


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function ImportNaskah(props: Props) {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const [loading, setLoading] = React.useState<boolean | null>(null)

  const handleUpload = async (e: any) => {
      setLoading(true)
      const reader = new FileReader();
      const now = new Date().getTime();
      reader.onload = function() {
        const newNaskah = {
          ...JSON.parse(String(reader.result)),
          createdAt: now,
          updatedAt: now,
          lock: false
        };
        delete newNaskah.id
        console.log('result : '+newNaskah)
        db.table('naskah').put(newNaskah).then(id => {
          console.log(id);
          console.log('sukses')
          sessionStorage.setItem('naskah_active', JSON.stringify({...newNaskah, id}))
          props.getNaskah()
          props.handleClose()

          dispatch({
            type: 'SET_ALERT',
            alert: {
              open: true,
              variant: 'success',
              message: 'Naskah berhasil diimport!',
              duration: 6000
            }
          })

          setLoading(false)
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
      };
      reader.readAsText(e.target.files[0]);
  }

  return (
    <div>
      <Dialog TransitionComponent={Transition} onClose={props.handleClose} open={props.open} classes={{
        paper: classes.paper
      }}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          <Grid container justify="center" alignItems="center">
            <FolderOpenOutlinedIcon color="primary" className={classes.icon} />
            <Typography display="inline" variant="h6" color="primary" className={classes.title}>Import Naskah</Typography>
          </Grid>
        </DialogTitle>
        <DialogContent>
        <Typography variant="subtitle1" style={{
            color: '#AAA',
            textAlign: 'center'
        }}>Silahkan pilih file project yang ingin kamu import (ekstensi .nk)</Typography>

        <input accept=".nk" className={classes.hidden} id="import-naskah" type="file" onChange={handleUpload} />
        <label htmlFor="import-naskah">
          {!loading ? (
          <Button
            component="span"
            color="default"
            variant="outlined"
            className={classes.buttonUpload} style={{
              color: '#aaa'
            }}
            startIcon={<CloudUploadIcon style={{
              color: '#aaa'
            }} />}
          >
            Pilih file
          </Button>
          ) : (
          <Grid container justify="center" alignItems="center" style={{marginTop: 10}}>
            <CircularProgress />
          </Grid>
          )}
        </label>
        </DialogContent>
      </Dialog>
    </div>
  );
}

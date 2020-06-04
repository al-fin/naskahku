import React from 'react';
import {Naskah} from '../../../interfaces/naskah';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import db from '../../../services/db';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useHistory} from 'react-router-dom';
import NaskahMenu from '../../share/NaskahMenu';
import {useAppDispatch} from '../../../contexts/app-context';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EditDialog from '../EditDialog';
import Moment from 'react-moment';
import 'moment/locale/id';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      boxShadow: '0px 1px 8px 1px rgba(0,0,0,0.05), 0px 2px 15px 2px rgba(0,0,0,0.05)',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderRadius: 15  
    },
    title: {
      fontWeight: 'bold'
    },
    cardHeader: {
      marginBottom: 0,
      paddingBottom: theme.spacing(1),
    },
    footerWrapper: {
      paddingBottom: theme.spacing(2)
    },
    footer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    scene: {
      backgroundColor: 'rgba(83, 196, 247, 0.25)',
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderRadius: 50,
      fontWeight: 'bold',
      display: 'inline-block'
    },
    date: {
      textAlign: 'right',
      color: '#ddd',
    },
    timeIcon: {
      color: '#ddd',
      marginRight: theme.spacing(1)
    },
    lockIcon: {
      color: '#ddd',
      marginLeft: theme.spacing(1)
    },

    listItemIcon: {
      marginRight: 0,
      paddingRight: 0,
    },
    buttonBase: {
      width: '100%',
      display: 'block',
      textAlign: 'left',
      color: theme.palette.primary.main
    }
  }),
);

interface Props {
  naskah: Naskah,
  getNaskah: () => void,
}


export default function NaskahList(props: Props) {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {naskah, getNaskah} = props;
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const deleteNaskah = () => {
    closeMenu()
    db.table('naskah').where('id').equals(naskah.id).delete().then(res => {
      console.log(res);
      console.log('deleted')
      getNaskah()
      // error alert
      dispatch({
        type: 'SET_ALERT',
        alert: {
          open: true,
          variant: 'success',
          message: 'Naskah berhasil dihapus!',
          duration: 6000
        }
      })

    }).catch(err => {
      console.error(err)
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

  const goEditor = () => {
    sessionStorage.setItem('naskah_active', JSON.stringify(naskah))
    history.push('/editor')
  }
  


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    closeMenu()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const downloadProject = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(naskah)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = naskah.judul+".nk";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    closeMenu()
  }


  return (
    <>
      <EditDialog getNaskah={getNaskah} naskah={naskah} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <NaskahMenu naskah={naskah} download={downloadProject} anchorEl={anchorEl} closeMenu={closeMenu} handleClickOpen={handleClickOpen} deleteNaskah={deleteNaskah} />
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton onClick={openMenu} color="primary">
              <MoreVertIcon />
            </IconButton>
          }
          title={
          <ButtonBase focusRipple className={classes.buttonBase} onClick={goEditor}>
            <Grid container alignItems="center">
              <Typography variant="h6" color="primary" className={classes.title}>{naskah.judul}</Typography>
              {naskah.lock && <LockOutlinedIcon className={classes.lockIcon} />}
            </Grid>
          </ButtonBase>
          }
          subheader={`${naskah.produksi}`}
          className={classes.cardHeader}
        />
        <CardActions disableSpacing className={classes.footerWrapper}>
          <Grid container justify="space-between" alignItems="flex-end" className={classes.footer}>
            <Grid item xs={4}>
              <Typography variant="body2" color="primary" className={classes.scene}>{naskah.scene} Scene</Typography>
            </Grid>
            <Grid item container xs={8} justify="flex-end" alignItems="center">
              <WatchLaterOutlinedIcon className={classes.timeIcon} />
              <Typography variant="body2" className={classes.date}><Moment locale="id" fromNow>{naskah.updatedAt}</Moment></Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

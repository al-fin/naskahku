import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HideOnScroll from './HideOnScroll';
import { useHistory } from "react-router-dom";
import {Naskah} from '../../../interfaces/naskah'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: theme.palette.type === 'light' ? '0px 2px 4px 2px rgba(83, 196, 247, 0.3)' : '0px 2px 4px 2px rgba(0,0,0, 0.3)',
    },
    mr: {
      marginRight: theme.spacing(2),
    },
    ml: {
      marginLeft: theme.spacing(2),
    },

    titleWrapper: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 0,
      paddingBottom: 0,
      lineHeight: '1em'
    },
    subtitle: {
      marginTop: 0,
      paddingTop: 0
    }
  }),
);


interface Props {
  naskah: Naskah,
  toggleLock: () => void,
  openMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
export default function Navigation(props: Props) {
  const classes = useStyles();
  const history = useHistory()
  const {naskah, openMenu, toggleLock} = props;

  const goHome = () => {
    sessionStorage.removeItem('naskah_active');
    history.replace('/')
  }
  return (
    <HideOnScroll>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.mr}
            color="inherit"
            onClick={goHome}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className={classes.titleWrapper}>
            <Typography variant="h6" className={classes.title}>
              {naskah.judul}
            </Typography>
            <Typography variant="body2" className={classes.subtitle}>
              {naskah.produksi}
            </Typography>
          </div>
          <IconButton
            edge="end"
            className={classes.ml}
            color="inherit"
            onClick={toggleLock}
          >
            {naskah.lock ? <LockIcon /> : <LockOpenOutlinedIcon />}
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={openMenu}
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

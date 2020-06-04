import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {TypeElemen} from '../../interfaces/naskah';

import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const StyledMenu = withStyles((theme) => ({
  paper: {
    borderRadius: 15,
    boxShadow: theme.palette.type === 'light' ? '0px -2px 4px 2px rgba(83, 196, 247, 0.3)' : '0px -2px 4px 2px rgba(0,0,0, 0.15)',
    backgroundColor: theme.palette.primary.main,
    zIndex: 4,
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
      borderBottom: '1px solid rgba(255,255,255,0.3)',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      textAlign: 'center',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        textAlign: 'center',
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
          textAlign: 'center'
        },
      }
  },
}))(MenuItem);


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navigation: {
      background: theme.palette.primary.main,
      boxShadow: theme.palette.type === 'light' ? '0px -2px 4px 2px rgba(83, 196, 247, 0.3)' : '0px -2px 4px 2px rgba(0,0,0, 0.15)',
      color: '#FFF',
      textTransform: 'uppercase',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      position: 'fixed',
      bottom: 0,
      zIndex: 5,
    },
    text: {
      color: '#FFF',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    menuText: {
      textAlign: 'center',
      margin: '0 auto',
    }
  }),
);


interface Props {
  elemen: TypeElemen,
  prev: () => void,
  next: () => void,
  changeElemen: (newELemen: TypeElemen) => void,
}

export default function NavigationBottom(props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeElemen = (el: TypeElemen) => {
    handleClose()
    props.changeElemen(el)
  }
  
  const listElemen: TypeElemen[] = ['ACTION', 'CAST', 'CHARACTER', 'DIALOG', 'GENERAL', 'HEADSCENE', 'PARENTHETICAL', 'SHOT', 'TRANSITION']
  
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.navigation}>
      <IconButton color="inherit" style={{padding: 4}} onClick={props.prev}>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="subtitle1" className={classes.text} onClick={Boolean(anchorEl) ? handleClose : handleClick}>{props.elemen}</Typography>

      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{zIndex: 4}}
      >
        {listElemen.map((el: TypeElemen) => (
          <StyledMenuItem onClick={() => handleChangeElemen(el)}><Typography variant="subtitle1" className={classes.menuText}>{el}</Typography></StyledMenuItem>
        ))}
      </StyledMenu>

      <IconButton color="inherit" style={{padding: 4}} onClick={props.next}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Grid>
  );
}

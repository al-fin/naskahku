import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import SearchIcon from '@material-ui/icons/Search';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import {useThemeContext} from '../../../contexts/theme-context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(8)
    },
    appBar: {
      boxShadow: theme.palette.type === 'light' ? '0px 2px 4px 2px rgba(83, 196, 247, 0.3)' : '0px 2px 4px 2px rgba(0,0,0, 0.3)'
    },
    menuButton: {
      marginLeft: theme.spacing(0),
      padding: theme.spacing(1)
    },
    openButton: {
      marginLeft: theme.spacing(1),
      padding: theme.spacing(1)
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }),
);

interface Props {
  getNaskah: (keyword: string) => void,
  handleClickOpen: () => void,
}
export default function Navigation(props: Props) {
  const classes = useStyles();
  const {state, dispatch} = useThemeContext()
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.getNaskah(e.target.value)
  }

  const toggleDarkMode = () => {
    dispatch({type: 'TOGGLE_THEME'})
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Cari naskahmu disini..."
              onChange={search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <IconButton
            edge="start"
            className={classes.openButton}
            color="inherit"
            onClick={props.handleClickOpen}
          >
            <FolderOpenOutlinedIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDarkMode}
          >
            {state.theme === 'dark' ? <Brightness2Icon /> : <BrightnessHighIcon />}
          </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}

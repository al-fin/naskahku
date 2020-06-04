import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      padding: 0,
      textAlign: "center",
      textTransform: 'uppercase',
      fontFamily: 'Courier New',
      '& input': {
        textAlign: "center",
        padding: 0,
      }

    },
    penulis: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      padding: 0,
      textAlign: "center",
      fontFamily: 'Courier New',
      marginBottom: theme.spacing(2),
      '& input': {
        textAlign: "center",
        padding: 0,
      }

    },
    default: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: "left",
      fontFamily: 'Courier New',
      textTransform: 'uppercase',
    },
    action: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: "left",
      fontFamily: 'Courier New',
      textTransform: 'uppercase',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    cast: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      '& input': {
        textAlign: "left",
        fontFamily: 'Courier New',
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
      }
    },
    character: {
      margin: 0,
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      marginTop: theme.spacing(1),
      '& input': {
        textTransform: 'uppercase',
        fontFamily: 'Courier New',
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
      }
    },
    dialog: {
      margin: 0,
      width: '100%',
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(4),
      fontFamily: 'Courier New',
      paddingTop: 0,
      marginTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
    },
    general: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      textAlign: "left",
      fontFamily: 'Courier New',
      textTransform: 'uppercase',
    },
    headscene: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: 0,
      marginBottom: 0,
      '& input': {
        textAlign: "left",
        textTransform: 'uppercase',
        fontFamily: 'Courier New',
        textDecoration: 'underline',
        paddingBottom: 0,
        marginBottom: 0,
      }
    },
    parenthetical: {
      margin: 0,
      width: '100%',
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(4),
      paddingBottom: 0,
      marginBottom: 0,
      paddingTop: 0,
      marginTop: 0,
      '& input': {
        fontFamily: 'Courier New',
        paddingBottom: 0,
        marginBottom: 0,
        paddingTop: 0,
        marginTop: 0,
      }
    },
    shot: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginBottom: 0,
      paddingBottom: 0,
      paddingTop: 0,
      marginTop: theme.spacing(1),
      '& input': {
        textAlign: "left",
        textTransform: 'uppercase',
        fontFamily: 'Courier New',
        marginBottom: 0,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop: theme.spacing(1),
      }
    },
    transition: {
      margin: 0,
      width: '100%',
      align: 'left',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '& input': {
        textAlign: "right",
        textTransform: 'uppercase',
        fontFamily: 'Courier New',
      }
    },
    focused: {
      background: 'rgba(83, 196, 247, 0.1)'
    },
    clear: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }),
);

export default function Input(props: any) {
  const classes = useStyles();
  const {active, elemen} = props;
  return (
    <InputBase
      {...props}
      fullWidth
      placeholder={ (elemen === 'HEADSCENE') ? '1. EXT. LATAR TEMPAT - LATAR WAKTU': (elemen === 'CAST') ? 'CAST.' : ''}
      multiline={ (elemen === 'ACTION' || elemen === 'DIALOG' || elemen === 'GENERAL') ? true : false }
      className={active ? classes.focused : ''}
      classes={{
        root:
        (elemen === 'TITLE') ? classes.title : 
        (elemen === 'PENULIS') ? classes.penulis : 
        (elemen === 'ACTION') ? classes.clear : 
        (elemen === 'CAST') ? classes.cast :
        (elemen === 'CHARACTER') ? classes.character :
        (elemen === 'DIALOG') ? classes.clear :
        (elemen === 'GENERAL') ? classes.clear :
        (elemen === 'HEADSCENE') ? classes.headscene :
        (elemen === 'PARENTHETICAL') ? classes.parenthetical :
        (elemen === 'SHOT') ? classes.shot :
        (elemen === 'TRANSITION') ? classes.transition :
        classes.default,
        inputMultiline:
        (elemen === 'ACTION') ? classes.action : 
        (elemen === 'DIALOG') ? classes.dialog :
        (elemen === 'GENERAL') ? classes.general :
        classes.default,
        focused: classes.focused
      }}
    />
  );
}
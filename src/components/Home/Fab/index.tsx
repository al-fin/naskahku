import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      right: theme.spacing(4),
      bottom: theme.spacing(4),
      boxShadow: theme.palette.type === 'light' ? '0px 2px 4px 2px rgba(83, 196, 247, 0.3)' : '0px 2px 4px 2px rgba(0,0,0, 0.3)'
    }
  }),
);

interface Props {
  onClick: () => void
}

export default function FloatingActionbutton(props: Props) {
  const classes = useStyles();

  return (
      <Fab color="primary" className={classes.fab} onClick={props.onClick}>
        <AddIcon />
      </Fab>
  );
}

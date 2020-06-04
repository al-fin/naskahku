import React from 'react';
import {Naskah} from '../../../interfaces/naskah';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from './List';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(0)
    }
  }),
);



interface Props {
  naskah: Naskah[],
  getNaskah: () => void,
}

export default function NaskahList(props: Props) {
  const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      {props.naskah.map((n, k) => (
          <List key={n.id} naskah={n} getNaskah={props.getNaskah} />
      ))}
    </div>
    </>
  );
}

import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HashLoader from "react-spinners/HashLoader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      minHeight: '100vh',
    },
    loader: {
      transform: 'scale(1.25)'
    }
  })
)



export default function Loading() {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center" className={classes.wrapper}>
      <HashLoader
        color={'#2196f3'}
        loading={true}
        size={75}
      />
    </Grid>
  )
}


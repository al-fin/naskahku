import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { useTheme } from '@material-ui/core/styles'; 
import {Naskah, ContentNaskah} from '../../interfaces/naskah';
import db from '../../services/db';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EmptyLightImg from '../../images/empty-light.png';
import EmptyDarkImg from '../../images/empty-dark.png';
import Navigation from './Navigation';
import Fab from './Fab';
import NewDialog from './NewDialog';
import ImportNaskah from './ImportNaskah';
import NaskahList from './NaskahList';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skeletonWrapper: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    skeleton: {
      borderRadius: 25,
      margin: 0,
      marginTop: theme.spacing(2)

    },
    empty: {
      marginTop: theme.spacing(4)
    },
    emptyImg: {
      width: '60%',
    },
    emptyText: {
      color: '#AAA',
      textAlign: 'center'
    }
  }),
);


export default function Home() {
  const theme = useTheme()
  const classes = useStyles()
  const [naskah, setNaskah] = React.useState<Naskah[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true)
  const getNaskah = (keyword: string='') => {
    setLoading(true)
    if (keyword === '') {
      db.table('naskah').reverse().sortBy('updatedAt').then(res => {
        const listNaskah = res.map(n => ({
          ...n,
          scene: n.content.filter((c: ContentNaskah) => c.elemen === 'HEADSCENE').length
        }));
        setNaskah(listNaskah)
        setLoading(false)
      }).catch(err => {
        alert('Gagal mendapatkan list naskah!')
        setLoading(false)
      })
    } else {
      db.table('naskah').reverse().sortBy('updatedAt').then(res => {
        const listNaskah = res.map(n => ({
          ...n,
          scene: n.content.filter((c: ContentNaskah) => c.elemen === 'HEADSCENE').length
        }));
        setNaskah(listNaskah.filter(n => n.judul.toLowerCase().includes(keyword.toLowerCase()) || n.produksi.toLowerCase().includes(keyword.toLowerCase())))
        setLoading(false)
      }).catch(err => {
        alert('Gagal mendapatkan list naskah!')
        setLoading(false)
      })

    }
  }
  React.useEffect(() => {
    getNaskah()
  }, [])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };


  return (
    <>
      <Navigation getNaskah={getNaskah} handleClickOpen={handleClickOpen2} />
      <Grid container justify="space-between" alignItems="flex-end" style={{padding: theme.spacing(2)}}>
        <Grid item xs={8} container alignItems="center">
          <AssignmentOutlinedIcon color="primary" /> 
          <Typography color="primary" variant="h5" style={{
            fontWeight: 'bold',
            marginLeft: theme.spacing(1)
          }}>Naskahku</Typography>
        </Grid>
        <Grid item xs={4} container alignItems="center" justify="flex-end">
          {!loading ? (
            <Typography variant="h6" style={{
              color: '#CCC',
              marginLeft: theme.spacing(1),
              textAlign: 'right'
            }}>{naskah?.length} Project</Typography>
          ) : ''}
        </Grid>
      </Grid>
      {!loading ? (
        <>
        {naskah.length > 0 ? (
          <NaskahList naskah={naskah} getNaskah={getNaskah} />
        ) : (
          <Grid container justify="center" alignItems="center" className={classes.empty}>
          <Grid item xs={12} container justify="center" alignItems="center">
            <img src={theme.palette.type === 'light' ? EmptyLightImg : EmptyDarkImg} alt="No Data" className={classes.emptyImg} />
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            <Typography variant="subtitle1" className={classes.emptyText}>Tidak ada naskah!</Typography>
          </Grid>

          </Grid>
        )}
        </>
      ) : (
          <div className={classes.skeletonWrapper}>
            {[1,2,3, 4].map(() => (
              <Skeleton variant="rect" animation="wave" height={120} width="100%" className={classes.skeleton} />
            ))}
          </div>
      )}
      <Fab onClick={handleClickOpen} />
      <NewDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <ImportNaskah open={open2} handleClickOpen={handleClickOpen2} handleClose={handleClose2} getNaskah={getNaskah} />
    </>
  );
}

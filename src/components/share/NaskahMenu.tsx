import React from 'react';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import 'moment/locale/id';
import { PDFDownloadLink } from '@react-pdf/renderer'
import {Naskah} from '../../interfaces/naskah';
import ExportPdf from '../exports/ExportPdf';
import useDocx from '../../hooks/useDocx';
import ConfirmDelete from './ConfirmDelete';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      boxShadow: '0px 2px 15px 2px rgba(0,0,0,0.15)',
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
    listItemIcon: {
      marginRight: 0,
      paddingRight: 0,
    },
    buttonBase: {
      width: '100%',
      display: 'block',
      textAlign: 'left',
      color: theme.palette.primary.main
    },
    menuText: {
      color: theme.palette.type === 'light' ? 'rgba(0,0,0,0.87)' : '#FFF', 
      textDecoration: 'none'
    }
  }),
);


const StyledMenu = withStyles({
  paper: {
    borderRadius: 12,
    boxShadow: '0px 2px 15px 2px rgba(0,0,0,0.15)',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


interface Props {
  anchorEl: null | HTMLElement,
  handleClickOpen: () => void,
  closeMenu: () => void,
  deleteNaskah: () => void,
  download: () => void,
  naskah?: Naskah,
}


export default function NaskahMenu(props: Props) {
  const classes = useStyles();
  const {anchorEl, handleClickOpen, closeMenu, deleteNaskah, download, naskah} = props;

  const {downloadDocx} = useDocx();
  const handleDownloadDocx = () => {
    closeMenu()
    downloadDocx(naskah)
  }
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpenConfirmDelete = () => {
    closeMenu()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleDelete = () => {
    deleteNaskah()
  }
  

  return (
    <>
    <ConfirmDelete open={open} judul={naskah?.judul} handleClose={handleClose} handleDelete={handleDelete} />
    <StyledMenu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
    >
      <MenuItem onClick={download}>
        <ListItemIcon className={classes.listItemIcon}>
          <GetAppIcon />
        </ListItemIcon>
        <Typography variant="inherit">Download Project</Typography>
      </MenuItem>
      <PDFDownloadLink document={<ExportPdf naskah={naskah} />} fileName={naskah?.judul} className={classes.menuText}>
      <MenuItem onClick={closeMenu}>
        <ListItemIcon className={classes.listItemIcon}>
          <PictureAsPdfIcon />
        </ListItemIcon>
        <Typography variant="inherit">
            Export Pdf
        </Typography>
      </MenuItem>
      </PDFDownloadLink>
      <MenuItem onClick={handleDownloadDocx}>
        <ListItemIcon className={classes.listItemIcon}>
          <DescriptionOutlinedIcon />
        </ListItemIcon>
        <Typography variant="inherit">Export Docx</Typography>
      </MenuItem>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon className={classes.listItemIcon}>
          <EditOutlinedIcon />
        </ListItemIcon>
        <Typography variant="inherit">Edit</Typography>
      </MenuItem>
      <MenuItem onClick={handleClickOpenConfirmDelete}>
        <ListItemIcon className={classes.listItemIcon}>
          <DeleteOutlinedIcon />
        </ListItemIcon>
        <Typography variant="inherit">Hapus</Typography>
      </MenuItem>
    </StyledMenu>
    </>
  );
}

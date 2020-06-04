import {Theme, withStyles} from '@material-ui/core/styles';

import MuiDialogContent from '@material-ui/core/DialogContent';


const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingTop: 0
  },
}))(MuiDialogContent);

export default DialogContent
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors'; 

const ContinueButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      borderRadius:44,
      backgroundColor: '#2B64D2',
      '&:hover': {
        backgroundColor: '#003ba0',
      },
      position: 'absolute',   
      height: '40px',
      width: '60%',   
    },
  }))(Button);

  export default ContinueButton;
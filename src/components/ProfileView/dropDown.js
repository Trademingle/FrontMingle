import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../PostingPage/posting.module.css'; 
import DeletePop from './confirmPop';
import Popup from "reactjs-popup";
import { useHistory} from 'react-router-dom';

const contentStyle = {
  width: 'auto',
  height: 'auto',
  background: '#FFFFFF',
  borderRadius: '16px',
};

export default function SimpleMenu(props) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLink = (event) =>{
    event.preventDefault();
      history.push({
          pathname: '/ClientProfile/' + props.clientId.toString(),
        });
  };
  let userId = localStorage.getItem("client_id")
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon style={{color:"#555555", fontSize:30, marginTop:0}} className={styles.arrow}/>
      </Button>
      {props.clientId === userId
      ?<Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >        
        {/* <Popup trigger={<p className={styles.menuitem}>Edit</p>} 
          modal contentStyle={contentStyle2} >
            {close => <EditJob close={close} id={props.id} onChange={props.onChange}/>}
        </Popup> */}
        <Popup trigger={<p className={styles.menuitem}>Delete</p>} 
          modal contentStyle={contentStyle}>
            {close => <DeletePop close={close} id={props.id}/>}
        </Popup>

      </Menu>
      :<Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >        
    <p className={styles.menuitem1} onClick={handleLink}>View Profile</p>
    </Menu>}

    </div>
  );
};

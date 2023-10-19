import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../PostingPage/posting.module.css'; 
import DeleteButton from '../ResuableComponents/deleteButton';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import CompleteButton from '../ResuableComponents/completeButton';

const contentStyle = {
  width: '350px',
  height: '203px',
  background: '#FFFFFF',
  borderRadius: '16px',
};

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const Message = () =>{
      return(
      <Link style={{ textDecoration: 'none'}}to={{
        pathname:'/InboxPage',
        state: {receiverName:props.name, receiverId:props.contractorId, from: 'ContractorExplore'}
      }}> Message</Link>)
    }

  return (
    <div>
      <MoreVertIcon
          style={{ color: "#555555", fontSize: 36}}
          className={styles.arrow}
          onClick={handleClick}
          alt="More"
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >    
        <MenuItem onClick={handleClose}>{Message()}</MenuItem>
        {/* <MenuItem onClick={handleClose}>Edit</MenuItem> */}
        {localStorage.getItem('usertype') === 'Client'
        ?<DeleteButton id={props.id} page="active"/>:null}
        <CompleteButton id={props.id} complete={2}/>
      </Menu>
    </div>
  );
}
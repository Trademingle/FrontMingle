import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../PostingPage/posting.module.css'; 
import DeleteButton from '../ResuableComponents/deleteButton';
import {Link} from 'react-router-dom';

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
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >        
        <MenuItem onClick={handleClose}>{Message()}</MenuItem>
        {/* <MenuItem onClick={handleClose}>Edit</MenuItem> */}
        {localStorage.getItem('usertype') === 'Client'
        ?<DeleteButton id={props.id} page="complete"/>:null}

      </Menu>
    </div>
  );
}
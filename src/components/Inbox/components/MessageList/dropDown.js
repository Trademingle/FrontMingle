import React, {useEffect, useState} from 'react';
import Menu from '@material-ui/core/Menu';
import styles from '../../../PostingPage/posting.module.css'; 
import InfoIcon from '@material-ui/icons/Info';
import { useHistory} from 'react-router-dom';
import api from '../../../api/api';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
  var profileId = [];
  profileId['id'] = props.receiver;
  const [userType, setUserType] = useState([]);
  const getUserType = () => {
      api.getUserType(profileId).then(res => {
        setUserType(res.data);
      }).catch(err => console.log(err))
  }
  useEffect(() => {
    getUserType();
  },[props.receiver]);  
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = (event) =>{
    event.preventDefault();
    if (userType.usertype === 'client'){
        history.push({
            pathname: '/ClientProfile/' + props.receiver.toString(),
            });
      }
    else if(userType.usertype === 'contractor'){
      history.push({
          pathname: '/profile/' + props.receiver.toString(),
          });
      }
    else {};
  };
  return (
    <div>
      <InfoIcon
          style={{height:32, width:32, cursor:'pointer'}}
          onClick={handleClick}
          alt="More"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >        
        <MenuItem onClick={(event)=>handleProfile(event)}>View Profile</MenuItem>
      </Menu>
    </div>
  );
}

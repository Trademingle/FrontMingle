import React, { useEffect } from "react";
import {useHistory} from 'react-router-dom';
import styles from './notificationItem.module.css';
import api from '../../api/api';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import RecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding:'0px',
  },
}));

const NotificationItem = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () => {
      props.data.type = 'click'
      api.patchNotification(props.data).then(res => {
        console.log('success');
      }).catch(err => console.log(err))
      props.close() 
      onNotificationClick(props.data)
    }

    const handleSeen = () => {
      props.data.type = 'seen'
      api.patchNotification(props.data).then(res => {
        console.log('success');
      }).catch(err => console.log(err))
    }


    useEffect(() => {
      if( (localStorage.getItem('usertype').toLowerCase()==="contractor" && !(props.data.status&4)) 
      || (localStorage.getItem('usertype').toLowerCase()==="client" && !(props.data.status&2))){ // This notification has not been seen 
        handleSeen();
      }
    }, []);

    const onNotificationClick = (data) => {
      switch(data.notificationType) {
        case 1:
          history.push({
            pathname: '/completedposting/'+data.jobId
          })
          break;
        case 2:
          // code block
          history.push({
            pathname: '/activeposting/'+data.jobId
          })
          break;
        case 3:
          history.push({
            pathname: '/ContractorActiveJobs/active'
          })
          break;
        case 4:
            history.push({
              pathname: '/homeowneractivejobs/unassigned'
            })
            break;
        case 5:
            history.push({
              pathname: '/completedposting/'+data.jobId
            })
            break;
        default:
          break;
          // code block
      }
    }
    const isContractor = localStorage.getItem('usertype') === 'Contractor'
    const text_truncate = function(str) {
      let length = 80;
      if (str == null) {
        str = '';
      }
      if (str.length > length) {
        return str.substring(0, length ) + "...";
      } else {
        return str;
      }
    };
    let truncatedMessage = text_truncate(props.message)
    return (
      <List component="nav" className={classes.root} aria-label="mailbox folders" onClick={handleClick}>
        <ListItem button>
          <img src={props.data.downloadUrl} className={styles.userPic} alt=""/>
            {(isContractor&&(props.data.status&8)) || (!isContractor&&(props.data.status&2)) ?
              <div style={{display:'flex',width:'100%', flexDirection:'column'}}>
                <p className={styles.notiftext} style={{color:'#7c7c7c'}}>{truncatedMessage}</p> 
                <p className={styles.date} style={{color: '#999999'}}>{props.date}</p>
              </div>
              :<div style={{display:'flex',width:'100%', flexDirection:'column'}}>
                <p  className={styles.notiftext}>{truncatedMessage}</p> 
                <p className={styles.date} style={{color:'#2B64D2'}}>{props.date}</p>
              </div>
            }
            { (isContractor&&(props.data.status&8)) || (!isContractor&&(props.data.status&2)) ?
              null :
              <RecordIcon style={{color:'#2B64D2', fontSize:'15px'}}/>
            }
        </ListItem>
        <Divider />
      </List>
    );
  };
  
  
export default NotificationItem;
import NotificationItem from '../NotificationItem';
import React from 'react';
import styles from './notificationMenu.module.css';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

function NotificationMenu (props) {
    const renderNotifications = (close) => {
        let i = 0;
        let notificationCount = props.notifications.length
        if (notificationCount === 0){
            return (<p style={{marginBlockStart: '0', marginBlockEnd: '0'}}> It seems you don't have any notifications</p>)
        }
        let notifs = [];
        // notifs.push(
        //   <h3 className={styles.newHeader}>New</h3>
        // );
        while (i < notificationCount){
          let notification = props.notifications[i]
          let message = notification.message
          let date = notification.dateCreated
          notifs.push(
            <NotificationItem close={close} data={notification} message={message} date={date} />
          );
          i += 1
        }
        notifs.reverse();
        return notifs;
      }

    return(
      <div className={styles.outerBox}>
        <div style={{right:'1%', left:'3%', height:'40px', backgroundColor:'white', position:'absolute', zIndex:2}}>
          <CloseOutlinedIcon style={{ height: 40, width: 40, cursor:'pointer', position:"absolute", right:'0px', zIndex:2 }} onClick={()=>props.close()}/>
          <h1 className={styles.alerts}>Notifications</h1>
        </div>
        <div className={styles.box}>
          <div style={{height:'inherit'}}>
            {renderNotifications(props.close)}
          </div>
        </div>
      </div>
    )
  };

  export default NotificationMenu;
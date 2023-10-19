import React from 'react';
import styles from './toolbar.module.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import moment from 'moment';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


export default function Toolbar(props) {
  // var hours = moment()
  // .utcOffset('-04:00')
  // .format('hh:mm');

    const { title, leftItems, rightItems } = props;

  
    function stripName(x) {
      // var first = x.substring(0, x.lastIndexOf("@"));
      return x.charAt(0).toUpperCase() + x.slice(1);
    }

    return (
      <div className={styles.toolbar}>
        {/* <AccountCircleIcon className={styles.conversation_photo} style={{height:35,width:35}}/> */}
        <div className={styles.left_items}>{ leftItems }</div>
    <h1 className={styles.toolbar_title}>
          {/* {`Plumbing`} */}
          {/* <FiberManualRecordIcon 
          fontSize="small" 
          style={{fontSize:'13px', paddingRight:'5px', paddingLeft:'5px'}}
          /> */}
          {stripName(title)}</h1>
        <div className={styles.right_items}>{ rightItems }</div>
      </div>
    );
}

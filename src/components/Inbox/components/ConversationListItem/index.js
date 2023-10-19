import React, {useEffect} from 'react';
import shave from 'shave';
import moment from 'moment';

import styles from './conversationListItem.module.css';

var hours = moment()
      .utcOffset('-04:00')
      .format('hh:mm');

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })
  const tmp = moment()
  const ts = moment(props.data.timestamp);
  let timeVal;
  if (moment().diff(ts, 'minutes')<60){
    timeVal = String(moment().diff(ts, 'minutes')) + 'm' 
  }else if(moment().diff(ts, 'hours')<24){
    timeVal = String(moment().diff(ts, 'hours')) + 'h' 
  }else if(moment().diff(ts, 'days')<24){
    timeVal = String(moment().diff(ts, 'days')) + 'd' 
  }else{
    timeVal = String(moment().diff(ts, 'weeks')) + 'w' 
  }

    return (
      <div className={styles.conversation_list_item}>
        <img src={props.data.tiny} className={styles.conversation_photo} alt=""/>
        <div className={styles.conversation_info}>
          <h1 className={styles.conversation_title}>{ props.data.firstName + ' ' + props.data.lastName}</h1>
          <p className={styles.conversation_snippet}>{ props.data.lastMessage }</p>
        </div>
        <p className={styles.conversation_time}> {timeVal}</p>
      </div>
    );
}
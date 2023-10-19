import React, {useEffect, useState } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import Message from '../Message';
import moment from 'moment';
import InfoIcon from '@material-ui/icons/Info';
import api from '../../../api/api';
import styles from './messageList.module.css';
import DropDown from './dropDown';
import Send from '@material-ui/icons/SendSharp';

export default function MessageList(props) {
  const MY_USER_ID = localStorage.getItem('user_id');
  let [messages, setMessages] = useState([]);
  const loadMessages = (receiver=props.receiver) => {
    console.log(props.receiver);
      api.getMessages(props.receiver).then(res => {
        //Sample response: {"from_sender": 
        //                          [{"sender": "sagar", "receiver": "prawesh", "message": "Message seen", "timestamp": "2020-09-27T02:03:58.310166Z"}], 
        //                  "to_sender": 
        //                          [{"sender": "prawesh", "receiver": "sagar", "message": "Hello, just test", "timestamp": "2020-09-27T02:03:47.940499Z"}]}
        const newMessages = [...res.data.from_sender,...res.data.to_sender]
        newMessages.sort(function(x, y){
          return new Date(x.timestamp) - new Date(y.timestamp);
        })
        messages.push(...newMessages);
        setMessages(newMessages);
        props.onMessagesUpdate();
      }).catch(err => console.log(err))
  }

  // This is the polling function
  let reloadMessages = (receiver=props.receiver) => {
    api.getMessages(receiver).then(res => {
      const newLen = (res.data.from_sender.length + res.data.to_sender.length );
      if (newLen> messages.length){
        const newMessages = [...res.data.from_sender,...res.data.to_sender]
        newMessages.sort(function(x, y){
          return new Date(x.timestamp) - new Date(y.timestamp);
        })
        messages.push(...newMessages.slice(-(newLen-messages.length) ));
        messages = [...messages]
        setMessages(messages);
        props.onMessagesUpdate();
      }
    }).catch(err => console.log(err))
  }

  let sendMessage = ( messageText) => {
    const message_data = {
      receiver: props.receiver,
      message: messageText
    }
    api.sendMessage(message_data).then(res => {
      console.log('message was successfully sent!');
      reloadMessages();
    }).catch(err => console.log(err))
  }
  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.sender === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }
    return tempMessages;
  }

  const onMessageEvent = (event) => {
    if(typeof event['data'] === 'string'){
      console.log('data is not there');
    }else{
      reloadMessages();
      // alert('MESSAGING HAS RECEIVED THE EVENT');
    }
  }
  // debugger;


  useEffect(() => {
    messages = [];
    setMessages(messages);
    loadMessages();
    window.addEventListener("message", onMessageEvent, false);
    // debugger
    // if (props.name == null){
    //   props.name = 'sailesh@sharma.com'
    // };
    const reload = setInterval(()=>{
      reloadMessages();
    }, 10000);

    return () => {
      clearInterval(reload);
      window.removeEventListener("message", onMessageEvent, false);
    }

  },[props]);

  return(
      <div className={styles.message_list}>

        <Toolbar className={styles.toolbar}
          title={props.name}
          rightItems={[
            <DropDown receiver={props.receiver}/>,
          ]}
        />
        <Compose onEnter={sendMessage}/>
        {props.receiver === 0 && props.name === ''?
        <div style={{width:'40%', textAlign:'center', margin:'10% auto 0 auto'}}>
          <Send style={{color:"#2B64D2", fontSize:80, transform: "translateY(50%) rotate(-45deg)", marginBottom:'35px'}} />
          <p>Please select a name from list to start chatting.</p>
          <p>If the list is empty, the only way to start a conversation is to visit user's profile and click on message button.</p>
        </div>:
        <div className={styles.message_list_container}>{renderMessages()}</div>}

      </div>
    );
}
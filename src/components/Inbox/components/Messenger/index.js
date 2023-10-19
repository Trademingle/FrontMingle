import React, { useState} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import styles from './messenger.module.css';
import {Route } from 'react-router-dom';


export default function Messenger(props) {
 
  const [state, setState] = useState({
    receiverId: 0,
    receiverName: ''
  })

  // useEffect(() => {
  //   loadMessages();
  // },[state]);

  let updateUserId = (data) =>{
    setState({
      receiverId: data.Id,
      receiverName: data.name
    });
  }


  //Temporary timer for message loading
  // const interval = setInterval(function() {
  //   loadMessages();
  // }, 10000);

  let messagesEnd;
  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  const onMessageUpdate = () => {
    
    scrollToBottom()
  }
    return (
      <div className={styles.messenger}>
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}
        
        <div className={[styles.scrollable,styles.sidebar].join(' ')}>
          <ConversationList onConversationSelect={updateUserId}/>
        </div>
        
        <div id='scrollContainer' className={[styles.scrollable, styles.content].join(' ')}>
          <Route path="/InboxPage" render={(props) =>{
            if (!props.location.state || !('from' in props.location.state)){
              props.location.state = state
            };
            return(
              <MessageList 
              name={props.location.state.receiverName} 
              receiver={props.location.state.receiverId} 
              onMessagesUpdate={onMessageUpdate} /> 
            )
          }}/>
          <div style={{ float:"left", clear: "both" }}
              ref={(el) => { messagesEnd = el; }}>
          </div>
{/* <Route
      exact
      path="/InboxPage"
      component={MessageList}
 /> */}
          
          {/* <MessageList name={state.receiverName} receiver={state.receiverId} routedID={state.routedId}/> */}
        </div>
      </div>
    );
}
import React, {useState, useEffect} from 'react';
import ConversationListItem from '../ConversationListItem';
import api from '../../../api/api';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search'; 
import styles from './conversationList.module.css';
import LoadingView from '../../../ResuableComponents/loadingView';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredConversations, setfilteredConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getConversations = (props) => {
    // axios.get('https://randomuser.me/api/?results=20').then(response => {
    //     let newConversations = response.data.results.map(result => {
    //       return {
    //         photo: result.picture.large,
    //         name: result.name.first/*`${result.name.first} ${result.name.last}`*/,
    //         text: 'Preview Message...'
    //       };
    //     });
    //     console.log(newConversations);
    //     setConversations(newConversations.slice(0,6));
    // });

    api.getChats().then(res => {
      console.log("Chats loaded successfully");
      console.log(res);
      setConversations(res.data);
      setLoading(false);
    }).catch(err => console.log(err))
  }

  // let changeConversations = (data) => {
  //   // props.onConversationSelect(data);
  // };
  useEffect(() => {
    setLoading(true);
    getConversations();
  },[])

  useEffect(() => {
    setfilteredConversations(
      conversations.filter((conversation) =>
      (conversation.firstName + ' ' + conversation.lastName).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, conversations]);

  if (loading) {
    return <LoadingView/>;
  }

  return (
    <div className={styles.conversation_list}>
      <h1 className={styles.inbox}>Inbox</h1>
      <div className={styles.conversation_search}>
        <SearchIcon className={styles.search_icon}/>
        <input
          type="search"
          className={styles.conversation_search_input}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
    </div>
      {
        filteredConversations.map(conversation =>
          <Link style={{ textDecoration: 'none' }} to={{
              pathname:'/InboxPage',
              state: {receiverName:conversation.firstName, receiverId:conversation.id, from: 'Inbox'}
            }}>
            <ConversationListItem
            key={conversation.name}
            data={conversation}/>
            
          </Link>
          
        )
      }
    </div>
  );
}
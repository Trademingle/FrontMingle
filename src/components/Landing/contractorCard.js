import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TagStyles from '../ContractorActiveJobsPage/styles.module.css';
import styles from './landing.module.css'; 
import StarIcon from '@material-ui/icons/Star'; 
import Tags from '../ContractorActiveJobsPage/tags';
import BookmarkButton from '../ResuableComponents/bookmarkButton';
import MessageButton from '../ResuableComponents/messageButton';

export default function ContractorCard(props) {
  const history = useHistory();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/profile/' + props.contractorId.toString(),
    });
  };
  const renderTags = () => {
    let i = 0;
    let tagsCount = props.serviceList.length;
    let tempTags = [];
  
    while (i < tagsCount) {
      tempTags.push(<Tags className={styles.tag} tagname={props.serviceList[i]}/>);
      i += 1;
    };
    return tempTags;
  };

  return (
    <div>
      <Card className={styles.card} onClick={handleOnSubmit}>
          <CardHeader
            avatar={
              <Avatar src={props.avatar} style={{height:'50px', width:'50px', marginTop:'-8px'}}>
              {/* <img src={props.avatar}></img> */}
              </Avatar>
            }
            action={<BookmarkButton/>}
            
            title={<p className={styles.title} >{props.name}</p>}
            subheader={
              <div className={styles.subheader}>
                <p className={styles.rating}><StarIcon className={styles.Vector} styles={{height:19, width:19}}/>{props.rating} </p>
                <p className={styles.review}><span>&#8226;</span> {props.reviews} reviews</p>
              </div>}
          />
          <CardContent className={styles.content}>
            <box className={TagStyles.servicetagbox}>{renderTags()}</box>
            <div className={styles.message}><MessageButton name={props.name} contractorId={props.contractorId}/></div>
          </CardContent>
      </Card>
    </div> 
  );
};

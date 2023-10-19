import React from 'react';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TagStyles from '../ContractorActiveJobsPage/styles.module.css';
import styles from './explore.module.css'; 
import Tags from '../ContractorActiveJobsPage/tags';
import StarIcon from '@material-ui/icons/Star'; 
import BookmarkButton from '../ResuableComponents/bookmarkButton';
import MessageButton from '../ResuableComponents/messageButton';

const ExploreCard = (props) => {
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
      tempTags.push(<Tags className={styles.tag} tagname={props.serviceList[i]} />);
      i += 1;
    };
    return tempTags;
  };
  return (
    <Card className={styles.card} onClick={handleOnSubmit}>
      <img src={props.avatar} className={styles.avatarpic} alt=""></img>
      <CardHeader 
        action={<BookmarkButton />}
        title={<p className={styles.title}>{props.name}</p>}
        subheader={
          <div className={styles.subheader}>
            <p className={styles.review}><StarIcon className={styles.Vector}/>{props.rating} <span>&#8226;</span> {props.review} review</p>
          </div>}
      />
      <CardContent className={styles.content}>
        <box className={TagStyles.servicetagbox}>
          {renderTags()}
        </box>
      </CardContent>
      <div className={styles.message}><MessageButton name={props.name} contractorId={props.contractorId}/></div>
    </Card>
  );
};

export default ExploreCard;

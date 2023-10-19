import React from 'react';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TagStyles from '../ContractorActiveJobsPage/styles.module.css';
import styles from '../HomeOwnerExplorePage/explore.module.css'; 
import Tags from '../ContractorActiveJobsPage/tags';
import MessageButton from '../ResuableComponents/messageButton';
import BookmarkButton from '../ResuableComponents/bookmarkButton';

const ExploreCard = (props) => {
  const history = useHistory();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    history.push('/PostingPage/'+ props.id.toString());
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

  const handleLink = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    history.push({
      pathname: '/Clientprofile/' + props.clientId.toString(),
      })
    }
  return (
    <div>
      <Card className={styles.card} onClick={handleOnSubmit}>
      {props.avatarPic === undefined 
          ?<img src='https://www.bilco.com/Images/No-image-found.jpg' className={styles.avatarpic} alt=""/>
          :<img src={props.avatarPic} className={styles.avatarpic} alt=""/>
          }
          <CardHeader
            action={
              <BookmarkButton id={props.id}/>
            }
            title={<p className={styles.title}>{props.name}</p>}
            subheader={
              <div className={styles.subheader}>
                {/* <p className={styles.review}>{props.Cname} <span>&#8226;</span> {props.location}</p> */}
                    <p className={styles.name} onClick={handleLink}>{props.Cname}</p>
                    <p className={styles.location}><span>&#8226;</span> {props.location}</p>
              </div>}
          />
          <CardContent className={styles.content}>
          <box className={TagStyles.servicetagbox}>{renderTags()}</box>
        </CardContent>
        <div className={styles.message}><MessageButton name={props.Cname} contractorId={props.clientId}/></div>
      </Card>
    </div> 
  );
};

export default ExploreCard;

import React from 'react';
import styles from './styles.module.css';
import { useHistory} from 'react-router-dom';
import Tags from './tags';
import { Grid } from '@material-ui/core';
import CompleteButton from '../ResuableComponents/completeButton';

const JobPosting=(props)=> {
    const history = useHistory();
    // var jobid = props.id;
    const handleOnSubmit = (event) => {
      event.preventDefault();
    //   if(localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor'){
        history.push({
            pathname: '/PostingPage/'+ props.id.toString(),
          });
    //   }
    //   else{
    //     history.push({
    //         pathname: '/unassignedposting/' + props.id.toString(),
    //     });}
    //   debugger
    }
    const renderTags = () => {
        let i = 0;
        let tagsCount = props.serviceList.length;
        let tempTags = [];
      
        while (i < tagsCount  && i < 3) {
          tempTags.push(<Grid item ><Tags className={styles.tag} tagname={props.serviceList[i]} /></Grid>);
          i += 1;
        };
        if (i >= 3){tempTags.push(<Grid item ><Tags className={styles.tag} tagname={'View all'} /></Grid>);}
        return tempTags;
    };
    const text_truncate = function(str) {
    let length = 40;
    if (str == null) {
        str = '';
    }
    if (str.length > length) {
        return str.substring(0, length ) + "...";
    } else {
        return str;
    }
    };
    return (
    <div className={styles.jobbox} >
        {props.avatar === undefined 
          ?<img src='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' className={styles.rectangle25}  onClick={handleOnSubmit} alt=""/>
          :<img src={props.avatar} className={styles.rectangle25}  onClick={handleOnSubmit} alt=""/>
          }
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1 className={styles.title} onClick={handleOnSubmit}>{text_truncate(props.title)}</h1>
            <CompleteButton id={props.id} complete={props.complete}/>
        </div>
        <box className={styles.frame} onClick={handleOnSubmit}>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.location}><span>&#8226;</span> {props.location}</p>
        </box>
        <box className={styles.servicetagbox}>          
            <Grid container spacing={1} justify="left">{renderTags()}</Grid>
        </box>
    </div> )
};

export default JobPosting; 

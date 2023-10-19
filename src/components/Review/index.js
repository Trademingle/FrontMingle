import React from 'react';
import ReviewPages from './ReviewPages';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import styles from "./review.module.css";

const Review= (props) => (
  <div>
    <CloseOutlinedIcon style={{ height: 40, width: 40, color:'#555555' }} className={styles.cross} onClick={props.close}/>
    <ReviewPages name={props.name} title={props.title} jobId={props.jobId} contractorId={props.contractorId}/>
  </div>
);

export default Review;
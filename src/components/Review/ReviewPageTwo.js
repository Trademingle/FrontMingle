import React from 'react';
import styles from './review.module.css'

const ReviewPageTwo = (props) => {
  const keyPressed = (event) => {
    // debugger
    if (event.target.id === 'reviewContent' && event.target.value !== props.data.reviewContent){
      props.data.reviewContent = event.target.value;
    }
    if (event.target.id === 'reviewTitle' && event.target.value !== props.data.reviewTitle){
      props.data.reviewTitle = event.target.value;
    }}
  return (
    <div >
      <box className={styles.biggestbox}>
        <box className={styles.ratingbox1}>
          <h2 className={styles.h2}>Review title: </h2>
          <input id="reviewTitle" className={styles.inputbox} defaultValue={props.data.reviewTitle} onKeyUp={keyPressed}/>
        </box>
        <box className={styles.ratingbox2}>
          <h2 className={styles.h2}>Write a review (optional)</h2>
          <p className={styles.description}>Further elaborate on the job done.</p>
          <textarea id="reviewContent" className={styles.textbox} defaultValue={props.data.reviewContent} onKeyUp={keyPressed}/>
        </box>
      </box>
    </div>

  )
};

export default ReviewPageTwo;
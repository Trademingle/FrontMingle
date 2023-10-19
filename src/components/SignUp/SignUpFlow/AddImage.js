import React from 'react';
import styles from './signUpCss/addImage.module.css'
import UploadButton from '../common/Imageupload';
import ContinueButton from "../common/ContinueButton";


const AddListingTwo = (props) => {
  // const keyPressed = (event) => {
    // if (event.target.id == 'location'){
    //   props.data.languageList = event.target.value;
    // }}
  props.information['profile_image']= [];
  return (
    <div className={styles.loginContainer}>
      <box className={styles.mediabox}>
        <h2 className={styles.h2}>Add a profile picture</h2>
        <p className={styles.description}>Add and image for others to see you.</p>
        <box className={styles.uploadbox}>
          <UploadButton urls={props.information.profile_image}/>
        </box> 
      </box>
      <div className={styles.loginbuttondiv}>
        <ContinueButton type="submit" onClick={props.onDecision}>
          <p className={styles.continueWithEmailParagraph}>Continue </p>
        </ContinueButton>
      </div>
      <button className ={styles.skipbutton} onClick={props.onDecision}>Skip</button>
    </div>
  )
};

export default AddListingTwo;
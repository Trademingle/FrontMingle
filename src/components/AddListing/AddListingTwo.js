import React from 'react';
import styles from './review.module.css'
import UploadButton from './Imageupload';
import CustomizedHook from "./searchHooks";

const AddListingTwo = (props) => {
  // const keyPressed = (event) => {
    // if (event.target.id == 'location'){
      props.data.languageList = "";
    // }}
  return (
    <box className={styles.biggestbox}>
      <box className={styles.mediabox}>
        <h2 className={styles.h2}>Media (Optional)</h2>
        <p className={styles.description}>Add images or videos that show your project.</p>
        <box className={styles.uploadbox}>
          <UploadButton urls={props.data.imageListStoreRef}/>
        </box>
      </box>
      <box className={styles.languagebox}>
        <h2 className={styles.h2}>Languages (Optional)</h2>
        <p className={styles.description}>Add the languages that you are comfortable speaking and writing.</p>
        {/* <input type="list" id="location" className={styles.langtextbox} placeholder="E.g. English"/> */}
        <CustomizedHook information={props.data} type='languageList' width='99%'/> 
      </box>
    </box>
  )
};

export default AddListingTwo;
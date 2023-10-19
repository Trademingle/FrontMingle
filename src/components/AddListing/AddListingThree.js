import React from 'react';
import styles from './review.module.css'
import UploadButton from './Imageupload';


// function get_input_data() {
//   var job_title_ = document.getElementById("job_title").value;
//   return(job_title_);
// }
   

const AddListingThree = (prop) => {
  const Languages=() =>{
    if (prop.data.languageList === ""){
      prop.data.languageList = localStorage.getItem('defaultLanguageList').split(',')
      return(
        prop.data.languageList.join(', ')
      )
    }
    else{
      return(prop.data.languageList.join(', '))
    }
  }
  const Skills=() =>{
    if (prop.data.serviceTypeList === []){
      return(
        null
      )
    }
    else{
      return(prop.data.serviceTypeList.join(', '))
    }
  }
  return (
    <box className={styles.biggestbox}>
      <box className={styles.ratingbox2}>
        <div className={styles.titlebigbox3}>
          <box className={styles.titlebox3}>
            <h2 className={styles.h2}>Job title</h2>
            <p className={styles.description}>{prop.data.title}</p>            
          </box>
          <box className={styles.locationbox3}>
            <h2 className={styles.h2}>Job location</h2>
            <p className={styles.description}>{prop.data.locationDetail}</p>
          </box>
        </div>
          <h2 className={styles.h2}>Skills</h2>
          <p className={styles.description}>{Skills()}</p>
          <h2 className={styles.h2}>Description</h2>
          <p className={styles.description}>{prop.data.jobDetails}</p>
          <h2 className={styles.h2}>Media(Optional)</h2>
          <UploadButton urls={prop.data.imageListStoreRef}/>
          <h2 className={styles.h2}>Languages(Optional)</h2>
          <p className={styles.description}>{Languages()}</p>
      </box>
    </box>
  )
};


export default AddListingThree;
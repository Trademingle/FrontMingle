import React,{useState} from 'react';
import styles from './review.module.css'
import CustomizedHook from "./searchHooks";
import GoogleMaps from '../LocationTextField';

// const keyPressed = (event) => {
//   debugger
//   if (event.key == 'Enter'){
//     event.target.value='';
// }}

const AddListingOne = (props) => {
  const keyPressed = (event) => {
    // debugger
    if (event.target.id === 'job_title' && event.target.value !== props.data.title){
      props.data.title = event.target.value;
    }
    else if (event.target.id === 'job_location'){
      props.data.locationDetail = event.target.value;
    }
    else if (event.target.id === 'job_description'){
      props.data.jobDetails = event.target.value;
    }
  }
  let [information, setInformation] = useState({})
  props.data.locationDetail = information.address;
  props.data.jobLatitude = information.lat;
  props.data.jobLongitude = information.long;
  return (
    <box className={styles.biggestbox}>
      <box className={styles.ratingbox2}>
        <div className={styles.titlebigbox}>
          <box className={styles.titlebox}>
            <h2 className={styles.h2}>Job title</h2>
            <p className={styles.description}>Give your listing a descriptive name.</p>
            <input id= "job_title" className={styles.titletextbox} placeholder="E.g. Fence painting" defaultValue={props.data.title} onKeyUp={keyPressed}/>
          </box>
          <box className={styles.locationbox}>
            <h2 className={styles.h2}>Job location</h2>
            <p className={styles.description}>As you type, addresses will appear. You can also select from your saved addresses.</p>
            {/* <input id="job_location" className={styles.locationtextbox} placeholder="E.g. 123 Leslie Street" defaultValue={props.data.locationDetail} onKeyUp={keyPressed}/> */}
            <div className={styles.locationtextbox}><GoogleMaps id='job_location' information={information} setLocation={setInformation}/></div>
          </box>
        </div>
        <box className={styles.skillsBox}>
            <h2 className={styles.h2}>Skills </h2>
            <p className={styles.description}>Add the skills related to the job.</p>
            {/* <input type="list" id="skills" className={styles.skillstextbox} /> */}
            <CustomizedHook information={props.data} type='serviceTypeList' width="99%"/> 
        </box>
        <box className={styles.descBox}>
          <h2 className={styles.h2}>Description</h2>
          <p className={styles.description}>Include any details you think are important for contractors to know about your job.</p>
          <textarea id="job_description" className={styles.textbox} defaultValue={props.data.jobDetails} onKeyUp={keyPressed}/>
        </box>
      </box>
    </box>
  )
};

function get_input_data() {
  var job_title_ = document.getElementById("job_title").value;
  return(job_title_);
}

export default AddListingOne;
export {get_input_data};
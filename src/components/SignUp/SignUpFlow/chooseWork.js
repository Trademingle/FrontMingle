import React from 'react';
import styles from './signUpCss/chooseWork.module.css'
import ContinueButton from "../common/ContinueButton";
import CustomizedHook from "./search";
import api from '../../api/api';
// import Checkbox from '@material-ui/core/Checkbox'


const ChooseWork = props => {

  // const jobs = ["Electrician", "PLumber", "BoobRaj", "Sapna", "Gheu", "shusil", "Sauced"];
  // const listItems = jobs.map((job) =>
  //   <h1><Checkbox/>{job}</h1>
  // );
  // [optionsState, setOptions] = useState([]);
  const generateServiceTypes = () => {
    return api.serviceTypes.map(function(item) {
      return {title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()};
    });
  }
    return (
      <div className={styles.loginContainer}>
        <box className={styles.mediabox}>
          <h2 className={styles.header}>Choose your work</h2>
          <p className={styles.para}>Search for and select all the services that you provide. These will appear on your profile and can be edited later on</p>
          <div className={styles.chooseBox}>
            {/* this is for the customized from search.js from this directory */}
            <CustomizedHook information={props.information} options={generateServiceTypes()} type='serviceTypeList'/> 
          </div>
        </box>
        <div className={styles.loginbuttondiv}>
          <ContinueButton type="submit" onClick={props.onDecision}>
              <p>Continue </p>
          </ContinueButton>
        </div>  
      </div>   
    )
  };
  
  export default ChooseWork;     
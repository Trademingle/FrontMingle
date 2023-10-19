import React from 'react';
import styles from './signUpCss/chooseWork.module.css'
import ContinueButton from "../common/ContinueButton";
import CustomizedHook from "./languageSearch";
import api from '../../api/api';
// import Checkbox from '@material-ui/core/Checkbox'


const ChooseLanguage = props => {

  // const jobs = ["Electrician", "PLumber", "BoobRaj", "Sapna", "Gheu", "shusil", "Sauced"];
  // const listItems = jobs.map((job) =>
  //   <h1><Checkbox/>{job}</h1>
  // );

  const generateLanguages = () => {
    return api.languages.map(function(item) {
      return {title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()};
    });
  }
    return (
      <div className={styles.loginContainer}>
          <box className={styles.mediabox}>
            <h2 className={styles.header}>Languages</h2>
            <p className={styles.para}>Search for and select all the languages that you prefer. These will appear on your profile and can be edited later on</p>
          <div className={styles.chooseBox}>
            {/* this is for the customized from languageSearch.js from this directory */}
               <CustomizedHook information={props.information} options={generateLanguages()} type='languageList'/> 
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
  
  export default ChooseLanguage;     
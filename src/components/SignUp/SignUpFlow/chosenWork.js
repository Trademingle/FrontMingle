import React from 'react';
import styles from './signUpCss/chooseWork.module.css'
import ContinueButton from "../common/ContinueButton";


const ChosenWork = props => {
    return (
      <div className={styles.loginContainer}>
          <box className={styles.mediabox}>
            <h2 className={styles.header}>You're all set</h2>
            <p className={styles.para}>You can edit your information  anytime on your profile screen. 
            Click ‘Start’ to get started looking for clients and building your business</p>
           </box>
        <div className={styles.loginbuttondiv}>
          <ContinueButton type="submit" onClick={props.onDecision}>
            <p >Get Started! </p>
          </ContinueButton>
        </div>
      </div>   
    )
  };
  
  export default ChosenWork;    
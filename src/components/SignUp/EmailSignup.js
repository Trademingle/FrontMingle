 import React, { useState } from "react"
// import { Link, useHistory } from "react-router-dom"
import styles from './styles.module.css';
import Firebase from '../Firebase/firebase';
import SignInGoogle from './SUgoogle'
import { useHistory } from 'react-router-dom';
import ContinueButton from "./common/ContinueButton";
// import glogo from './icons/google-icon.svg';
// import elogo from './icons/email1.svg';
import alogo from './icons/apple.svg'; 
// import { Form, Button, Card, Alert } from "react-bootstrap"
import swal from 'sweetalert';

const SignUpMain = (props) =>{
  const state = {email:''};
  let [signupState, setSignUpState] = React.useState(state);
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  // const handleChange = (event) => { 
  //   setSignUpState({
  //     [event.target.name]: event.target.value
  //   });
  // }
  const onSetEmailOrPassword = () => {
    // debugger;
    // signupState = {
    //   email: email,
    //   password: password
    // }
    if (email === "") {
      signupState['error1'] = 'Email must not be blank';
      setSignUpState({...signupState})
    }else if (password === "") {
      signupState['error1'] = 'Password must not be blank';
      setSignUpState({...signupState})
    }else{
      props.information['email']=email
      props.information['password']=password
      onContinueClick();
    }
  }

  const onContinueClick = (event) => {
    // const email = signupState['email']
    // const password = signupState['password']
    // props.information['email'] = email
    // props.information['password'] = password
    Firebase.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in 
      props.information['user'] = user;
      window.localStorage.setItem('emailForSignIn', email);
      props.onEmailClick();
    })
    .catch((error) => {
      var errorMessage = error.message;
      signupState['error'] = error.message;
      setSignUpState({...signupState})
    });
  }

  const onExternalDone = (user)=>{
    props.information['user'] = user;
    window.localStorage.setItem('emailForSignIn', user.user.email);
    props.information['email'] = user.user.email
    props.information['password'] = ''
    props.onEmailClick();
  }
  return(
    <div className={styles.box}>
      <h1 className={styles.header}>Sign up</h1>
      <p className={styles.para}>Whether you're a contractor, homeowner or homebuilder, sign up here!</p>
      <box className={styles.rectangle}>
        <div > 
          <SignInGoogle firebase={Firebase.auth} history={useHistory()} onComplete={onExternalDone}/>
        </div>
        <button className={styles.apple}
          onClick={()=>
            swal({
              title: "Feature Unavailable!",
              text: "Please sign up with google or create an account!",
              icon: "error",
              button: "Go back!",
            })}>
            <img src={alogo} className={styles.logo} alt={'apple'} />
            <p style={{marginTop:'20px'}}>Sign Up with Apple</p>
        </button>
      </box>
      <div className={styles.linesdiv}>
          <hr className={styles.line1}></hr>
          <p className={styles.or}>OR</p>
          <hr className={styles.line1}></hr>
        </div>
      {/* <EmailSignUp onEmailEnter={onSetEmailOrPassword} /> */}
      <div className={styles.loginContainer}>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <form onSubmit={e => {
          e.preventDefault() && true && onSetEmailOrPassword()}
          } autoComplete="off" >         
          <h3 className={styles.password}>Email</h3>
          <div className={styles.rectangle1}>
            <input  required className={styles.input1} id="email" placeholder="Enter your email address" name="email" type="email" 
              value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
        
          <h3 className={styles.password}>Password</h3>
          <div className={styles.rectangle1}>
            <input  required className={styles.input1} id="password" placeholder="password" name="password" type="password"
              value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
        {/* <button onClick={onRegister}>Submit</button> */}
        <div className={styles.loginbuttondiv}>
          {signupState.error ? <p className={styles.textDanger}>{signupState.error}</p> : null}
          <ContinueButton type="submit" onClick={onSetEmailOrPassword}>
            <p className={styles.continueWithEmailParagraph}>Continue </p>
          </ContinueButton>
        </div>
        </form>
      </div>
      <div className={styles.textdiv}>
        <p className={styles.already}>Already have an account?</p>
        <p className={styles.login} onClick={()=>props.setOpen(true)}> Log in</p>
      </div>  
    </div>
  )
}

const contentStyle2 = {
  width: '702px',
  height: '680px',
  background: '#FFFFFF',
  borderRadius: '16px', 
};
export default (SignUpMain);
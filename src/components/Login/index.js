import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {signin} from '../Firebase/auth';
import Popup from 'reactjs-popup';
import { withStyles } from '@material-ui/core/styles';
import SignUpPage from '../SignUp/index.js';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import styles from './login.module.css';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import SignUpWithEmail from "../SignUp/SignUpWithEmail/SUemail";
import glogo from '../SignUp/icons/google-icon.svg';
// import elogo from '../SignUp/icons/email1.svg';
import alogo from '../SignUp/icons/apple.svg';
import api  from '../api/api';
import { purple } from '@material-ui/core/colors'; 
import Firebase from '../Firebase/firebase';
import swal from 'sweetalert';
import LoadingView from '../ResuableComponents/loadingView';

const contentStyle2 = {
  width: '702px',
  height: '680px',
  background: '#FFFFFF',
  borderRadius: '16px', 
};

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const signInCallback= (val)=>{
    setLoading(false)
    if (val['usertype'] === 'Contractor'){
      window.location.href='/contractorexplore'
    }
    else if (val['usertype'] === 'Client'){
      window.location.href='/homeownerexplore'
    }
    else{
      swal({
        title: "Login Error!",
        text: "Login error! Please make sure you have signed up!",
        icon: "error",
        button: "Try Again",
      });
    }
  }
  const onSignIn= ()=>{
    setLoading(true)
    Firebase.auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      // ...
      // informationState['id_token'] = idToken;
      api.signIn({'id_token':idToken},signInCallback);
    }).catch(function(error) {
      // Handle error
      // setStateCode(9);
      setLoading(false)
      console.log(error)
    }
    );
  }
  if (loading) {
    return <LoadingView/>;
  }
  return(
    <Popup open={props.open} modal contentStyle={contentStyle2}>
    <box className={styles.box}>
      <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles.cross} onClick={()=>props.setOpen(false)}/>
      <h1 className={styles.header}>Log in</h1>
      <p className={styles.para}>Whether you're a contractor, homeowner or homebuilder, log in here!</p>
      <box className={styles.rectangle}>
        <div>
          <SignInGoogle signIn={onSignIn}/>
        </div>
        <button
          className={styles.apple}
          onClick={()=>
            swal({
              title: "Feature Unavailable!",
              text: "Please sign up with google or create an account!",
              icon: "error",
              button: "Go back!",
            })}>
            <img src={alogo} className={styles.logo}alt={'apple'} />
            <p ClassName={styles.signupapple} style={{marginTop:'20px'}}>Log in with Apple</p>
        </button>
        <div className={styles.linesdiv}>
          <hr className={styles.line1}></hr>
          <p className={styles.or}>OR</p>
          <hr className={styles.line1}></hr>
        </div>
        <Login setLoading={setLoading} setOpen1={setOpen1}/>
      </box>
    </box>
    <SignUpPage setOpen={setOpen1} open={open1}/>
    </Popup>
  );
}
class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { error: null };
  }
 
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // debugger;
        // this.props.firebase
        //   .user(socialAuthUser.user.uid)
        //   .set({
        //     username: socialAuthUser.user.displayName,
        //     email: socialAuthUser.user.email,
        //     roles: {},
        //   });
        // debugger;
        this.props.signIn();
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  render() {
    const { error } = this.state;
 
    return (
      <form onSubmit={this.onSubmit}>
        <button
          className={styles.apple}>
            <img src={glogo} className={styles.logo} alt={'google'}/>
              <p ClassName={styles.signupapple} style={{marginTop:'20px'}} >Log in with Google</p>
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

class Login extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  signInCallback(val){
    // console.log(val);
    if (val['usertype'] === 'Contractor'){
      window.location.href='/contractorexplore'
    }
    else if (val['usertype'] === 'Client'){
      window.location.href='/homeownerexplore'
    }
    else{
      swal({
        title: "Login Error!",
        text: "Incorrect username or password!",
        icon: "error",
        button: "Try Again",
      });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  loginClicked(event){
    this.props.setLoading(true)
    const callBack = this.signInCallback
    if (this.state.email && this.state.password){
      Firebase.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        userCredential.user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          // Signed in
          api.signIn({'id_token':idToken},callBack)
            this.props.setLoading(false)
        })
        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        //Still have to sign in with the django backend
        const info = {
          "username": this.state.email,
          "password": this.state.password
        }
        api.signIn(info,this.signInCallback)
        this.props.setLoading(false)
        // ...
      });
      
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      // this.setState({ error: error.message });
    }
  }
  render() {
    return (
      <div className={styles.loginContainer}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>         
          <h3 className={styles.password}>Email</h3>
          <div className={styles.rectangle1}>
            <input className={styles.input1} placeholder="Enter your email address" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <h3 className={styles.password}>Password</h3>
          <div className={styles.rectangle1}>
            <input className={styles.input1} placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className={styles.loginbuttondiv}>
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <LoginButton type="submit" className={styles.loginbutton} onClick={this.loginClicked}>
              <p className={styles.login}>Log in </p>
            </LoginButton>
          </div>
          <div className={styles.textdiv}>
            <p className={styles.text2}>Don't have an account?</p> 
            <p className={styles.signup} onClick={()=>this.props.setOpen1(true)}> Sign up</p>
          </div>
        </form>
      </div>
    )
  }
}

const LoginButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    borderRadius:44,
    backgroundColor: '#2B64D2',
    '&:hover': {
      backgroundColor: '#003ba0',
    },
  },
}))(Button);

export default SignIn;
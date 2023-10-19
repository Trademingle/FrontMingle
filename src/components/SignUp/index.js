import React, {useState} from 'react';
import styles from './styles.module.css';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import VerifyEmail from "./SignUpFlow/VerifyEmail";
import UserTypePage from "./SignUpFlow/UserTypePage";
import InformationForm from "./SignUpFlow/InformationForm";
import AddImage from "./SignUpFlow/AddImage";
import  ChooseWork from './SignUpFlow/chooseWork'
import ChosenWork from './SignUpFlow/chosenWork'
import  ChooseLanguage from './SignUpFlow/chooseLanguage'
import SignUpMain from './EmailSignup'
import Firebase from '../Firebase/firebase';
import api from '../api/api';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from 'reactjs-popup';
import SignIn from '../Login';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center'
  },
}));
function LoadingView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}
const SignUpPage = (props) => {
  let [stateCode, setStateCode] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const information = {};
  let [informationState, setInformationState] = React.useState(information);
  const backClicked = () => {
    if (stateCode === 0){
      props.setOpen(false)
    }else{
      setStateCode(stateCode-1);
    }
  }
  const redirectToLanding = (val) => {
    if (val['usertype'] === 'Contractor'){
      window.location.href='/contractorexplore'
    }else{
      window.location.href='/homeownerexplore'
    }
  }
  const setToken = () => {
    setLoading(true)
    Firebase.auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      // ...
      informationState['id_token'] = idToken;
      api.signUp(informationState,redirectToLanding, (error)=>{
        // Handle error
        setLoading(false);
        setStateCode(9);
        console.log(error);
      })
    }).catch(function(error) {
      // Handle error
      setLoading(false);
      setStateCode(9);
      console.log(error);
    });
  }
  const closePage = () => {
    if (stateCode > 0){
      Firebase.auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
        const information = {'id_token': idToken}
        api.cancelSignUp(information)
        props.setOpen(false)
      }).catch(function(error) {
        // Handle error
        setStateCode(9);
        console.log(error);
      });
    }else{
      props.setOpen(false)
    }
  }
  const emailClicked = (code) => {
    // if (stateCode == 0){
    // }
    if (stateCode === 7){
      //firebase token retrieval
      setToken();
     
    }else{
      setStateCode(stateCode+1)
    }
  }
  if (loading) {
    return <LoadingView/>;
  }
  const renderSwitch = () => {
    switch (stateCode) {
      case 0:
        return <SignUpMain setOpen={setOpen} onEmailClick={emailClicked} information={informationState}></SignUpMain>
      case 1:
        setStateCode(stateCode+1)
        return
      case 2:
        return <UserTypePage onDecision={emailClicked} information={informationState}></UserTypePage>
      case 3:
        return <InformationForm onDecision={emailClicked} information={informationState}></InformationForm>
      case 4:
        return <AddImage onDecision={emailClicked} information={informationState} ></AddImage>
      case 5:
        if (informationState['usertype'] == 'client'){
          setStateCode(stateCode+1)
          return
        }
        return <ChooseWork onDecision={emailClicked} information={informationState}></ChooseWork>
      case 6:
        return <ChooseLanguage onDecision={emailClicked} information={informationState}></ChooseLanguage>
      case 7:
        return <ChosenWork onDecision={emailClicked} information={informationState}></ChosenWork>
      case 9:
        return <ErrorView />
    }
  }
  const contentStyle3 = {
    width: '702px',
    height: '700px',
    background: '#FFFFFF',
    borderRadius: '16px',
  };
  return(
    <Popup open={props.open} modal contentStyle={contentStyle3}>
      <div className={styles.box}>
        <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles.cross} onClick={closePage}/>
        { stateCode>0
         ? <ArrowBackIcon style={{ height: 40, width: 40 }} className={styles.back} onClick={backClicked}/>
         : null}
        {renderSwitch()}
      </div>
      <SignIn setOpen={setOpen} open={open}/>
    </Popup>
  );
};
 
const ErrorView = (props) => { 
  return(
    <div className={styles.loginContainer}>
      <p className={styles.para}>Oops, there has been an error. But don't worry, we are taking a look into it!</p>
    </div>
  )
}


export default SignUpPage;

import React from 'react';
import styles from './signUpCss/informationForm.module.css';
import { Link } from 'react-router-dom';
// import { compose } from 'recompose';
// import { withFirebase } from '../Firebase';
// import * as ROUTES from '../../constants/routes';
// import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import glogo from './icons/google-icon.svg';
// import elogo from './icons/email1.svg';
// import alogo from '../icons/apple.svg'; 
// import VerifyEmail from "./SignUpFlow/VerifyEmail";
// import UserTypePage from "./SignUpFlow/UserTypePage";
import ContinueButton from "../common/ContinueButton";



// const SignUpPage = ({close}) => {
//   let [stateCode, setStateCode] = React.useState(0);
//   const emailClicked = (code) => {
//     // debugger;
//     setStateCode(stateCode+1)
//   }
//   const renderSwitch = () => {
//     switch (stateCode) {
//       case 0:
//         return <SignUpMain close={close} onEmailClick={emailClicked}></SignUpMain>
//         break;
//       case 1:
//         return <VerifyEmail onEmailClick={emailClicked}></VerifyEmail>
//       case 2:
//         return <UserTypePage onDecision={emailClicked}></UserTypePage>
//     }
//   }
//   return(
//     // <div/>
//       <box className={styles.box}>
//         <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles.cross} onClick={close}/>
//         { stateCode>0
//          ? <ArrowBackIcon style={{ height: 40, width: 40 }} className={styles.back} onClick={close}/>
//          : null}
//         {renderSwitch()}
//       </box>

//     // </div>
//   );
// };
 



const InformationForm = (props) =>{
  const close = props.close;
  const state = {error:''};
  let [signupState, setSignUpState] = React.useState(props.information);
  const handleChange = (event) => { 
    signupState[event.target.name] = event.target.value
    
  }

  const onContinueClick = (event) => {
    props.onDecision();
  }
  return(
    <div className={styles.loginContainer} >
      <h1 className={styles.header}>Add your info</h1>
      <div className={styles.formdiv}>
        {/* <form className="mt-5 py-5 px-5" autoComplete="off" onSubmit={props.onEmailClick}>          */}
          <h3 
          style={{top:'13%'}}
          className={styles.input_header}>
            Name
          </h3>
          <input className={styles.input1} required
            placeholder="First name" name="first_name" type="first_name" 
            onChange={handleChange} value={signupState.first_name} />
          <input className={styles.input2} required
            placeholder="Last name" name="last_name" type="last_name" 
            onChange={handleChange} value={signupState.last_name}/>
          <h3 
            className={styles.input_header}>
              Phone Number
          </h3>
          <input className={styles.input1} style={{borderRadius:'20px'}}
            placeholder="Phone Number" name="phone_number" type="phone_number" 
            onChange={handleChange} value={signupState.phone_number}/>
          {props.information['usertype'] == 'contractor' ?
          (<React.Fragment>
            <h3 className={styles.input_header}>
              Worker's compensation insurance number
            </h3>
            <p className={styles.input_para}>
              This is optional and can be updated later or purchased through our app.
            </p>
            <input className={styles.input1} style={{borderRadius:'20px'}}
              placeholder="insurance no." name="workerNumber" type="workerNumber" 
              onChange={handleChange} value={signupState.workerNumber}/>

            <h3 className={styles.input_header}>
              Liability insurance number
            </h3>
            <p className={styles.input_para}>
              This is optional and can be updated later or purchased through our app.
            </p>
            <input className={styles.input1} style={{borderRadius:'20px'}}
              placeholder="insurance no." name="insuranceNumber" type="insuranceNumber" 
              onChange={handleChange} value={signupState.insuranceNumber}/>
            </React.Fragment>)
            :null}
        {/* </form> */}
      </div>
      <p className={styles.already}>
        By select Agree and Continue, I agree to Booktrade's <span className={styles.login} onClick={close}><Link to="/Signin">Terms and Privacy Policy</Link></span> for home owner's.
      </p>
      
      <div className={styles.loginbuttondiv}>
        {state.error ? <p className="text-danger">{state.error}</p> : null}
        <ContinueButton type="submit" onClick={onContinueClick}>
          <p className={styles.continueWithEmailParagraph}>Continue </p>
        </ContinueButton>
      </div>

      
    </div>
  )
}

// class SignInGoogleBase extends Component {
//   constructor(props) {
//     super(props);
 
//     this.state = { error: null };
//   }
 
//   onSubmit = event => {
//     this.props.firebase
//       .doSignInWithGoogle()
//       .then(socialAuthUser => {
//         return this.props.firebase
//           .user(socialAuthUser.user.uid)
//           .set({
//             username: socialAuthUser.user.displayName,
//             email: socialAuthUser.user.email,
//             roles: {},
//           });
//       })
//       .then(() => {
//         this.setState({ error: null });
//         this.props.history.push(ROUTES.HOME);
//       })
//       .catch(error => {
//         this.setState({ error });
//       });
 
//     event.preventDefault();
//   };
 
//   render() {
//     const { error } = this.state;
 
//     return (
//       <form onSubmit={this.onSubmit}>
//         <button
//           className={styles.google}>
//             <img src={glogo} className={styles.logo} alt={'google'}/>
//               <p ClassName={styles.signupgoogle} >Sign Up with Google</p>
//         </button>
 
//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }
// const SignInGoogle = compose(
//   withRouter,
//   withFirebase,
// )(SignInGoogleBase);

export default InformationForm;
// export {SignInGoogle};

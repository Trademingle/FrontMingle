import React, { Component } from 'react';
import styles from './styles.module.css';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import glogo from './icons/google-icon.svg';
import { withFirebase } from '../Firebase';


class SignInGoogleBase extends Component {
    constructor(props) {
      super(props);
   
      this.state = { error: null };
    }
   
    onSubmit = event => {
      this.props.firebase
        .doSignInWithGoogle()
        .then(socialAuthUser => {
          this.props.onComplete(socialAuthUser);
          // debugger;
          // this.props.history.push(ROUTES.INBOX);
          return this.props.firebase
            .user(socialAuthUser.user.uid)
            .set({
              username: socialAuthUser.user.displayName,
              email: socialAuthUser.user.email,
              roles: {},
            });
        })
        .then(() => {
          // debugger;
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
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
                <p style={{marginTop:'20px'}} >Sign Up with Google</p>
          </button>
   
          {error && <p className={styles.para} style={{color:'red'}}>{error.message}</p>}
        </form>
      );
    }
  }
  const SignInGoogle = compose(
    withRouter,
    withFirebase,
  )(SignInGoogleBase);

  export default SignInGoogle;
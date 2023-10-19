import React, { Component } from 'react';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import styles from './profile.module.css';
// import Spinner from './Spinner';
// import Alert from './Alert';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import swal from 'sweetalert';
import Firebase from '../Firebase/firebase';

export default class FormPasswordReset extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this._handleSubmit = this._handleSubmit.bind(this)
  }
  state = {
    passChangeSuccess: false,
    data:{}
  }
  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }))
  }
  // _renderModal = () => {
  //   const onClick = () => {
  //     this.setState(() => ({ passChangeSuccess: false }))
  //   }
  //   return (
  //     <Alert
  //       isOpen={this.state.passChangeSuccess}
  //       onClose={this.props.close}
  //       handleSubmit={onClick}
  //       title="Password Reset"
  //       text="Your password was changed successfully"
  //       submitButtonText="Done"
  //     />
  //   )
  // }
  _handleSubmit = ({
    currentPass,
    newPass,
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {
    let data={}
    data.oldpassword=currentPass;
    data.password= newPass;
    var user = Firebase.auth.currentUser;
    var credential = Firebase.emailProvider.credential(
      user.email,
      currentPass
    );

    const props = this.props;
    // Prompt the user to re-provide their sign-in credentials
    user.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
      Firebase.auth.currentUser.updatePassword(newPass).then(function() {
        // Update successful.
        swal({
          title: "Updated!",
          text: "Password has been successfully updated!",
          icon: "success",
          button: "OK",
        });
        props.close()
      }).catch(function(error) {
        console.log("Error has happened while updating password");
        swal({
          title: "Password Error!",
          text: error.message,
          icon: "error",
          button: "Try Again",
        });
        // An error happened.
      });
    }).catch(function(error) {
      console.log("Error has happened while reauthenticating");
      swal({
        title: "Current Password Incorrect!",
        text: "Password error! That is not the right password you have right now!",
        icon: "error",
        button: "Try Again",
      });
      // An error happened.
    });

    // Firebase.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(
    //   firebase.auth.EmailAuthProvider.credential(
    //     firebase.auth().currentUser.email, 
    //     providedPassword
    //   )
    // );
   
    // api.changePassword(data).then(res => {
    //   console.log(res);
    //   swal({
    //     title: "Updated!",
    //     text: "Password has been successfully updated!",
    //     icon: "success",
    //     button: "OK",
    //   });
    //   this.props.close()
    // }).catch(err => console.log(err))
  }
  render() {
    return (
      <Formik
        initialValues={{
          currentPass: '',
          newPass: '',
          confirmPass: '',
        }}
        validationSchema={object().shape({
          currentPass: string().required('Current password is required'),
          newPass: string().required('New password is required'),
          confirmPass: string()
            .oneOf([ref('newPass')], 'Passwords do not match')
            .required('Password is required'),
        })}
        onSubmit={(
          { currentPass, newPass, confirmPass },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            currentPass,
            newPass,
            confirmPass,
            setSubmitting,
            resetForm,
          })
        }
        render={props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          } = props
          return (
            <Paper className={styles.passwordForm2} elevation={10}>
              <form className={styles.passwordForm} onSubmit={handleSubmit}>
                <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles.cross} onClick={this.props.close}/>
                <h3>Change password!</h3>
                <FormControl fullWidth margin="dense">
                  <InputLabel
                    htmlFor="password-current"
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {'Current Password'}
                  </InputLabel>
                  <Input
                    id="password-current"
                    name="currentPass"
                    type="password"
                    value={values.currentPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.currentPass && errors.currentPass)}
                  >
                    {touched.currentPass && errors.currentPass
                      ? errors.currentPass
                      : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.newPass && errors.newPass)}
                >
                  <InputLabel
                    htmlFor="password-new"
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {'New Password'}
                  </InputLabel>
                  <Input
                    id="password-new"
                    name="newPass"
                    type="password"
                    value={values.newPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.newPass && errors.newPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.newPass && errors.newPass)}
                  >
                    {touched.newPass && errors.newPass ? errors.newPass : ''}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={Boolean(touched.confirmPass && errors.confirmPass)}
                >
                  <InputLabel
                    htmlFor="password-confirm"
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {'Confirm Password'}
                  </InputLabel>
                  <Input
                    id="password-confirm"
                    name="confirmPass"
                    type="password"
                    value={values.confirmPass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  />
                  <FormHelperText
                    error={Boolean(touched.confirmPass && errors.confirmPass)}
                  >
                    {touched.confirmPass && errors.confirmPass
                      ? errors.confirmPass
                      : ''}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  disabled={Boolean(!isValid || isSubmitting)}
                  style={{ margin: '16px' }}
                >
                  {'Reset Password'}
                </Button>
              </form>
              {/* {this._renderModal()} */}
            </Paper>
          )
        }}
      />
    )
  }
}

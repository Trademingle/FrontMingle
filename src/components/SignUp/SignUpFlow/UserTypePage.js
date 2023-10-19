import React, { Component } from 'react';
import { signup } from '../../Firebase/auth';
import styles from './signUpCss/userTypePage.module.css';

export default class UserTypePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  onButtonClick(event) {
    this.props.information['usertype'] = event.target.id;
    this.props.onDecision()
  }

  render() {
    return (
      <div className={styles.loginContainer}>
        <h1 className={styles.header}>Who are you?</h1>
        <p className={styles.para}>We want to know what you’re looking for so that we can optimize your experience.</p>
        <div className={styles.button_container} > 
          <button id='contractor' className={styles.button} onClick={this.onButtonClick}> Contractor </button>
          <button id='client' className={styles.button} onClick={this.onButtonClick}> Client </button>
        </div>

        {/* <VerificationCodeShit/> */}
      </div>

    )
  }
}


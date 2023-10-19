import React, { Component } from 'react';
import { signup } from '../../Firebase/auth';
import styles from './styles.module.css';

export default class SignUpWithEmail extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div>
        <h1 className={styles.header}>Verify your email</h1>
        <p className={styles.para}>We just sent you an email with a verification code. Enter the code below to continue. If you didnt get an email, check your junk mail or click here to resend.</p>
      </div>
    )
  }
}
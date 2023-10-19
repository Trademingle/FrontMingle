import React from 'react';
import * as emailjs from 'emailjs-com';
import styles from './form.module.css';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import swal from 'sweetalert';

class ContactForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, subject, message } = this.state;
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Front-End Team',
      subject,
      message,
      email,
      name,
      message_html: message,
    };
    emailjs.send(
      'service_0d0oj2o',
      'template_6codloq',
       templateParams,
      'user_3a3QPNPVsbiHVF5tl9CyN'
    )
    this.resetForm();
    swal({
        title: "Message sent!",
        text: "Your message has been sent to developers!",
        icon: "success",
        button: "ok",
      });
  };

  resetForm() {
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, email, subject, message, sentMessage } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.contactform}>
        <h2 style={{textAlign:'center'}}>Report a problem</h2>
        <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles.cross} onClick={this.props.close}/>
        <div className={styles.contactformgroup}>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={this.handleChange}
              className={styles.formInput}
            />
        </div>
        <div className={styles.contactformgroup}>
            <input
              name="email"
              type="email"
              placeholder="Email(optional)"
              value={email}
              onChange={this.handleChange}
              className={styles.formInput}
            />
        </div>
        <div className={styles.contactformgroup}>
            <input
              name="subject"
              type="text"
              placeholder="Subject/Page"
              value={subject}
              onChange={this.handleChange}
              className={styles.formInput}
            />
        </div>
        <div className={styles.contactformgroup}>
            <textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={this.handleChange}
              className={styles.textInput}
            />
        </div>

        <div kind="group">
            <button className={styles.submitButton}>Send</button>
            <button onClick={this.props.close} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default ContactForm;
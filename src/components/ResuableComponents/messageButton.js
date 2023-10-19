import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles} from '@material-ui/core/styles';
import Send from '@material-ui/icons/SendSharp';
import { useHistory } from 'react-router-dom';
import styles from '../Landing/landing.module.css'; 
import swal from 'sweetalert';
import SignUpPage from '../SignUp';
import SignIn from '../Login';

const MessageButtonStyle = withStyles((theme) => ({
  root: {
    borderRadius:44,
    backgroundColor: '#2B64D2',
    '&:hover': {
      backgroundColor: '#003ba0',
    },
    cursor:'pointer',
    color: 'white',
    height:'37px',
    width:'120px',
  },
}))(Button);

const MessageButton=(props)=>{
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    history.push({
      pathname:'/InboxPage',
      state: {receiverName:props.name, receiverId:props.contractorId, from: 'ContractorExplore'}
    })
  }
  const handleOnClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    swal({
      title: "You are not signed in!",
      text: "Please log in or sign up as Client to use this feature!",
      icon: "info",
      buttons: {
        cancel: "Cancel",
        login: {
          text: "Log in",
          value: "login",
        },
        signup: {
          text: "Sign up",
          value: "signup",
        },
      },
    })
    .then((value) => {
      switch (value) {
        case "login":
          setOpen(true);
          break;
        case "signup":
          setOpen1(true);
          break;
        default:
          swal.close()
        }});
  }
  if (localStorage.getItem('usertype') === 'Client' || localStorage.getItem('usertype') === 'Contractor'){
      return(
      <MessageButtonStyle onClick={handleClick}>
          <Send style={{color:"white", fontSize:15, transform: "translateY(50%) rotate(-45deg)",marginRight:4, marginBottom:'18px'}} />
          <p className={styles.messagetext}> Message</p>
      </MessageButtonStyle>
      )}
  else{    
      return(        
        <div>
          <MessageButtonStyle onClick={(event)=>handleOnClick(event)}>
            <Send style={{color:"white", fontSize:16, transform: "translateY(50%) rotate(-45deg)",marginRight:4, marginBottom:'20px'}} />
            <p className={styles.messagetext}> Message</p>
          </MessageButtonStyle>
          <SignIn setOpen={setOpen} open={open}/>
          <SignUpPage setOpen={setOpen1} open={open1}/>
        </div>
      )
  }
}
export default MessageButton;
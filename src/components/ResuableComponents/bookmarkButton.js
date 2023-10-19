import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import swal from 'sweetalert';
import SignUpPage from '../SignUp';
import SignIn from '../Login';
import api from '../api/api';
import IconButton from '@material-ui/core/IconButton';

const BookmarkButton=(props)=>{
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
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
    };
    const [buttonClicked, setButtonClicked] = React.useState(false);
    let profileId={};
    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let tempJobs= localStorage.getItem('savedJobList')
      let tempSavedJobs=[]
      if(tempJobs===""){
        tempSavedJobs=[]
      }
      else{
        tempSavedJobs= localStorage.getItem('savedJobList').split(`,`).map(x=>+x)
      }
      const indexx = tempSavedJobs.indexOf(props.id);
      if (tempSavedJobs.includes(props.id)){
        tempSavedJobs.splice(indexx,1)
      }
      else {
        tempSavedJobs.push(props.id)
      }
      localStorage.setItem('savedJobList', tempSavedJobs)
      profileId['savedJobList']= tempSavedJobs
      api.editProfileForBookmark(profileId).then(res => {
        console.log(res);
        }).catch(err => console.log(err))
      setButtonClicked(!buttonClicked)
    }

    const ButtonIcon=()=>{
      if (localStorage.getItem('savedJobList').includes(props.id)){
        return(
          <BookmarkIcon style={{color:"#2B64D2", fontSize:36, marginTop:'-15'}}/>
        )
      }
      else {
        return(
          <BookmarkBorderIcon style={{color:"#555555", fontSize:36, marginTop:'-15'}}/>)
      }
    }
    const ButtonIcon2=()=>{
      if (localStorage.getItem('savedJobList').includes(props.id)){
        return(
          <BookmarkIcon style={{fontSize:32, position: 'relative', color: '#22C029', cursor: 'pointer'}} onClick={(e)=>handleSubmit(e)}/>
        )
      }
      else {
        return(
          <BookmarkBorderIcon style={{fontSize:32, position: 'relative', color: '#22C029', cursor: 'pointer'}} onClick={(e)=>handleSubmit(e)}/>)
      }
    }

    if (localStorage.getItem('usertype') === 'Client'){
      return( null )}
    else if (localStorage.getItem('usertype') === 'Contractor'){  
      if(props.iconButton === false){
        return(<ButtonIcon2/>)
      } 
      else{ 
        return(                     
          <IconButton onClick={(e)=>handleSubmit(e)}>
            <ButtonIcon/>
          </IconButton>  
        )
      }
    }
    else{
      return(
      <div>
          <BookmarkBorderIcon style={{cursor:"pointer", color:'grey'}} onClick={(event)=>handleOnClick(event)}/>
          <SignIn setOpen={setOpen} open={open}/>
          <SignUpPage setOpen={setOpen1} open={open1}/>
      </div>
      )
    }
}

export default BookmarkButton;
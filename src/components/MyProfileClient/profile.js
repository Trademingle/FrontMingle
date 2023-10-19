import React from 'react';
import styles from '../ProfileViewClient/profile.module.css';
import Popup from "reactjs-popup";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from '../api/api';
import Hook from "../MyProfile/searchHooks";
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import FormPasswordReset from '../MyProfile/passwordForm';
import styles2 from '../MyProfile/profile.module.css';
import { useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ProfileFormat (props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    return(
        <div className={styles.profileBoxInside}>
            <ArrowBackIcon  style={{height:25, cursor:"pointer", position:'absolute', zIndex:'2'}} onClick={handleOnClick}/>
            <h1 className={styles.header}>{props.name}</h1>
            <img src={props.avatar} className={styles.circle} style={{height:150,width:150}} alt=""/>
            <Popup trigger={<button className={styles.editbutton}> Edit Profile</button>} modal contentStyle={contentStyle2} >
                {close => <EditProfile props={props} close={close} onChange={props.onChange}/>}
            </Popup>
        </div>
    )
};

function EditProfile(props){
    let [clientId, setClientId]=React.useState({})
    let [imageSrc, setImageSrc] = React.useState(props.props.avatar);
    let image;
    const handleSubmit = () => {
        console.log(clientId)
        const jobCallback= ()=>{
            {props.onChange()}
            swal({
                title: "Updated!",
                text: "Profile has been successfully updated!",
                icon: "success",
                button: "OK",
            });
            {props.close()}
            window.location.reload(false);
          }
        api.patchEditProfile(clientId, jobCallback)
    }
    const handlePicChange = (event) => {
        if (event.type === "change"){
            image = event.target.files[0];
            clientId['image'] = image
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
    }
    const Password=()=>{
        return(
            <FormPasswordReset />
        )
    }
    const keyPressed = (event) => {
        if (event.target.id === 'firstName' && event.target.value !== clientId.firstName){
            clientId.firstName = event.target.value;
        }
        if (event.target.id === 'lastName' && event.target.value !== clientId.lastName){
            clientId.lastName = event.target.value;
        }
        if (event.target.id === 'password' && event.target.value !== clientId.password){
            clientId.password = event.target.value;
        }
        if (event.target.id === 'rePassword' && event.target.value !== clientId.rePassword){
            clientId.rePassword = event.target.value;
        }
    }
    return(
        <box className={styles2.box}>
            <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles2.cross} onClick={props.close}/>
            <h1 className={styles2.editProfile}>Edit Profile</h1> 
            <div className={styles2.circle3} style={{height:150,width:150}} onClick={handlePicChange}>
                <img src={imageSrc} className={styles2.circle2} style={{height:150,width:150}}/>
                <p className={styles2.circle3text}>Change Profile Picture</p>
                <input className={styles2.profile_pic_input} type="file" onChange={handlePicChange}  accept="image/*" ></input>
            </div>

            <form className={styles2.editfName} noValidate autoComplete="off">
                <p>Basic Info:</p>
                <TextField id="firstName" label="First Name" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.firstName}/>
                <TextField id="lastName" label="Last Name" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.lastName}/>
            </form>
            <form className={styles2.editfName} noValidate autoComplete="off">
                <p>Change Password:</p>
                <Popup trigger={<FormButton>Click here to update your password</FormButton>} modal contentStyle={contentStyle3} >
                    {close =><FormPasswordReset close={close}/>}
                </Popup>
            </form>
            <div  className={styles2.editfName}>
                <p>Languages:</p>
                <Hook information={clientId} type='languageList' selected={props.props.languages}/> 
            </div>
            <div className={styles2.buttons}>
                <BackButton className={styles2.back} onClick={props.close}> 
                    Cancel
                </BackButton>
                <CompleteButton className={styles2.complete} onClick={handleSubmit} > 
                    <p className={styles2.completeText}>Save</p>
                </CompleteButton>
            </div>
        </box>
    )
};

const contentStyle2 = {
    width: '702px',
    height: 'auto',
    background: '#fffFFF',
    borderRadius: '16px', 
};
const contentStyle3 = {
    width: '700px',
    height: 'auto',
    background: '#fffFFF',
    borderRadius: '16px', 
};
const CompleteButton = withStyles((theme) => ({
    root: {
        borderRadius:44,
        backgroundColor: '#2B64D2',
        '&:hover': {
        backgroundColor: '#003ba0',
        },
        marginLeft: 30,
    },
}))(Button);
  
const BackButton = withStyles((theme) => ({
    root: {
      borderRadius:44,
      backgroundColor: 'white',
      border: '1px dotted',
      '&:hover': {
        border: "2px solid #2B64D2",
      },
      marginLeft: 80, 
    },
}))(Button);

const FormButton = withStyles((theme) => ({
    root: {
        width:"400px",
        height:"40px",
        textAlign: "center",
        marginRight: "80px",
        marginTop: "7px",
        backgroundColor:"white",
        border:"1px solid #2B64D2",
        cursor: "pointer",
        borderRadius: "5px",
        '&:hover': {
        backgroundColor: "#2B64D2",
        color:"white",
      },
    },
}))(Button);

export default ProfileFormat;
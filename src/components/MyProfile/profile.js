import React from 'react';
import styles from './profile.module.css';
import StarIcon from '@material-ui/icons/Star'; 
import Popup from "reactjs-popup";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from '../api/api';
import Hook from "./searchHooks";
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import FormPasswordReset from './passwordForm';
import ProgressBar from 'react-customizable-progressbar'
import { useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



function Profile (props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    return(
        <div >
            <h1 className={styles.header}><ArrowBackIcon  style={{height:25, width:50, cursor:"pointer"}} onClick={handleOnClick}/>{props.firstName} {props.lastName}</h1>
            {localStorage.getItem('usertype') === 'Contractor' 
            ?<div>
                <img src={props.avatar} className={styles.circle} style={{height:80,width:80}} alt=""/>
                <p className={styles.jobsdone}>{props.jobsdone}</p>
                <p className={styles.rating}><StarIcon className={styles.Vector}/>{props.rating}</p>
                <p className={styles.jobsdone2}>Jobs done</p>
                <p className={styles.rating2}>Rating</p>
            </div>
            :<img src={props.avatar} className={styles.circle} style={{height:130,width:130}} alt=""/>
            }
            <Popup trigger={<button className={styles.editbutton}> Edit Profile</button>} modal contentStyle={contentStyle2} >
                {close => <EditProfile props={props} close={close} onChange={props.onChange}/>}
            </Popup>
            <p className={styles.downloadAppText}>Please download our app from here or browse from desktop to edit your profile and for better experience.</p>
        </div>
    )
};

function EditProfile(props){
    let [clientId, setClientId]=React.useState({})
    let [imageSrc, setImageSrc] = React.useState(props.props.avatar);
    let [videoSrc, setVideoSrc] = React.useState(null);
    let [progressOn, setProgressOn] = React.useState(false);
    let [progressVal, setProgressVal] = React.useState(0);
    let image;
    let video;
    let progressClose;

    const handleSubmit = () => {
        console.log(clientId)
        const jobCallback= (data)=>{
            if (data.type === 'SUCCESS'){
                {props.onChange()}
                swal({
                    title: "Updated!",
                    text: "Profile has been successfully updated!",
                    icon: "success",
                    button: "OK",
                });
                {props.close()}
                // window.location.reload(false);
            }else if (data.type === 'PROGRESS'){
                console.log("PROGRESS: " + data.value)
                setProgressOn(true);
                setProgressVal(100*data.value);
            }
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
    const handleVidChange = (event) => {
        console.log('VIDEO')
        if (event.type === "change"){
            video = event.target.files[0];
            clientId['video'] = video
            setVideoSrc(video);
        }
    }
    const Skillss= () =>{
        if(localStorage.getItem("usertype") === "Contractor"){
            return(
                <div className={styles.editName}>
                    <form className={styles.editfName} noValidate autoComplete="off">
                        <p>Other info:</p>
                        <TextField id="insuranceNumber" label="Insurance Number" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.insuranceNumber}/>
                        <TextField id="workerNumber" label="Worker Number" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.workerNumber}/>
                    </form>
                    <div  className={styles.editfName}>
                        <p>Skills:</p>
                        <Hook information={clientId} type='serviceTypeList' selected={props.props.services}/> 
                    </div>
                </div>
            )
        }
        else{
            return(null)
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
        if (event.target.id === 'insuranceNumber' && event.target.value !== clientId.insuranceNumber){
            clientId.insuranceNumber = event.target.value;
        }
        if (event.target.id === 'workerNumber' && event.target.value !== clientId.workerNumber){
            clientId.workerNumber = event.target.value;
        }
        if (event.target.id === 'password' && event.target.value !== clientId.password){
            clientId.password = event.target.value;
        }
        if (event.target.id === 'rePassword' && event.target.value !== clientId.rePassword){
            clientId.rePassword = event.target.value;
        }
    }
    return(
        <box className={styles.box}>
            <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={styles.cross} onClick={props.close}/>
            <h1 className={styles.editProfile}>Edit Profile</h1> 
            <div className={styles.circle3} style={{height:150,width:150}} >
                <img src={imageSrc} className={styles.circle2} style={{height:150,width:150}}/>
                <p className={styles.circle3text}>Change Profile Picture</p>
                <input className={styles.profile_pic_input} type="file" onChange={handlePicChange}  accept="image/*" ></input>
            </div>

            { videoSrc == null ?
            <UploadVideoButton style={{alignSelf: "center"}}>
                <p style={{position:"absolute"}}>Click here to upload a new video</p>
                <input  className={styles.video_upload_input} type="file" onChange={handleVidChange}  accept="video/*" />
            </UploadVideoButton>
            : <p style={{order:2, alignSelf: "center"}} >Video: {videoSrc.name} </p>
            }
            <form className={styles.editfName} noValidate autoComplete="off">
                <p>Basic Info:</p>
                <TextField id="firstName" label="First Name" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.firstName}/>
                <TextField id="lastName" label="Last Name" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.lastName}/>
            </form>
            <form className={styles.editfName} noValidate autoComplete="off">
                <p>Change Password:</p>
                <Popup trigger={<FormButton>Click here to update your password</FormButton>} modal contentStyle={contentStyle3} >
                    {close =><FormPasswordReset close={close}/>}
                </Popup>
            </form>
            <Skillss/>
            <div  className={styles.editfName}>
                <p>Languages:</p>
                <Hook information={clientId} type='languageList' selected={props.props.languages}/> 
            </div>
            <div className={styles.buttons}>
                <BackButton className={styles.back} onClick={props.close}> 
                    Cancel
                </BackButton>
                <CompleteButton className={styles.complete} onClick={handleSubmit} > 
                    <p className={styles.completeText}>Save</p>
                </CompleteButton>
            </div>
            <Popup contentStyle={{width:"inherit", borderRadius:'50%' }} open={progressOn} modal closeOnDocumentClick={false} >
                {close => {
                    return(
                        <ProgressBar
                            radius={100}
                            progress={progressVal}
                            strokeWidth={18}
                            strokeColor="#5d9cec"
                            strokeLinecap="square"
                            trackStrokeWidth={18}
                        >
                            <div className={styles.indicator}>
                                <div>{Math.round(progressVal)}%</div>
                            </div>
                        </ProgressBar>
                    )
                }}
            </Popup>
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

const UploadVideoButton = withStyles((theme) => ({
    root: {
        width:"400px",
        height:"40px",
        textAlign: "center",
        order:2,
        // marginRight: "80px",
        marginTop: "7px",
        marginBottom: "7px",
        padding: 0,
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
export default Profile;
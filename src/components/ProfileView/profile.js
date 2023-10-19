import React, { useEffect, useState} from 'react';
import api from '../api/api';
import styles from '../MyProfile/profile.module.css';
import StarIcon from '@material-ui/icons/Star'; 
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';
import MessageButton from '../ResuableComponents/messageButton';
import { useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 160,
      maxWidth:160,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    buttonForm:{
        position:'absolute',
        margin: '20px 180px',
        cursor:'pointer',
        borderRadius:'2px',
        border: '1px solid #2b64d2',
        '&:hover': {
            background: "#2b64d2",
            color: 'white',
        },
    },

  }));
function ProfileFormat (props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    const classes = useStyles();
    const [jobsId, setjobsId] = React.useState('');
    //for the assign form
    const handleChange = (event) => {
        setjobsId(event.target.value);
    };
    console.log(jobsId)
    //sending job id to backend
    var data={}
    const handleOnSubmit = (event) =>{
        data.contractorId= props.id
        data.id= jobsId
        api.assignUnassignedJobs(data).then(res => {
            swal({
                title: "Assigned!",
                text: "Job has been assigned, please wait for contractor to accept!",
                icon: "success",
                button: "OK",
              });
        }).catch(err => console.log(err))
    }

    //getting the unassigned jobs list
    let userId=[]
    const [unassignedJobs, setAllUnassignedJobs] = useState({});
    const getAllUnassignedJobs = () => {
        api.getAllUnassignedJobs(userId).then(res => {
            console.log(res)
            setAllUnassignedJobs(res.data);
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        getAllUnassignedJobs();
    },[]);
    const renderUnassignedJobs = () => {
        let i = 0;
        let unassignedJobCount = unassignedJobs.length;
        let tempJobs = [];
        while (i < unassignedJobCount) {
            let unassignedJob = unassignedJobs[i]
            let jobTitle = unassignedJob.title
            let jobId = unassignedJob.id
            tempJobs.push(
                <MenuItem value={jobId}>{jobTitle}</MenuItem>
            );

            i += 1;
        }
        return tempJobs;
    };
    //
    return(
        <div>
            <h1 className={styles.header}><ArrowBackIcon style={{height:25, width:50, cursor:"pointer"}} onClick={handleOnClick}/>{props.name}</h1>
            <div style={{height:180}}>
                <img src={props.avatar} className={styles.circle} style={{height:100,width:100}}/>
                <p className={styles.jobsdone}>{props.jobsdone}</p>
                <p className={styles.rating}><StarIcon className={styles.Vector}/>{props.rating}</p>
                <p className={styles.jobsdone2}>Jobs done</p>
                <p className={styles.rating2}>Rating</p>
            </div>
            <div style={{ height:80}}>
                {localStorage.getItem('usertype') === 'Client' && localStorage.getItem('access-token')?
                <FormControl className={classes.formControl}>
                    <InputLabel id="inputLabel">Select Job</InputLabel>
                    <Select
                        labelId="selectLabel"
                        id="assignForm"
                        value={jobsId}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {renderUnassignedJobs()}
                        {/* <MenuItem value={10}>Ten</MenuItem>*/}
                    </Select>
                    <FormHelperText>Assign Job to this Contractor</FormHelperText>
                    <button onClick={handleOnSubmit} className={classes.buttonForm} style={{height:30, width:120}}>Assign</button>
                </FormControl>
                :null}
            </div>
            <div className={styles.message}><MessageButton name={props.name} contractorId={props.id}/></div>
        </div>
    )
};

// function AssignForm() {

//     return(

//     )
// }
// console.log(AssignForm)

export default ProfileFormat;
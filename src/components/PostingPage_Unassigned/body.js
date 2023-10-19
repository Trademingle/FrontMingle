import React, { useEffect, useState } from 'react';
import styles from '../PostingPage/posting.module.css'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import { makeStyles , useTheme} from '@material-ui/core/styles';
import api from '../api/api';
import { useHistory} from 'react-router-dom';
import ImageViewer from '../ImageViewer';
import SimpleMenu from './dropDown';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import swal from 'sweetalert';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

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

export default function  ClientReview(props) {
    const classes = useStyles();
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    //code to implement assign job in posting page
    const [jobsId, setjobsId] = React.useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        setjobsId(event.target.value);
    };
    var data={}
    const handleOnSubmit = (event) =>{
        data.contractorId= jobsId
        data.id= props.id
        api.assignUnassignedJobs(data).then(res => {
            swal({
                title: "Assigned!",
                text: "Job has been assigned, please wait for contractor to accept!",
                icon: "success",
                button: "OK",
              });
        }).catch(err => console.log(err))
    }
    const [unassignedJob, setUnassignedJob] = useState({downloadurl:[],serviceTypeList:[],languageList:[]});
    var contractorID= {};
    contractorID["id"] = props.id;

    const getUnassignedJob = () => {
        api.unassignedJob(contractorID).then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setUnassignedJob(res.data); 
            setLoading(false);
        }).catch(err => {console.log(err); setLoading(false); setOpen(true)})
    }

    useEffect(() => {
        getUnassignedJob();
      },[]);

    const ts = moment(unassignedJob.datePosted);
    let timeVal;
    if (moment().diff(ts, 'minutes')<60){
        timeVal = String(moment().diff(ts, 'minutes')) + 'm' 
    }else if(moment().diff(ts, 'hours')<24){
        timeVal = String(moment().diff(ts, 'hours')) + 'h' 
    }else if(moment().diff(ts, 'days')<24){
        timeVal = String(moment().diff(ts, 'days')) + 'd' 
    }else{
        timeVal = String(moment().diff(ts, 'weeks')) + 'w' 
    }
    //getting the recently contacted contractors list
    const [contractorList, setContractorList] = useState({});
    const getContractorList = () => {
        api.getChats().then(res => {
            console.log("Chats loaded successfully");
            console.log(res);
            setContractorList(res.data);
          }).catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        getContractorList();
    },[]);
    const rendercontractorList = () => {
        let i = 0;
        let contractorListCount = contractorList.length;
        let tempJobs = [];
        while (i < contractorListCount) {
            let contractor = contractorList[i]
            let name = contractor.firstName + ' ' + contractor.lastName
            let contractorId = contractor.id
            tempJobs.push(
                <MenuItem value={contractorId}>{name}</MenuItem>
            );

            i += 1;
        }
        return tempJobs;
    };
    //
    const renderTitle = () => {
        let jobTitle = unassignedJob.title
        let name = unassignedJob.clientFirstName
        let jobDetails = unassignedJob.jobDetails
        let locationDetail = unassignedJob.locationDetail
        let imagesList = unassignedJob.downloadurl
        return(
            <div>
                <div className={styles.headerDiv}>
                    <ArrowBackIcon  style={{height:25, cursor:"pointer"}} onClick={handleOnClick}/>
                    <h1 className={styles.header1}> {jobTitle} </h1>
                    <SimpleMenu 
                        id={props.id} 
                        jobDetails={jobDetails} 
                        languages={unassignedJob.languageList} 
                        services={unassignedJob.serviceTypeList}
                        jobTitle={jobTitle}
                        location={locationDetail}
                        className={styles.simpleMenu}
                    />
                </div>
                <box className={styles.frame}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.location}><span>&#8226;</span> {locationDetail}</p>
                </box> 
                <box className={styles.frame}>
                    <p className={styles.location}>Posted {timeVal} ago</p>
                </box> 
                <div className={styles.row}>
                    <ImageViewer imagesList={imagesList}/>
                </div> 
                <div className={styles.paragraph}>
                    {/* <form>
                        <label for="SubmitContractorId">Assign Job to:</label>
                        <input id= "SubmitContractorId" placeholder="Enter Contractor ID" defaultValue={userId.contractorId} onKeyUp={keyPressed} />
                        <button style={{width:60,height:20}} onClick={handleOnSubmit}>Assign</button>
                    </form> */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="inputLabel">Select Contractor</InputLabel>
                        <Select
                            labelId="selectLabel"
                            id="assignForm"
                            value={jobsId}
                            onChange={handleChange}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {rendercontractorList()}
                        </Select>
                        <FormHelperText>Assign Job to a Contractor</FormHelperText>
                        <button onClick={handleOnSubmit} className={classes.buttonForm} style={{height:30, width:120}}>Assign</button>
                    </FormControl>
                    <hr className={styles.hr1}/>  

                    <h2 className={styles.header2}>About the job</h2>
                    <p className={styles.about}>{jobDetails}</p>
                    <hr className={styles.hr2}/>  
                </div> 
            </div>
        )};
    function Tags(props) {
        if (!props.tagname) return null;
        return (
            <box className={styles2.tag}>
                <p className={styles2.tagfont}>{props.tagname}</p>
            </box>
        )
    };
    const renderSTags = () => {
        let i = 0;
        let services = unassignedJob.serviceTypeList;
        let tagsCount = services.length;
        let tempTags = [];
        while (i < tagsCount) {
            tempTags.push(<Tags className={styles2.tag} tagname={services[i]} />);
            i += 1;
        };
        return tempTags;
    };
    const renderLTags = () => {
        let i = 0;
        let lang = unassignedJob.languageList;
        for(var j = 0 ; j < lang.length ; j++){
            let temp= lang[j].toLowerCase()
            lang[j] = temp.charAt(0).toUpperCase() + temp.substr(1);
        }
        let tagsCount = lang.length;
        let tempTags = [];
        while (i < tagsCount) {
            tempTags.push(<Tags className={styles2.tag} tagname={lang[i]} />);
            i += 1;
        };
        return tempTags;
    };
    if (loading) {
        return <LoadingView/>;
        }
    return (   
        <div className={styles.posting}>
            <box className={styles.postingbox}>
                {renderTitle()}
                <div className={styles.skillsbox}>
                    <h1 className={styles.header2}>Required Skills</h1>
                    <box className={styles2.servicetagbox}>
                        {renderSTags()}
                    </box>        
                    <h1 className={styles.header2}>Required Languages</h1>
                    <box className={styles2.servicetagbox}>
                        {renderLTags()}
                    </box> 
                </div>
            </box>
            <NotFound setOpen={setOpen} open={open}/>

        </div>
    );
}
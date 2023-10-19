import React, { useEffect, useState } from 'react';
import styles from '../PostingPage/posting.module.css'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory} from 'react-router-dom';
// import { makeStyles , useTheme} from '@material-ui/core/styles';
import api from '../api/api';
import ImageViewer from '../ImageViewer';
import swal from 'sweetalert';
import SimpleMenu from './dropDown';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import moment from 'moment';
import MessageButton from '../ResuableComponents/messageButton';
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

export default function  ActiveBody(props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }

    const [singleActiveJob, setSingleActiveJob] = useState({downloadurl:[],serviceTypeList:[],languageList:[]});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    var jobId= {};
    // debugger
    jobId["id"] = props.id;
    const getSingleActiveJob = () => {
        api.getSingleActiveJob(jobId).then(res => {
            // debugger
            console.log("Job loaded successfully");
            console.log(res);
            setSingleActiveJob(res.data); 
            setLoading(false);
        }).catch(err => {console.log(err); setLoading(false); setOpen(true)})
        }
    useEffect(() => {
        setLoading(true);
        getSingleActiveJob();
      },[]);
      let jobDetails = singleActiveJob.jobDetails
      let imagesList = singleActiveJob.downloadurl
      const handleLink = (event) =>{
        event.preventDefault();
        if (localStorage.getItem('usertype') === 'Contractor'){
            history.push({
                pathname: '/ClientProfile/' + singleActiveJob.clientId.toString(),
                });
            }
            else{
            history.push({
                pathname: '/profile/' + singleActiveJob.contractorId.toString(),
                })};
        }
        const ts = moment(singleActiveJob.dateAccepted);
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
      const renderTitle = () => {
            let jobTitle = singleActiveJob.title
            let locationDetail = singleActiveJob.locationDetail
            let name = ""
            let userID=""
            if (localStorage.getItem('usertype') == 'Contractor'){
                name = singleActiveJob.clientFirstName + " " + singleActiveJob.clientLastName
                userID=singleActiveJob.clientId
              }
              else{
                name = singleActiveJob.contractorFirstName + " " + singleActiveJob.contractorLastName
                userID=singleActiveJob.contractorId
              }
            return(
                <div>
                    <div className={styles.headerDiv}>
                        <ArrowBackIcon  style={{height:25, cursor:"pointer"}} onClick={handleOnClick}/>
                        <h1 className={styles.header1}> {jobTitle} </h1>
                        <SimpleMenu id={props.id} contractorId={userID} name={name}/>
                    </div>
                    <box className={styles.frame}>
                        <p className={styles.name} onClick={handleLink}>{name}</p>
                        <p className={styles.location}><span>&#8226;</span> {locationDetail}</p>
                    </box> 
                    <box className={styles.frame}>
                        <p className={styles.location}>Accepted {timeVal} ago</p>
                    </box>
                </div>
            )
          };
        //returns the length of the array and item inside them
    var userId={}
    const handleOnSubmit = (event) =>{
        userId.id= props.id
        api.editJob(userId).then(res => {
            swal({
                title: "Unassigned!",
                text: "Job has been unassigned!",
                icon: "success",
                button: "OK",
              });
        }).catch(err => console.log(err))
    }
    function Tags(props) {
        if (!props.tagname) return null;
        return (
            <box className={styles2.tag}>
                <p className={styles2.tagfont}>{props.tagname}</p>
            </box>
        )
    };
    const renderTags = () => {
        let i = 0;
        let services = singleActiveJob.serviceTypeList;
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
        let lang = singleActiveJob.languageList;
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
                <div className={styles.row}>
                    <ImageViewer imagesList={imagesList}/>
                </div>
                {localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor' 
                ?<div className={styles.message}><MessageButton name={singleActiveJob.clientFirstName} contractorId={singleActiveJob.clientId}/></div>
                : localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Client'
                ?<div className={styles.message}><MessageButton name={singleActiveJob.contractorFirstName} contractorId={singleActiveJob.contractorId}/></div>
                :null
                }
                <div className={styles.paragraph}>
                    <hr className={styles.hr1}/>  
                    <h2 className={styles.header2}>About the job</h2>
                    <p className={styles.about}>{jobDetails}</p>
                    <hr className={styles.hr2}/>
                    <div className={styles.skillsbox}>
                        <h1 className={styles.header2}>Required Skills</h1>
                        <box className={styles2.servicetagbox}>
                            {renderTags()}
                        </box>     
                        <h1 className={styles.header2}>Required Languages</h1>
                        <box className={styles2.servicetagbox}>
                            {renderLTags()}
                        </box>    
                    </div>
                </div> 
            </box>
            <NotFound setOpen={setOpen} open={open}/>
        </div>
    );
}
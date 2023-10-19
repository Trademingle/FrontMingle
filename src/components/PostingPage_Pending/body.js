import React, { useEffect, useState } from 'react';
import styles from '../PostingPage/posting.module.css'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from '../api/api';
import { useHistory} from 'react-router-dom';
import ImageViewer from '../ImageViewer';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import AcceptButton from '../ResuableComponents/acceptButton';
import DeclineButton from '../ResuableComponents/declineButton';
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

//function for review pages
export default function  ClientReview(props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    const [unassignedJob, setUnassignedJob] = useState({downloadurl:[],serviceTypeList:[],languageList:[]});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        getUnassignedJob();
      },[]);

    const renderTitle = () => {
        let unassignedJob1 = unassignedJob
        let jobTitle = unassignedJob1.title
        let name = unassignedJob1.clientFirstName
        let jobDetails = unassignedJob1.jobDetails
        let locationDetail = unassignedJob1.locationDetail
        let imagesList = unassignedJob1.downloadurl
        return(
            <div>
                <div className={styles.headerDiv}>
                    <ArrowBackIcon  style={{height:25, cursor:"pointer"}} onClick={handleOnClick}/>
                    <h1 className={styles.header1}> {jobTitle} </h1>
                </div>
                <box className={styles.frame}>
                    <p className={styles.name}>{name}</p>
                        <p className={styles.location}><span>&#8226;</span> {locationDetail}</p>
                </box> 
                <div className={styles.row}>
                    <ImageViewer imagesList={imagesList}/>
                </div> 
                <div className={styles.paragraph}>
                    <box className={styles.adbox}>  
                        <DeclineButton id={props.id} style={{height:'30px', width:'80px'}} />
                        <AcceptButton id={props.id} style={{height:'30px', width:'100px'}}/>
                    </box>
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
    const renderTags = () => {
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
                        {renderTags()}
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
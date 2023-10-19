import React, { useEffect, useState } from 'react';
import styles from './posting.module.css'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from '../api/api';
import { useHistory} from 'react-router-dom';
import ImageViewer from '../ImageViewer';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import moment from 'moment';
import MessageButton from '../ResuableComponents/messageButton';
import BookmarkButton from '../ResuableComponents/bookmarkButton';
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

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
        }).catch(err => {console.log(err);setLoading(false); setOpen(true)})
    }

    useEffect(() => {
        setLoading(true);
        getUnassignedJob();
    },[]);
    const handleLink = (event) =>{
        event.preventDefault();
        if (localStorage.getItem('usertype') === 'Contractor'){
            history.push({
                pathname: '/ClientProfile/' + unassignedJob.clientId.toString(),
                });
            }
            else{
            history.push({
                pathname: '/profile/' + unassignedJob.contractorId.toString(),
                })};
        }
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
                    <BookmarkButton id={unassignedJob.id}/>                   
                </div>
                <box className={styles.frame}>
                    <p className={styles.name} onClick={handleLink}>{name}</p>
                    <p className={styles.location}><span>&#8226;</span> {locationDetail}</p>
                </box> 
                <box className={styles.frame}>
                    <p className={styles.location}>Posted {timeVal} ago</p>
                </box>
                <div className={styles.row}>
                    <ImageViewer imagesList={imagesList}/>
                </div> 
                <div className={styles.message}><MessageButton name={unassignedJob.clientFirstName} contractorId={unassignedJob.clientId}/></div>
                <div className={styles.paragraph}>
                    <hr className={styles.hr1}/>  
                    <h2 className={styles.header2}>About the job</h2>
                    <p className={styles.about}>{jobDetails}</p>
                    <hr className={styles.hr2}/>
                </div> 
            </div>
            )
        };
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
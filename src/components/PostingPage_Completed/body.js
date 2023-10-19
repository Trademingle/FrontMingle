import React, { useEffect, useState } from 'react';
import styles from '../PostingPage/posting.module.css'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory} from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import api from '../api/api';
import Button from '@material-ui/core/Button';
import Popup from "reactjs-popup";
import Review from "../Review";
import ImageViewer from '../ImageViewer';
import SimpleMenu from './dropDown';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import swal from 'sweetalert';
import { Grid } from '@material-ui/core';
import ReviewCard from '../ProfileView/reviews';
import moment from 'moment';
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

const CompleteButton = withStyles((theme) => ({
  root: {
    borderRadius:44,
    backgroundColor: '#eeeeee',
    border: '1px solid #2B64D2',
    height:'50px',
    fontSize: '15px',
    fontWeight:'550',
    width:'100%',
    maxWidth:'413px',
    minWidth:'200px',
    '&:hover': {
      backgroundColor: '#2B64D2',
      color:'white',
    },
    marginLeft: 0,
  },
}))(Button);

export default function  ActiveBody(props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    const [singleCompletedJob, setSingleCompletedJob] = useState({downloadurl:[],serviceTypeList:[],languageList:[]});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    var jobId= {};
    jobId['id'] = props.id;
    const getSingleCompletedJob = () => {
        api.getSingleCompletedJob(jobId).then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setSingleCompletedJob(res.data);
            setLoading(false); 
        }).catch(err => {console.log(err); setLoading(false); setOpen(true)})
        }

    let jobTitle = singleCompletedJob.title
    let jobDetails = singleCompletedJob.jobDetails
    let locationDetail = singleCompletedJob.locationDetail
    let imagesList = singleCompletedJob.downloadurl
    const handleLink = (event) =>{
        event.preventDefault();
        if (localStorage.getItem('usertype') === 'Contractor'){
            history.push({
                pathname: '/ClientProfile/' + singleCompletedJob.clientId.toString(),
                });
            }
            else{
            history.push({
                pathname: '/profile/' + singleCompletedJob.contractorId.toString(),
                })};
    }
    let name = ""
    let userID=""
    if (localStorage.getItem('usertype') == 'Contractor'){
        name = singleCompletedJob.clientFirstName + " " + singleCompletedJob.clientLastName
        userID=singleCompletedJob.clientId
        }
        else{
        name = singleCompletedJob.contractorFirstName + " " + singleCompletedJob.contractorLastName
        userID=singleCompletedJob.contractorId
        }
    const handleSubmit = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/invoice/' + props.id.toString(),
        });
    }
    const handleInvoice = (event) => {
        event.preventDefault();
        swal({
            title: "Downloaded!",
            text: "Invoice successfully downloaded!",
            icon: "success",
            button: "OK",
        });
        window.open(singleCompletedJob.invoices[-0], "_blank");
    }
    const ts = moment(singleCompletedJob.dateCompleted);
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
                    <p className={styles.location}>Completed {timeVal} ago</p>
                </box>
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
        let services = singleCompletedJob.serviceTypeList;
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
        let lang = singleCompletedJob.languageList;
        // for(var j = 0 ; j < lang.length ; j++){
        //     let temp= lang[j].toLowerCase()
        //     lang[j] = temp.charAt(0).toUpperCase() + temp.substr(1);
        // }
        let tagsCount = lang.length;
        let tempTags = [];
        while (i < tagsCount) {
            tempTags.push(<Tags className={styles2.tag} tagname={lang[i]} />);
            i += 1;
        };
        return tempTags;
    };
    //Code for Contractor review
    const [contractorReview, setContractorReview] = useState([]);
    var profileId = {};
    profileId.id = singleCompletedJob.contractorId;
    const getContractorReview = () => {
        api.getContractorReview(profileId).then(res => {
            console.log("Review loaded successfully");
            console.log(res);
            setContractorReview(res.data);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        setLoading(true);
        getSingleCompletedJob();
    },[]);
    useEffect(() => {
        getContractorReview();
    },[singleCompletedJob]);
    const renderReviews = () => {
        // let i = 0;
        // let reviewsCount = contractorReview.length;
        let tempJobs = [];
        var i;
        for (i in contractorReview) {
            let review = contractorReview[i];
            if(review.clientId === singleCompletedJob.clientId && review.contractorId === singleCompletedJob.contractorId && review.completedJobId.toString() === props.id){
                let title = review.clientFirstName + " " + review.clientLastName
                let reviewDate = review.reviewDate
                let reviewBody = review.reviewContent
                let avatar = review.downloadurl
                let reviewTitle = review.reviewTitle
                let reviewRating = review.reviewRating
                tempJobs.push(
                <Grid item xs={12} sm={6} md={4}  >
                    <ReviewCard reviewRating={reviewRating} reviewTitle={reviewTitle} avatar={avatar} clientId={review.clientId} id={review.id} title={title} subheader={reviewDate} body={reviewBody} />
                </Grid>
                )
            }
        }
        return tempJobs;
    }; 
    let reviews = renderReviews();
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
                <div className={styles.paragraph}>
                    <div className={styles.buttonsII}>
                        {localStorage.getItem('usertype') === 'Client' && localStorage.getItem('client_id') === singleCompletedJob.clientId
                        ?
                        <div>
                            {reviews.length === 0?
                            <Popup trigger={
                                <CompleteButton className={styles.completeButton}> 
                                    Review Contractor
                                </CompleteButton>
                                } 
                                modal contentStyle={contentStyle}>
                                {close => 
                                    <Review close={close} 
                                        name={singleCompletedJob.contractorFirstName + " " + singleCompletedJob.contractorLastName} 
                                        jobId={singleCompletedJob.id} 
                                        contractorId={singleCompletedJob.contractorId} 
                                    />
                                }
                            </Popup>
                            :<CompleteButton className={styles.completeButton} disabled> 
                                &#10004; Contractor Reviewed
                            </CompleteButton>
                            }
                            {singleCompletedJob.invoices.length===0 ?null
                                :<CompleteButton className={styles.completeButton} onClick={handleInvoice}> 
                                    Download Invoice
                                </CompleteButton>}
                        </div>
                        :localStorage.getItem('usertype') === 'Contractor' && localStorage.getItem('contractor_id') === singleCompletedJob.contractorId
                        ?<div>
                            <CompleteButton className={styles.completeButton} onClick={handleSubmit}> 
                                Generate Invoice
                            </CompleteButton>  
                            {singleCompletedJob.invoices.length===0 ?null
                                :<CompleteButton className={styles.completeButton} onClick={handleInvoice}> 
                                    Download Invoice
                            </CompleteButton>}
                        </div>
                        :null
                        }
                    </div>
                    <p className={styles.downloadAppText}>Please download our app from here or browse from desktop to generate receipt or review contractors and for better experience.</p>
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
                        <h1 className={styles.header2}>Review</h1>
                        <box className={styles2.servicetagbox}>
                        {reviews.length>0?
                            <Grid className={styles.gridContainer} container  spacing={reviews.length>0?4:0} justify={"center"}>
                                {reviews}
                            </Grid>
                            : <p>It seems like this job doesn't have any reviews</p>}
                        </box> 
                    </div>
                </div>
            </box>
            <NotFound setOpen={setOpen} open={open}/>
        </div>
    );
}

const contentStyle = {
    width: '1100px',
    height: '850px',
    background: '#FFFFFF',
    borderRadius: '16px',
    zIndex:'9999999'
};
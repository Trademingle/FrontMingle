import React, {useEffect, useState} from 'react';
import styles from '../MyProfile/profile.module.css'; 
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import { Grid } from '@material-ui/core'
import ReviewCard from './reviews'
import api from '../api/api';
import ProfileFormat from './profile.js';
import Done from "./done.js";
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

// import CancelIcon from '@material-ui/icons/Cancel';

const Cprofile = (props) => {
    const [profiles, setProfiles] = useState({serviceTypeList:[],languageList:[]});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    var profileID = {};
    profileID['id'] = props.match.params.contractorId;
    const getContractorProfiles = () => {
        api.getContractorProfiles(profileID).then(res => {
            console.log("Profile loaded successfully");
            console.log(res);
            setProfiles(res.data);
            setLoading(false);
        }).catch(err => {console.log(err); setLoading(false); setOpen(true)})
    }

    useEffect(() => {
        getContractorProfiles();
        window.scrollTo(0, 0);
      },[]);

    const renderProfiles = () => {
          let contractorName = profiles.firstName + " " + profiles.lastName
          let rating = profiles.averageRating
          let jobsDone = profiles.jobsCompleted
        return(
            <ProfileFormat avatar={profiles.downloadurl} name={contractorName} rating={rating} jobsdone={jobsDone} id={profiles.id}/>
          );
    };  
    let languages = profiles.languageList.join(', ')
    //Contractor reviews endpoit connect below
    const [contractorReview, setContractorReview] = useState([]);
    const getContractorReview = () => {
        api.getContractorReview(profileID).then(res => {
            console.log("Review loaded successfully");
            console.log(res);
            setContractorReview(res.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true);
        getContractorReview();
      },[]);

    const renderReviews = () => {
    let i = 0;
    let reviewsCount = contractorReview.length;
    let tempJobs = [];
    while (i < reviewsCount) {
        let review = contractorReview[i]
        let title = review.clientFirstName + " " + review.clientLastName
        let reviewDate = review.reviewDate
        let reviewBody = review.reviewContent
        let avatar = review.downloadurl
        let reviewTitle = review.reviewTitle
        let reviewRating= review.reviewRating
        tempJobs.push(
        <Grid item xs={12} sm={6} md={4}  >
            <ReviewCard reviewRating={reviewRating} avatar={avatar} reviewTitle={reviewTitle} clientId={review.clientId} id={review.id} title={title} subheader={reviewDate} body={reviewBody} />
        </Grid>
        );
        // Proceed to the next message.
        i += 1;
        }
        return tempJobs;
    }; 
    const renderTags = () => {
        let i = 0;
        let services = profiles.serviceTypeList;
        let tagsCount = services.length;
        let tempTags = [];
        while (i < tagsCount) {
            tempTags.push(<Tags className={styles2.tag} tagname={services[i]} />);
            i += 1;
        };
        return tempTags;
    };

    let reviews = renderReviews();
    if (loading) {
        return <LoadingView/>;
        }
    return(
        <div className={styles.biggyBox}>
            <div className={styles.secondBigBox}>
                <div className={styles.profilebox}>
                    {renderProfiles()}
                </div>  
                <div className={styles.mustHide}>
                    <p className={styles.liability}>
                        {profiles.isInsuranceNumberVerified === true
                        ?<VerifiedUserIcon className={styles.Vector} style={{height:20}}/>
                        : null
                        //<CancelIcon className={styles.Vector} style={{height:20, color:'red'}}/>
                    }
                        Liability insurance
                        no: {profiles.insuranceNumber}
                    </p>
                    <p className={styles.workercompensation}>
                        {profiles.isWorkerNumberVerified === true
                        ?<VerifiedUserIcon className={styles.Vector} style={{height:20}}/>
                        :null}                    
                        Worker compensation insurance
                        no: {profiles.workerNumber}
                    </p>
                </div>
            </div>
            <hr className={styles.hr1}/>   
            <div className={styles.SecondBox}>
                <div className={styles.skillsbox}>
                    <h1 className={styles.skills}>Skills</h1>
                    <box className={styles2.servicetagbox}>
                        <Grid container spacing={0}>
                            {renderTags()}
                        </Grid>
                    </box>        
                </div>
                <div className={styles.languagebox}>
                    <h1 className={styles.planguages}>Preferred languages</h1>
                    <p className={styles.languages}>{languages}</p>
                </div>
            </div> 
            <hr className={styles.hr1}/>
            <div className={styles.ThirdBox}>
                <h1 className={styles.skills}>About</h1>
                <video src={profiles.profile_video} controls height="400px" width='auto'/>
            </div>
            <hr className={styles.hr1}/>
            <div className={styles.ThirdBox}>
                <div className ={styles.FourthBox}>
                    <h1 className={styles.skills}>
                    Completed Jobs
                    </h1>
                    <Done id= {props.match.params.contractorId} />
                </div>
                <h1 className={styles.skills}>
                    Reviews
                </h1>
                {reviews.length>0?
                <Grid className={styles.gridContainer} container  spacing={reviews.length>0?4:0} justify={"center"}>
                    {reviews}
                </Grid>
                : <p>It seems like this contractor doesn't have any reviews</p>}
            </div> 
            <NotFound setOpen={setOpen} open={open}/>

        </div> 
        )
};
function Tags(props) {
    if (!props.tagname) return null;
    return (
        <Grid item >
            <box className={styles2.tag}>
                <p className={styles2.tagfont}>{props.tagname}</p>
            </box>
        </Grid>
    )
};


export default Cprofile;


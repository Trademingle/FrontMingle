import React, {useEffect, useState} from 'react';
import styles from './profile.module.css'; 
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import styles2 from '../ContractorActiveJobsPage/styles.module.css';
import { Grid } from '@material-ui/core';
import ReviewCard from '../ProfileView/reviews';
import api from '../api/api';
import Profile from './profile.js';
import LoadingView from '../ResuableComponents/loadingView';

const Cprofile = (props) => {
    function onChange(){
        getProfiles()
    }
    var profileId = {};
    profileId['id'] = localStorage.getItem('user_id');
    const [profiles, setProfiles] = useState({serviceTypeList:[],languageList:[]});
    const [loading, setLoading] = useState(false);
    const getProfiles = () => {
        api.getProfiles(profileId).then(res => {
            console.log("Profile loaded successfully");
            console.log(res);
            setProfiles(res.data);
            setLoading(false);
        }).catch(err => {console.log(err);setLoading(false);})
    }

    useEffect(() => {
        setLoading(true);
        getProfiles();
      },[]);
    const renderTags = () => {
        if(localStorage.getItem("usertype") === "Client"){
            return(null)}
        else{
            let i = 0;
            let services = profiles.serviceTypeList;
            let tagsCount = services.length;
            let tempTags = [];
            while (i < tagsCount) {
                tempTags.push(<Tags className={styles2.tag} tagname={services[i]} />);
                i += 1;
            };
            return tempTags;}
        };
    const renderSkills = () => {
        if(localStorage.getItem("usertype") === "Client"){
            return(null)}
        else{
            return ("Skills")}
        };
    const renderProfiles = () => {
          let firstName = profiles.firstName
          let lastName = profiles.lastName
          let rating = profiles.averageRating;
          let jobsDone = profiles.jobsCompleted;
          let services = profiles.serviceTypeList;
          let languages = profiles.languageList
        return(
            <Profile 
                onChange={onChange} 
                avatar={profiles.downloadurl} 
                firstName={firstName} 
                lastName={lastName} 
                rating={rating} 
                jobsdone={jobsDone}
                insuranceNumber={profiles.insuranceNumber}
                isInsuranceNumberVerified={profiles.isInsuranceNumberVerified}
                isWorkerNumberVerified={profiles.isWorkerNumberVerified}
                workerNumber={profiles.workerNumber}
                services={services}
                languages={languages}
            />
          );
        };   
    let languages = profiles.languageList.join(', ')
    //Contractor reviews endpoit connect below
    const [contractorReview, setContractorReview] = useState([]);
    const getContractorReview = () => {
        api.getContractorReview(profileId).then(res => {
            console.log("Review loaded successfully");
            console.log(res);
            setContractorReview(res.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
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
        let reviewTitle = review.reviewTitle
        let reviewRating = review.reviewRating

        tempJobs.push(
        <Grid item xs={12} sm={6} md={4} >
            <ReviewCard reviewRating={reviewRating} clientId={review.clientId} greviewTitle={reviewTitle} title={title} subheader={reviewDate} body={reviewBody} />
        </Grid>
        );
        i += 1;
    }
    return tempJobs;
    }; 
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
                    {profiles.isInsuranceNumberVerified === true && localStorage.getItem('usertype') === 'Contractor' 
                    ?<p className={styles.liability}>
                        <VerifiedUserIcon className={styles.Vector} style={{height:20}}/>Liability insurance no: {profiles.insuranceNumber}
                    </p>
                    :profiles.isInsuranceNumberVerified === false && localStorage.getItem('usertype') === 'Contractor' 
                    ?<p className={styles.liability}>
                        Liability insurance no: {profiles.insuranceNumber}
                    </p>
                    :null
                    }
                    {profiles.isWorkerNumberVerified === true && localStorage.getItem('usertype') === 'Contractor' 
                    ?<p className={styles.workercompensation}>
                        <VerifiedUserIcon className={styles.Vector} style={{height:20}}/>Worker compensation insurance no: {profiles.workerNumber}
                    </p>
                    :profiles.isWorkerNumberVerified === false && localStorage.getItem('usertype') === 'Contractor' 
                    ?<p className={styles.workercompensation}>
                        Worker compensation insurance no: {profiles.workerNumber}
                    </p>
                    :null
                    }
                </div>
            </div>
            <hr className={styles.hr1}/>   
            <div className={styles.SecondBox}>
                <div className={styles.skillsbox}>
                    <h1 className={styles.skills}>{renderSkills()}</h1>
                    <box className={styles2.servicetagbox}>
                        {renderTags()}
                    </box>       
                </div>
                {profiles.isInsuranceNumberVerified === true && localStorage.getItem('usertype') === 'Contractor' 
                ?<div className={styles.languagebox}>
                    <h1 className={styles.planguages}>Preferred languages</h1>
                    <p className={styles.languages}>{languages}</p>
                </div>
                :<div>
                    <h1 className={styles.planguages}>Preferred languages</h1>
                    <p className={styles.languages}>{languages}</p>
                    </div>
                }

            </div> 
            <hr className={styles.hr1}/>
            {localStorage.getItem('usertype') === 'Contractor' 
            ?<div className={styles.ThirdBox}>
                <h1 className={styles.skills}>About</h1>
                <video src={profiles.profile_video} controls height="400px" width='auto'/>
                <hr className={styles.hr2}/>
            </div>:null}
            {localStorage.getItem('usertype') === 'Contractor' 
            ?<div className={styles.ThirdBox}>
                <h1 className={styles.skills}>
                    Reviews
                </h1>
                {contractorReview.length>0?
                <Grid container spacing={4} className={styles.gridContainer} justify="center">
                    {renderReviews()}
                </Grid>
                : <p>It seems like you don't have any reviews</p>}
            </div>:null}
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


export default Cprofile;
 


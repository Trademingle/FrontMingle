import React, {useEffect, useState} from 'react';
import styles from '../ProfileViewClient/profile.module.css';
import api from '../api/api';
import ProfileFormat from './profile.js';
import LoadingView from '../ResuableComponents/loadingView';

const ClientProfile = (props) => {
    function onChange(){
        getProfiles()
    }
    const [profiles, setProfiles] = useState({languageList:[]});
    const [loading, setLoading] = useState(false);
    var profileID = {};
    profileID['id'] = localStorage.getItem('user_id');
    const getProfiles = () => {
        api.getProfiles(profileID).then(res => {
            console.log("Profile loaded successfully");
            console.log(res);
            setProfiles(res.data);
            setLoading(false);
        }).catch(err => {console.log(err);setLoading(false);})
    }
    useEffect(() => {
        setLoading(true);
        getProfiles();
        window.scrollTo(0, 0);
      },[]);

    const renderProfiles = () => {
        let firstName = profiles.firstName
        let lastName = profiles.lastName
        let rating = profiles.averageRating;
        let jobsDone = profiles.jobsCompleted;
        let services = profiles.serviceList;
        let languages = profiles.languageList
        return(
            <ProfileFormat 
                onChange={onChange} 
                avatar={profiles.downloadurl} 
                name={firstName +" "+ lastName}
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
    if (loading) {
        return <LoadingView/>;
        }
    return(
        <div className={styles.profileMainBox}>
            <div className={styles.profilebox}>
                {renderProfiles()}
            </div>  
            <hr className={styles.hr1}/>   
            <div className={styles.SecondBox}>
                <div className={styles.languagebox}>
                    <h1 className={styles.planguages}>Preferred languages: &nbsp;</h1>
                    <p className={styles.languages}>{languages}</p>
                </div>
                <div className={styles.languagebox}>
                    <h1 className={styles.planguages}>Phone Number: &nbsp;</h1>
                    <p className={styles.languages}>9876543210</p>
                </div>
            </div> 
            <hr className={styles.hr2}/>
        </div> 
    )};

export default ClientProfile;


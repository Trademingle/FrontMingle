import React, {useEffect, useState} from 'react';
import styles from './profile.module.css'; 
import api from '../api/api';
import ProfileFormat from './profile.js';
import NotFound from '../ResuableComponents/404';
import LoadingView from '../ResuableComponents/loadingView';

const ClientProfile = (props) => {
    const [profiles, setProfiles] = useState({languageList:[]});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    var profileID = {};
    profileID['id'] = props.match.params.clientId;
    const getClientProfiles = () => {
        api.getClientProfiles(profileID).then(res => {
            console.log("Profile loaded successfully");
            console.log(res);
            setProfiles(res.data);
            setLoading(false);
        }).catch(err => {console.log(err); setLoading(false); setOpen(true)})
    }
    useEffect(() => {
        setLoading(true);
        getClientProfiles();
        window.scrollTo(0, 0);
      },[]);

    const renderProfiles = () => {
          let contractorName = profiles.firstName + " " + profiles.lastName
          let rating = profiles.averageRating
          let jobsDone = profiles.jobsCompleted
        return(
            <ProfileFormat avatar={profiles.downloadurl} fName={profiles.firstName} clientId={props.match.params.clientId} name={contractorName} rating={rating} jobsdone={jobsDone}/>
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
            <NotFound setOpen={setOpen} open={open}/>

        </div> 
    )};

export default ClientProfile;


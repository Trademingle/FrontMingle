import React, { useEffect, useState } from 'react';
import styles from '../HomeOwnerExplorePage/explore.module.css';
import SearchBar from '../Landing/searchbar';
import ExploreCard from './ExploreCard copy';
import api from '../api/api';
import LoadingView from '../ResuableComponents/loadingView';

const ContractorExplorePage = () => {
    const [unassignedJobs, setUnassignedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUnassignedJobs = () => {
        api.getUnassignedJobs({}).then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setUnassignedJobs(res.data['nearby jobs']);
            setLoading(false);
        }).catch(err => {console.log(err); setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        getUnassignedJobs();
      },[]);

    const renderUnassignedJobs = () => {
        let i = 0;
        let unassignedJobCount = unassignedJobs.length;
        let tempJobs = [];
        if(unassignedJobCount === 0){
            return("It looks like there are no jobs near you.")
        }
        else{
            while (i < unassignedJobCount) {
            let unassignedJob = unassignedJobs[i]
            let jobId = unassignedJob.id
            let jobTitle = unassignedJob.title
            let contractorName = unassignedJob.clientFirstName
            let location = unassignedJob.locationDetail
            var serviceTypeList = unassignedJob.serviceTypeList;
            let avatar = unassignedJob.downloadurl[0]
            let clientId = unassignedJob.clientId
            tempJobs.push(
                <ExploreCard name={jobTitle} id={jobId} Cname={contractorName} location={location} clientId ={clientId} 
                avatarPic={avatar} 
                serviceList={serviceTypeList}> </ExploreCard>
            );
        
            // Proceed to the next message.
            i += 1;
            }
            return tempJobs;
        }
      };
    return (
        <div className={styles.contentwrapper}>
            <SearchBar type='contractor' />
            <h1 className={styles.header}>Jobs Near You</h1>
            <box className={styles.explorebox}>
                <box className={styles.explorecardbox}>
                    {loading?<LoadingView/>
                    :renderUnassignedJobs()}
                </box>
                <box className={styles.adbox}>
                    <box className={styles.ad}>
                        <p style={{fontSize:80}}>Ad</p>
                    </box>
                </box>
            </box>

        </div>

    )
};

export default ContractorExplorePage;

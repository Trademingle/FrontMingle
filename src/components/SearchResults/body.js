import React, { useEffect, useState } from 'react';
import styles from './search.module.css';
import ExploreCard from '../HomeOwnerExplorePage/ExploreCard';
import {default as JobCard} from '../ContractorExplorePage/ExploreCard copy';
import api from '../api/api';
import LoadingView from '../ResuableComponents/loadingView';

export default function SearchBody(props){
    let [Contractors, setContractors] = useState({});
    const [loading, setLoading] = useState(false);
    const loadContractors = () => {
        console.log("body", props.information);
        api.getNearByCProfiles(props.information).then(res => {
          setContractors(res.data['nearby contractors']);
          setLoading(false);
        }).catch(err => console.log(err))
    }

    const loadJobs = () => {
        console.log("body", props.information);
        api.getUnassignedJobs(props.information).then(res => {
          setContractors(res.data['nearby jobs']);
          setLoading(false);
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem('usertype')=== "Contractor"){
            loadJobs();
        }else{
            loadContractors();
        }
    },[props.information]);

    if (loading) {
    return (        
        <LoadingView/>)
    }
    function renderFeaturedContrators() {
        let i = 0;
        let contractorCount = Contractors.length;
        let tempContractors = [];
        while (i < contractorCount) {
            let data = Contractors[i];
            if (localStorage.getItem('usertype')=== "Contractor"){
                let unassignedJob = data
                let jobId = unassignedJob.id
                let jobTitle = unassignedJob.title
                let contractorName = unassignedJob.clientFirstName
                let location = unassignedJob.locationDetail
                var serviceTypeList = unassignedJob.serviceTypeList;
                let avatar = unassignedJob.downloadurl[0]
                let clientId = unassignedJob.clientId
                tempContractors.push(
                    <JobCard name={jobTitle} id={jobId} Cname={contractorName} location={location} clientId ={clientId} 
                    avatarPic={avatar} 
                    serviceList={serviceTypeList}> </JobCard>
                );
            }else{
                tempContractors.push(
                    <ExploreCard avatar={data.downloadurl} className={styles.ContractorCard} contractorId={data.id} name={data.firstName + " " + data.lastName} rating={data.averageRating} review={data.numberOfReviews} serviceList={data.serviceTypeList} />
                );
            }
            i += 1;
        }
        return tempContractors;
    };
    return (
        <div className={styles.sBody}>
            {Contractors.length === 0
                ?<h1 className={styles.header}>{Contractors.length} results</h1>
                :<h1 className={styles.header}>{Contractors.length} Results</h1>
            }
            <box className={styles.explorebox}>
                {renderFeaturedContrators()}
            </box>
        </div>
    )
};


import React, { useEffect, useState} from 'react';
import api from '../api/api';
import JobPosting from './jobpostingUnassigned';
import styles from './styles.module.css'; 
import { Grid } from '@material-ui/core';
import LoadingView from '../ResuableComponents/loadingView';

const Unassigned = () => {
    let userId=[]
    const [unassignedJobs, setAllUnassignedJobs] = useState({downloadurl:[]});
    const [loading, setLoading] = useState(false);

    const getAllUnassignedJobs = () => {
        api.getAllUnassignedJobs(userId).then(res => {
            console.log("Job loaded successfully");
            console.log(res)
            setAllUnassignedJobs(res.data);
            setLoading(false);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        setLoading(true);
        getAllUnassignedJobs();
    },[]);
    const renderUnassignedJobs = () => {
        let i = 0;
        let unassignedJobCount = unassignedJobs.length;
        if (unassignedJobCount===0){
            return(
              <div>
                <p>It seems you don't have any Unassigned Jobs.</p>
              </div>
            )
          }
          else{
        let tempJobs = [];
        while (i < unassignedJobCount) {
            let unassignedJob = unassignedJobs[i]
            let jobTitle = unassignedJob.title
            let jobId = unassignedJob.id
            let contractorName = unassignedJob.clientFirstName
            let location = unassignedJob.locationDetail
            var serviceTypeList = unassignedJob.serviceTypeList
            let avatar = unassignedJob.downloadurl[0]
            // let userId = unassignedJob.contractorId

            tempJobs.push(
                <Grid item>
                    <JobPosting userId={userId} avatar={avatar} complete= {5} id={jobId} title={jobTitle} name={contractorName} location={location} serviceList={serviceTypeList}/>
                </Grid>
            );

            i += 1;
        }
        return tempJobs;}
    };
    return(
        <div className={styles.gridContainer}>
            <Grid container spacing={2} justify="left">
                {loading?<LoadingView/>:renderUnassignedJobs()}
            </Grid>
        </div>
    )
};

export default Unassigned;
export {Unassigned};
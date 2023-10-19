import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';  
import JobPosting from './jobpostingSaved.js';
import api from '../api/api';
import { Grid } from '@material-ui/core';
import LoadingView from '../ResuableComponents/loadingView';

const Saved = () => {
  let data={}
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const getSavedJobs = () => {
        api.getSavedJobs().then(res => {
          // debugger;
            console.log("Job loaded successfully");
            console.log(res);
            setSavedJobs(res.data); //change [] with .get
            setLoading(false);
        }).catch(err => console.log(err))
    }
  
    useEffect(() => {
      setLoading(true);
      getSavedJobs();
      },[]);
  
    const renderSavedJobs = () => {
        let i = 0;
        let savedJobsCount = savedJobs.length;
        if (savedJobsCount===0){
          return(
            <div>
              <p>It seems you don't have any Saved Jobs.</p>
            </div>
          )
        }
        else{
        let tempJobs = [];
        while (i < savedJobsCount) {
          let unassignedJob = savedJobs[i]
          let jobId = unassignedJob.id
          let jobTitle = unassignedJob.title
          let contractorName = unassignedJob.clientFirstName
          let location = unassignedJob.locationDetail
          let str = unassignedJob.serviceTypeList;
          let avatar = unassignedJob.downloadurl[0]
          let userId = unassignedJob.clientId
        //   let avatar = unassignedJob.imageListStoreRef
          // debugger
  
          tempJobs.push(
            <Grid item>
              <JobPosting userId={userId} avatar={avatar} complete= {0} id={jobId} title={jobTitle} name={contractorName} location={location} serviceList={str}/>
            </Grid>
          );
    
          // Proceed to the next message.
          i += 1;
        }
        return tempJobs;}
      };
    return(
      <div className={styles.gridContainer}>
        <Grid container spacing={2} justify="left">
            {loading?<LoadingView/>:renderSavedJobs()}
        </Grid>
      </div>)
};

export default Saved;
export {Saved};
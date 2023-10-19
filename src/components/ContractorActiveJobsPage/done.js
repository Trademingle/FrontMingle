import React, { useEffect, useState } from 'react';
import JobPosting from './jobpostingCompleted.js';
import api from '../api/api';
import styles from './styles.module.css';
import { Grid } from '@material-ui/core';
import LoadingView from '../ResuableComponents/loadingView';

const Done = () => {
    const [cCompletedJobs, setCCompletedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const getCCompletedJobs = () => {
        api.getCCompletedJobs().then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setCCompletedJobs(res.data["completedJobs"]); //change [] with .get
            setLoading(false);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
      setLoading(true);
        getCCompletedJobs();
      },[]);
    const renderCompletedJobs = () => {
        let i = 0;
        let completedJobCount = cCompletedJobs.length;
        if (completedJobCount===0){
          return(
            <div>
              <p>It seems you don't have any Completed Jobs.</p>
            </div>
          )
        }
        else{
        let tempJobs = [];
        while (i < completedJobCount) {
          let completedJob = cCompletedJobs[i]
          let jobTitle = completedJob.title
          let jobId = completedJob.id
          let contractorName = completedJob.clientFirstName
          let location = completedJob.locationDetail
          var serviceTypeList = completedJob.serviceTypeList;
          // var serviceTypeList = str.split(',');
          let avatar = completedJob.downloadurl[0]
          let userId= completedJob.clientId
          tempJobs.push(
            <Grid item>
              <JobPosting userId={userId} avatar={avatar} complete= {1} id={jobId} title={jobTitle} name={contractorName} location={location} serviceList={serviceTypeList}/>
            </Grid>
          );
          i += 1;
        }
        return tempJobs;}
      };
    return(
        // <div className={styles.flex}>
        //     {renderCompletedJobs()}
        // </div>
        <div className={styles.gridContainer}>
          <Grid container spacing={2} justify="left">
              {loading?<LoadingView/>:renderCompletedJobs()}
          </Grid>
        </div>
    )

};

export default Done;
export {Done};
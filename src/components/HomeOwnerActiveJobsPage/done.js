import React, { useEffect, useState} from 'react';
import JobPosting from "../ContractorActiveJobsPage/jobpostingCompleted";
import api from '../api/api';
import styles from './styles.module.css';
import { Grid } from '@material-ui/core';
import LoadingView from '../ResuableComponents/loadingView';

const Done = () => {
    const [completedJobs, setCompletedJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCompletedJobs = () => {
        api.getCompletedJobs().then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setCompletedJobs(res.data["completedJobs"]); //change [] with .get
            setLoading(false);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
      setLoading(true);
        getCompletedJobs();
      },[]);
    const renderCompletedJobs = () => {
        let i = 0;
        let completedJobCount = completedJobs.length;
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
          let completedJob = completedJobs[i]
          let jobTitle = completedJob.title
          let jobId = completedJob.id
          let contractorName = completedJob.contractorFirstName
          let location = completedJob.locationDetail
          var serviceTypeList = completedJob.serviceTypeList;
          // var serviceTypeList = str.split(',');
          let avatar = completedJob.downloadurl[0]
          let userId = completedJob.contractorId

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
      <div className={styles.gridContainer}>
        <Grid container spacing={2} justify="left">
            {loading?<LoadingView/>:renderCompletedJobs()}
        </Grid>
      </div>
    )

};

export default Done;
export {Done};
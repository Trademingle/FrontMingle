import React, { useEffect, useState} from 'react';
import styles from './styles.module.css';  
import JobPosting from '../ContractorActiveJobsPage/jobposting';
import api from '../api/api';
import { Grid } from '@material-ui/core';
import LoadingView from '../ResuableComponents/loadingView';


const Active = () => {
    const [activeJobs, setActiveJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getActiveJobs = () => {
        api.getActiveJobs().then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setActiveJobs(res.data); //change [] with .get
            setLoading(false);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
      setLoading(true);
        getActiveJobs();
      },[]);
    const renderActiveJobs = () => {
        let i = 0;
        let activeJobCount = activeJobs.length;
        if (activeJobCount===0){
          return(
            <div>
              <p>It seems you don't have any Active Jobs.</p>
            </div>
          )
        }
        else{
        let tempJobs = [];
        while (i < activeJobCount) {
          let activeJob = activeJobs[i]
          let jobTitle = activeJob.title
          let jobId = activeJob.id
          let contractorName = activeJob.contractorFirstName
          let location = activeJob.locationDetail
          var serviceTypeList = activeJob.serviceTypeList;
          let avatar = activeJob.downloadurl[0]
          let userId = activeJob.contractorId
          tempJobs.push(
            <Grid item>
              <JobPosting userId={userId} avatar={avatar} complete= {0} id={jobId} title={jobTitle} name={contractorName} location={location} serviceList={serviceTypeList}/>
            </Grid>
          );
    
        //   // Proceed to the next message.
          i += 1;
        }
        return tempJobs;}
      };
    return(
      <div className={styles.gridContainer}>
        <Grid container spacing={2} justify="left">
            {loading?<LoadingView/>:renderActiveJobs()}
        </Grid>
      </div>
    )

};


export default Active;
export {Active};

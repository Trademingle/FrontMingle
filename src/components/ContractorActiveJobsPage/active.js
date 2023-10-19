import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';  
import JobPosting from './jobposting.js';
import api from '../api/api';
import { Grid } from '@material-ui/core'
import LoadingView from '../ResuableComponents/loadingView';


const Active = () => {
    const [cactiveJobs, setCActiveJobs] = useState({serviceTypeList:[]});
    const [loading, setLoading] = useState(false);
    const getCActiveJobs = () => {
      api.getCActiveJobs().then(res => {
          console.log("Job loaded successfully");
          console.log(res);
          setCActiveJobs(res.data); //change [] with .get
          setLoading(false);
      }).catch(err => console.log(err))
    }
    useEffect(() => {
      setLoading(true);
      getCActiveJobs();
    },[]);
    const renderActiveJobs = () => {
      let i = 0;
      let activeJobCount = cactiveJobs.length;
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
          let activeJob = cactiveJobs[i]
          let jobTitle = activeJob.title
          let jobId = activeJob.id
          let contractorName = activeJob.clientFirstName
          let location = activeJob.locationDetail
          var serviceType = activeJob.serviceTypeList;
          let avatar = activeJob.downloadurl[0]
          let userId = activeJob.clientId
          tempJobs.push(
            <Grid item>
              <JobPosting avatar={avatar} complete= {0} id={jobId} title={jobTitle} name={contractorName} location={location} serviceList={serviceType} userId={userId}/>
            </Grid>
          );
          i += 1;
        }
        return tempJobs
      };
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

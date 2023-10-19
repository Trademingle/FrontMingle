import React, { useEffect, useState } from 'react';
import JobPosting from '../ContractorActiveJobsPage/jobpostingCompleted';
import api from '../api/api';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));
const Done = (props) => {
  const classes = useStyles();
    const [cCompletedJobs, setCCompletedJobs] = useState([]);
    let contractorId= {}
    contractorId["id"] =props.id
    const getCCompletedJobs = () => {
        api.getCCompletedJobsByClients(contractorId).then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setCCompletedJobs(res.data["completedJobs"]); //change [] with .get
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getCCompletedJobs();
      },[]);
    const renderCompletedJobs = () => {
        let i = 0;
        let completedJobCount = cCompletedJobs.length;
        let tempJobs = [];
        while (i < completedJobCount && i<5) {
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

      if (cCompletedJobs.length===0){
        return(
          <div>
            <p>It seems like this contractor doesn't have any completed jobs.</p>
          </div>
        )
      }
      else{
        return(
            <div className={classes.root}>
              <Grid cellHeight={300} container direction="row" justify="center" alignItems="center">
                  {renderCompletedJobs()}
              </Grid>
            </div>
        )
            }
    // return(
    //     <div className={classes.root}>
    //       <GridList cellHeight={300} cols={2.5} className={classes.gridList}>
    //           {renderCompletedJobs()}
    //       </GridList>
    //     </div>
    // )

};

export default Done;
export {Done};
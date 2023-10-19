import React, { useEffect, useState} from 'react';
import { Route, NavLink } from 'react-router-dom';
import styles from './styles.module.css'; 
import Active from './active.js';
import Done from './done.js';
import Saved from './saved.js';  
import PendingJobs from './pending.js';
import api from '../api/api';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import LoadingView from '../ResuableComponents/loadingView';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop:80,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex:3,
  },
  drawerPaper: {
    width: drawerWidth,
    paddingLeft:'20px'
  },
}));

const ContractorActiveJobsPage = (props) => {
  const [pendingJobs, setPendingJobs] = useState({});
  const [loading, setLoading] = useState(false);
  const getPendingJobs = () => {
      api.getPendingJobs().then(res => {
        // debugger;
          console.log("Job loaded successfully");
          console.log(res);
          setPendingJobs(res.data); //change [] with .get
          setLoading(false);
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    setLoading(true);
      getPendingJobs();
    },[]);

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const renderPendingJobs = () => {
    let i = 0;
    let jobsCount = pendingJobs.length;
    if (jobsCount===0){
      return(
        <div>
          <p>It seems you don't have any Pending Jobs.</p>
        </div>
      )
    }
    else{
    let tempJobs = [];
    while (i < jobsCount) {
      let job = pendingJobs[i]
      let jobId = job.id
      let jobTitle = job.title
      let contractorName = job.clientFirstName
      let location = job.locationDetail
      let serviceList = job.serviceTypeList;
      let avatar= job.downloadurl[0]
      let userId= job.clientId
      tempJobs.push(
        <PendingJobs userId={userId} onAction={getPendingJobs} avatar={avatar} complete= {0} id={jobId} title={jobTitle} name={contractorName} location={location} serviceList={serviceList} />
      );

      // Proceed to the next message.
      i += 1;
    }
    return tempJobs;}
  };
  const classes = useStyles();
  return(
    <div>
      <h1 className={styles.header}>My Jobs 
        {open ===false?
        <button onClick={handleDrawerOpen} className={styles.showbutton}>
          View Pending Jobs
        </button>
        :null
        }
      </h1> 
      <div className={styles.header2}>
        <NavLink exact to="/ContractorActiveJobs/active" className={styles.activeJob} activeStyle={{
          fontWeight: "bold",
          color: '#2B64D2'
        }}>Active</NavLink>
        <NavLink exact to="/ContractorActiveJobs/saved" className={styles.activeJob} activeStyle={{
          fontWeight: "bold",
          color: '#2B64D2'
        }}>Saved</NavLink>
        <NavLink exact to="/ContractorActiveJobs/done" className={styles.activeJob} activeStyle={{
          fontWeight: "bold",
          color: '#2B64D2'
        }}>Done</NavLink>
      </div>
      <div className={styles.content}>
        <Route path="/ContractorActiveJobs/active" component={Active}/>
        <Route path="/ContractorActiveJobs/saved" component={Saved}/>
        <Route path="/ContractorActiveJobs/done" component={Done}/>
      </div>
      <Drawer
        className={styles.rectangle33}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}      >
        <h1 className={styles.pending}> Pending Requests 
          <button onClick={handleDrawerClose} className={styles.hidebutton}>
            Hide
          </button>
        </h1>
        {loading?<LoadingView/>:renderPendingJobs()}
      </Drawer>
      {/* <box className={styles.rectangle33}>
          <h1 className={styles.pending}> Pending Requests</h1>
          {renderPendingJobs()}
      </box> */}
    </div>
)};

export default ContractorActiveJobsPage;

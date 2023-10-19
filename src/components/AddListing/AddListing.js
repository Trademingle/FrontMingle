import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddListingOne from './AddListingOne';
import AddListingTwo from './AddListingTwo';
import AddListingThree from './AddListingThree';
import styles from './review.module.css';
import { purple } from '@material-ui/core/colors';
import api from '../api/api';
import {useHistory } from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert';

const ContinueButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    borderRadius:44,
    backgroundColor: '#2B64D2',
    '&:hover': {
      backgroundColor: '#003ba0',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    overflow:'hidden'
  },
  continuebutton: {
    borderRadius: "15px"
  },
}));

function getSteps() {
  return ['Required info', 'Optional info', 'Review'];
}
const listingObj = {imageListStoreRef:[], serviceTypeList:[]}
listingObj.datePosted = moment().format('YYYY-MM-DD');

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <AddListingOne  data={listingObj}/>;
    case 1:
      return <AddListingTwo data={listingObj}/>;
    case 2:
      return <AddListingThree data={listingObj}/>;
  }
}

export default function AddListing() {
  const jobCallback= ()=>{
    window.location.href="/homeowneractivejobs/unassigned"
    swal({
      title: "Success!",
      text: "Job has been successfully created!",
      icon: "success",
      button: "OK",
    });
  }
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const job_data = listingObj;
  // const history = useHistory();
  const handleNext = () => {
    if (activeStep === 2){
        api.addUnassignedJob(job_data,jobCallback)
      // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    if(activeStep === 0 && (listingObj.title === undefined || listingObj.locationDetail === undefined || listingObj.jobDetails === undefined || listingObj.serviceTypeList === [])){
      swal({
        title: "Data not found!",
        text: "Please, fill out entire form.",
        icon: "error",
        button: "OK",
      });
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={styles.fullpagebox}>
      <box className={styles.mainbox}>
        <h1 className={styles.h1}>Add a listing</h1>
        <div className={styles.reviewcontent}>
          {activeStep === steps.length ? (
            <div>
            </div>
          ) : (
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
          )}
        </div>
        <box className={styles.stepperbox}>
          <ContinueButton className={styles.continue} onClick={handleNext}>
              <p className={styles.continuetext}>Continue</p>
          </ContinueButton>
          <Stepper nonLinear className={styles.stepper} activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={handleStep(index)} >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </box>
      </box>
    </div>
  );
}

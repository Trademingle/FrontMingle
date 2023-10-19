import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReviewPageOne from './ReviewPageOne';
import ReviewPageTwo from './ReviewPageTwo';
import ReviewPageThree from './ReviewPageThree';
import styles from './review.module.css';
import { useHistory} from 'react-router-dom';
import api from '../api/api';
import moment from 'moment';
import swal from 'sweetalert';

const ContinueButton = withStyles((theme) => ({
  root: {
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
  },
  continuebutton: {
    borderRadius: "15px"
  },
}));


function getSteps() {
  return ['Rating', 'Write a review', 'Confirm'];
}

const reviewObj = {}


function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <ReviewPageOne data={reviewObj}/>;
    case 1:
      return <ReviewPageTwo data={reviewObj}/>;
    case 2:
      return <ReviewPageThree data={reviewObj}/>;
  }
}

export default function ReviewPages(props) {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const review_data = reviewObj;
  review_data.reviewDate = moment().format('YYYY-MM-DD');
  review_data.reviewRating = Math.round((review_data.Communication + review_data.Payments + review_data.Respect) / 3)
  review_data.contractorId = props.contractorId
  review_data.completedJobId = props.jobId
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2){
      // debugger
      api.addContractorReview(review_data).then(res => {
        console.log('review was successfully posted!');
      }).catch(err => console.log(err))
      history.push('/homeOwnerActiveJobs/done');
      swal({
        title: "Review Added!",
        text: "Review has been successfully Added!",
        icon: "success",
        button: "OK",
      });
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
    <div>
      <box className={styles.mainbox}>
        <h1 className={styles.h1}>Rate {props.name}</h1>
        <div className={styles.reviewcontent}>
          {activeStep === steps.length ? (
            <div>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>

            </div>
          )}
        </div>
        <box className={styles.stepperbox}>
          <div >
          <ContinueButton className={styles.continue} onClick={handleNext}>
              <p className={styles.continuetext}>Continue</p>
            </ContinueButton>
            {/* <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
          </div>
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

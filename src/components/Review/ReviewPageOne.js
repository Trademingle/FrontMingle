import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './review.module.css'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

const ReviewPageOne = (props) => {
  return (
    <div >
      <box className={styles.biggestbox}>
        <box className={styles.ratingbox}>
          <Ratings reviewTitle="Communication" data={props.data} description="Did the homeowner make you well aware of expectations?"/>
          <Ratings reviewTitle="Payments" data={props.data} description="Did the homeowner pay you in the full amount negotiated?"/>
          <Ratings reviewTitle="Respect" data={props.data} description="Was the homeowner polite, understanding and non-discriminatory?"/>
        </box>

      </box>
    </div>

  )
};

const StyledRating = withStyles({
  iconFilled: {
    color: '#2B64D2',
  },
  

})(Rating);

const Ratings = (props) =>{
  return(
    <div>
      <h2 className={styles.h2}> {props.reviewTitle} </h2>
      <p className={styles.description}>{props.description}</p>
      <Ratingstars data={props.data} RTitle={props.reviewTitle} />
    </div>
  )
}

function Ratingstars(props) {
  // const [value, setValue] = React.useState(2);

  return (
    <div>
      <Box className={styles.stars} component="fieldset" mb={3} borderColor="transparent">
        <StyledRating
          style={{fontSize:32}}
          name={props.RTitle}
          onChange={(event, newValue) => {
            // setValue(newValue);
            props.data[event.target.name]= newValue
            // debugger
          }}
          defaultValue= {props.data[props.RTitle]}
        />
      </Box>
    </div>
  );
}

export default ReviewPageOne;
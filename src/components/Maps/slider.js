import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Styles from './maps.module.css';
const useStyles = makeStyles({
  root: {
    width:400,
    borderRadius: 24,
    opacity: 1,
    margin: '9 auto',
    height:8,
    marginLeft:'50%',
  },
  input: {
    width: 42,
  },
});

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
      <div >

  
    <div className={classes.root}>
     
      <Grid container spacing={4} alignItems="center">
        <Grid item>
        
        </Grid>
        <Grid item xs > 
          <Slider
          
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
     
      </div>
      <h2  className={Styles.distance}>
        Distance
      </h2>
      <button  className={Styles.continue} onClick={props.close}>
        Set Location
      </button>
    </div>
  );
}

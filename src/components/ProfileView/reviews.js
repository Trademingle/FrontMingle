import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import SimpleMenu from "./dropDown";
import styles from "./profile.module.css";
import api from '../api/api';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth:600,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const [profiles, setProfiles] = useState({languageList:[]});
    var profileID = {};
    profileID['id'] = props.clientId;
    const getClientProfiles = () => {
        api.getClientProfiles(profileID).then(res => {
            console.log("Profile loaded successfully");
            console.log(res);
            setProfiles(res.data);
        }).catch(err => console.log(err))
    }
  useEffect(() => {
      getClientProfiles();
    },[]);
  const VertMenu = (props) =>{
      return(
        <SimpleMenu id={props.id} clientId={props.clientId}/>
      );
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar src={profiles.downloadurl} style={{marginTop:0}}/>
        }
        action={
            <VertMenu id={props.id} clientId={props.clientId}/>
        }        
        title={
        <p style={{fontWeight:'bold', fontSize:'16px', marginBottom:'0px'}}>
          {props.title}
        </p>}
        subheader={<p style={{marginTop:'0px'}}>{props.subheader}</p>}
      /> 
      <div className={styles.cardcontent}>
        <p style={{fontWeight:'bold', fontSize:'15px', marginBottom:'5px', color:'#555555'}}>{props.reviewTitle}</p>
        <Rating name="read-only" value={props.reviewRating} readOnly size="small"/>
        <Typography variant="body2" component="p">{props.body}</Typography>
      </div>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

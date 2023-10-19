import React from 'react';
import styles from './profile.module.css';
import MessageButton from '../ResuableComponents/messageButton';
import { useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function ProfileFormat (props) {
    const history = useHistory();
    const handleOnClick = (event) => {
        event.preventDefault();
        history.goBack()
    }
    return(
        <div className={styles.profileBoxInside}>
            <ArrowBackIcon  style={{height:25, cursor:"pointer", position:'absolute', zIndex:'2'}} onClick={handleOnClick}/>
            <h1 className={styles.header}>{props.name}</h1>
            <img src={props.avatar} className={styles.circle} style={{height:150,width:150}} alt=""/>
            <div className={styles.message}><MessageButton name={props.name} contractorId={props.contractorId}/></div>
        </div>
    )
};


export default ProfileFormat;
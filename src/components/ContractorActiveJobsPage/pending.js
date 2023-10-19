import React from 'react';
import styles from './styles.module.css';
import JobPosting from './jobpostingPending';
import AcceptButton from '../ResuableComponents/acceptButton';
import DeclineButton from '../ResuableComponents/declineButton';

function PendingJobs(props)  {    
    return (
        <div>
            <JobPosting id={props.id} avatar={props.avatar} title={props.title} name={props.name} location={props.location} serviceList={props.serviceList} />
            <box className={styles.adbox}>
                <DeclineButton id={props.id} onAction={props.onAction} style={{height:'30px', width:'80px'}}/>
                <AcceptButton id={props.id} onAction={props.onAction} style={{height:'30px', width:'100px'}} />
            </box>
        </div>
    )
};

export default PendingJobs;
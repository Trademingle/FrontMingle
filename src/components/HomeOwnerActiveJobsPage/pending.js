import React from 'react';
import styles from './styles.module.css';
import JobPosting from './jobpostingUnassigned';

function PendingJobs(props)  {
    return (
        <div>
            <JobPosting id={props.id} avatar={props.avatar} title={props.title} name={props.name} location={props.location} serviceList={props.serviceList} />
        </div>
    )
};

export default PendingJobs;
export {PendingJobs} 
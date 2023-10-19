import React, { useEffect, useState } from 'react';
import api from '../api/api';
import styles from './invoice.module.css';
import { Grid } from '@material-ui/core';

function InvoiceHeader(props){
    const [singleCompletedJob, setSingleCompletedJob] = useState({downloadurl:[],serviceTypeList:[]});
    var jobId= {};
    jobId['id'] = props.id;
    const getSingleCompletedJob = () => {
        api.getSingleCompletedJob(jobId).then(res => {
            console.log("Job loaded successfully");
            console.log(res);
            setSingleCompletedJob(res.data); 
        }).catch(err => console.log(err))
        }
    useEffect(() => {
        getSingleCompletedJob();
      },[]);
    let clientName = singleCompletedJob.clientFirstName +" "+ singleCompletedJob.clientLastName
    let contractorName = singleCompletedJob.contractorFirstName +" "+ singleCompletedJob.contractorLastName
    let locationDetail = singleCompletedJob.locationDetail
    return(
        <div className={styles.invoiceHeader}>
            <Grid container spacing={2} justify="left" wrap="wrap">
                <Grid item xs={2}>
                    <p style={{fontSize:'3vw', fontWeight:'500', marginTop:'0', color:'#555555'}}>INVOICE</p>
                </Grid>
                <Grid item xs={2}>
                    <Grid container alignItems='left' spacing={2} direction="column">
                        <Grid item><label>Date Issued:</label></Grid>  
                        <Grid item><input className={styles.formcontrol} disabled value={props.date} id="example-date-input" onChange={(e)=>props.handleChange(e , "date")}/></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container alignItems='left' spacing={2} direction="column">
                        <Grid item><label >Bill To:</label></Grid>  
                        <Grid item><textarea disabled className={styles.formcontrol} id="exampleTextarea" rows="3" data-gramm="true" spellcheck="false" data-gramm_editor="true" 
                        placeholder={clientName + "\n#### Street name \nCity, Province, Postal Code"}
                        value={props.billInfo} onChange={(e)=>props.handleChange(e , "bill")}></textarea> </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container alignItems='left' spacing={2} direction="column">
                        <Grid item><label >Bill From:</label></Grid>  
                        <Grid item><textarea disabled className={styles.formcontrol} id="exampleTextarea" rows="3" data-gramm="true" spellcheck="false" data-gramm_editor="true" 
                        placeholder={contractorName+"\n#### Street name \nCity, Province, Postal Code"}
                        value={props.billInfoFrom} onChange={(e)=>props.handleChange(e , "billFrom")}></textarea></Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div >
                <form >
                    {/* <label >INVOICE</label> */}
                    {/* <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">#</div>
                        </div>
                        <input type="text" className="form-control" id="inlineFormInputGroup" value={props.invoiceNo} placeholder="Invoice Number" onChange={(e)=>props.handleChange(e , "invoice")} />
                    </div> */}
                    {/* <label>Due Date</label> */}
                        {/* <input className="form-control" type="date" value={props.dateDue} id="example-date-input" onChange={(e)=>props.handleChange(e , "dateDue")}/>    */}
                </form>
            </div>
        </div>
    )
}
export default InvoiceHeader;
import React from 'react';
import styles from './invoice.module.css';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';

function AddMoreInvoice(props){
    return(
        <Grid container spacing={2} justify="left" wrap="wrap">
        <Grid item xs={3}>
            <Grid container alignItems='left' spacing={2} direction="column">
                <Grid item><label for="">Item Name</label></Grid>
                <Grid item><input className={styles.formcontrol} type="text" value={props.item.description} onChange={(e)=>{
                    props.onChangeHandler(e, props.ind, "name")
                }} /></Grid>
            </Grid></Grid>
        <Grid item xs={3}>       
            <Grid container alignItems='left' spacing={2} direction="column">
                <Grid item><label for="">Quantity</label></Grid>
                <Grid item><input className={styles.formcontrol} type="text" value={props.item.quantity}  onChange={(e)=>{
                    props.onChangeHandler(e, props.ind, "Quan")
                }}/>                    </Grid>
            </Grid></Grid>
        <Grid item xs={3}>    
            <Grid container alignItems='left' spacing={2} direction="column">
                <Grid item><label for="">Rate</label></Grid>
                <Grid item><input className={styles.formcontrol} type="text" value={props.item.price} onChange={(e)=>{
                    props.onChangeHandler(e, props.ind, "Rate")
                }} />       </Grid>             
            </Grid></Grid>
        <Grid item xs={2}>    
            <Grid container alignItems='left' spacing={2} direction="column">
                <Grid item><label for="" >Amount</label></Grid>
                <Grid item><input className={styles.formcontrol} type="text" value={props.item.quantity * props.item.price }  /> </Grid>                   
            </Grid></Grid>
        <Grid item xs={1}>    
            <Grid container alignItems='left' spacing={2} direction="column">
                <Grid item><label for="" >Delete</label></Grid>
                <Grid item><DeleteIcon className={styles.btn3} onClick={(e)=>{props.del(props.ind)}} style={{width:'30px', height:'28px'}}/></Grid>                  
            </Grid></Grid>
        </Grid>
    )
}
export default AddMoreInvoice;
import React from 'react';
import AddMoreInvoice from'./AddMoreInvoice';
import styles from './invoice.module.css';

function InvoiceDetails(props){
    return(        
        <div className={styles.card}>
            <h5 className={styles.cardHeader}>INVOICE DETAILS</h5>
          <div className={styles.cardBody}>
            <form >
                {
                     props.items.map(
                        (item ,index)=>{
                            return <AddMoreInvoice  item={item} ind={index} del={props.del} onChangeHandler={props.onChangeHandler}/>
                        }
                    )
                }                
            </form>
            <div className={styles.btn} style={{float:'left', marginRight:'8.333333%'}} onClick={props.event}>Add new row</div>
          </div>
          <div className={styles.row}>
          <div className={styles.colsm12}>
          <div className={styles.btn2} onClick={props.pdf} style={{ margin:'20px auto', display:'block'}}> Send and Download Invoice</div>
          </div>
          </div>
    </div>
    );
}
export default InvoiceDetails;
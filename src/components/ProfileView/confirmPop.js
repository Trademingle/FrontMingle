import React from 'react';
import api from '../api/api';
import Button from '@material-ui/core/Button';
import styles from '../ContractorActiveJobsPage/styles.module.css'; 
import { withStyles} from '@material-ui/core/styles';
import swal from 'sweetalert';

const CompleteButton = withStyles((theme) => ({
  root: {
    borderRadius:44,
    backgroundColor: '#2B64D2',
    '&:hover': {
      backgroundColor: '#003ba0',
    },
    marginLeft: 30,
  },
}))(Button);

const BackButton = withStyles((theme) => ({
  root: {
    borderRadius:44,
    backgroundColor: 'white',
    border: '1px dotted',
    marginLeft: 80, 
  },
}))(Button);

export default function DeletePop(props) {
  let data={}
  data.id= props.id
  const handleDelete = () => {
    api.deleteReview(data).then(res => {
        console.log("Review Deleted successfully");
        window.location.reload(false);
        swal({
          title: "Success!",
          text: "Review has been successfully deleted!",
          icon: "success",
          button: "OK",
        });
    }).catch(err => console.log(err))

  }
    return(
    <box className={styles.activePop}>
        <p className={styles.byMarking}>Are you sure you want to delete this job?</p>
          <BackButton className={styles.back} onClick={props.close}> 
            No
          </BackButton>
          <CompleteButton className={styles.complete} onClick={handleDelete} > 
            <p className={styles.completeText}>Yes</p>
          </CompleteButton>
        </box>
  );
}

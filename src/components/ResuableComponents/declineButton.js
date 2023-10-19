import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from '../api/api';
import swal from 'sweetalert';

const DeclineButtonDesign = withStyles((theme) => ({
root: {
    borderRadius:44,
    backgroundColor: 'white',
    '&:hover': {
    transition: '200ms',
    backgroundColor: 'white',
    border: '2px solid #2B64D2',
    },
    border: '1px dotted',
    marginLeft: -10, 
},
}))(Button);

const DeclineButton = (props)=>{
    let userId={}
    userId.id=props.id
    const handleOnDecline = () => {
        api.rejectUnassignedJobs(userId).then(res => {
            swal({
                title: "Declined!",
                text: "Job request has been successfully Declined!",
                icon: "success",
                button: "OK",
              });            
              props.onAction()
        }).catch(err => console.log(err))
    };
    return(
      <DeclineButtonDesign style={{height:'30px', width:'100px',}} onClick={()=>
        swal({
            title: "Are you sure to decline the task?",
            text: "This action can not be undone!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
              handleOnDecline()
            } else {swal.close()}
          })
    }>
        Decline
    </DeclineButtonDesign>
    )
}

export default DeclineButton;
import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from '../api/api';
import swal from 'sweetalert';
import CheckIcon from '@material-ui/icons/Check';

const AcceptButtonDesign = withStyles((theme) => ({
    root: {
      borderRadius:44,
      backgroundColor: '#2B64D2',
      '&:hover': {
        backgroundColor: '#003ba0',
      },
      marginLeft: 10,
      color: 'white',
    },
}))(Button);

const AcceptButton = (props)=>{
  let userId={}
  userId.id=props.id
  const handleOnAccept = () => {
      api.accepUnassignedJobs(userId).then(res => {
          swal({
              title: "Accepted!",
              text: "Job request has been successfully Accepted!",
              icon: "success",
              button: "OK",
            });
          props.onAction()
      }).catch(err => console.log(err))
    };
  return(
    <AcceptButtonDesign style={{height:'30px', width:'100px',}} onClick={()=>
      swal({
          title: "Are you sure to Accept the task?",
          text: "This action can not be undone!",
          icon: "warning",
          buttons: true,
          dangerMode: false,
      }).then((willDelete) => {
          if (willDelete) {
            handleOnAccept()
          } else {swal.close()}
        })
  }>
      <CheckIcon style={{height:20,width:20}}/> Accept
  </AcceptButtonDesign>
  )
}

export default AcceptButton;
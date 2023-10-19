import React from 'react';
import api from '../api/api';
import swal from 'sweetalert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {useHistory} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

export default function CompleteButton(props) {
    const history = useHistory();
    var jobId ={};
    jobId["id"] = props.id
    const handleClick=()=> {
        api.moveActiveToComplete(jobId).then(
            swal({
                text: "Done!",
                icon: "success",
                buttons: true,
            }).then((success) => {
                if (success) {
                    history.push({
                        pathname: '/homeowneractivejobs/done',
                    })
                } else {swal.close()}
            })
        )
    }
    const FilledButton = ()=>{
        return(
        <div>
            {localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor' 
            ?<CheckCircleOutlineIcon style={{fontSize:32, position: 'relative', color: '#22C029', cursor: 'pointer'}} onClick={()=>
                swal({
                    text: "Only Clients can mark a job as complete. Please contact client to mark it as complete.",
                    icon: "warning",
                    buttons: true,
            })}/>
            : localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Client'
            ?<CheckCircleOutlineIcon style={{fontSize:32, position: 'relative', color: '#22C029', cursor: 'pointer'}} onClick={()=>
                swal({
                    title: "Are you sure?",
                    text: "By marking this as complete, you agree to the terms and conditions of your contract with the homeowner.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                }).then((willDelete) => {
                    if (willDelete) {
                        handleClick()
                    } else {swal.close()}
                })
            }/>
            :null
            }
        </div>)
    }
    const FilledText = ()=>{
        return(
        <div>
            {localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Contractor' 
            ?<MenuItem onClick={()=>
                swal({
                    text: "Only Clients can mark a job as complete. Please contact client to mark it as complete.",
                    icon: "warning",
                    buttons: true,
            })}>Mark as Complete</MenuItem>
            : localStorage.getItem('access-token') && localStorage.getItem('usertype') === 'Client'
            ?<MenuItem onClick={()=>
                swal({
                    title: "Are you sure?",
                    text: "By marking this as complete, you agree to the terms and conditions of your contract with the homeowner.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                }).then((willDelete) => {
                    if (willDelete) {
                        handleClick()
                    } else {swal.close()}
                })
            }>Mark as Complete</MenuItem>
            :null
            }
        </div>)
    }
    return(
      <div>
          {props.complete === 0 ? <FilledButton/>:
          props.complete === 1 ? <CheckCircleIcon style={{fontSize:32, position: 'relative', color: '#22C029', cursor: 'pointer'}}/>:
          props.complete === 2? <FilledText/>:null
          }
      </div>
    );
  }
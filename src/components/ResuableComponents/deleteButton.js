import React from 'react';
import api from '../api/api';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';

export default function CompleteButton(props) {
    var jobId ={};
    jobId["id"] = props.id
    let data={}
    data.id= props.id
    const history = useHistory();
    const handleDelete = () => {
        api.deleteSingleActiveJob(data).then(
            swal({
                text: "Done!",
                icon: "success",
                buttons: true,
            }).then((success) => {
                if (success) {
                    history.push({
                        pathname: '/homeowneractivejobs/active',
                    })
                } else {swal.close()}
            })
        )
    }
    const handleDeleteDone = () => {
        api.deleteSingleCompletedJob(data).then(
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
    const handleDeleteUnassigned = () => {
        api.deleteJob(data).then(
            swal({
                text: "Done!",
                icon: "success",
                buttons: true,
            }).then((success) => {
                if (success) {
                    history.push({
                        pathname: '/homeowneractivejobs/unassigned',
                    })
                } else {swal.close()}
            })
        )
    }
    return(
        <MenuItem onClick={()=>
            swal({
                title: "Are you sure you want to delete this job?",
                text: "This action can not be undone!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete && props.page === 'active') {handleDelete()}
                else if (willDelete && props.page === 'complete') {handleDeleteDone()}
                else if (willDelete && props.page === 'unassign') {handleDeleteUnassigned()}
                else {swal.close()}
            })
        }>Delete</MenuItem>
    );
  }
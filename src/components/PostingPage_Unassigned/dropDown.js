import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../PostingPage/posting.module.css'; 
import Popup from "reactjs-popup";
import swal from "sweetalert";
import api from "../api/api";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Hook from "../MyProfile/searchHooks";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import GoogleMaps from '../LocationTextField';
import DeleteButton from '../ResuableComponents/deleteButton';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <MoreVertIcon
          style={{ color: "#555555", fontSize: 36}}
          className={styles.verticon}
          onClick={handleClick}
          alt="More"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >        
        <Popup trigger={<MenuItem>Edit</MenuItem>} 
          modal contentStyle={contentStyle2} onClose={handleClose}>
            {close =><EditJob props={props} close={close}/>}
        </Popup>
        {localStorage.getItem('usertype') === 'Client'
        ?<DeleteButton id={props.id} page="unassign"/>:null}
      </Menu>
    </div>
  );
}

const contentStyle2 = {
  width: '702px',
  height: 'auto',
  background: '#fffFFF',
  borderRadius: '16px', 
};
const CompleteButton = withStyles((theme) => ({
  root: {
    borderRadius: 44,
    backgroundColor: "#2B64D2",
    "&:hover": {
      backgroundColor: "#003ba0",
    },
    marginLeft: 30,
  },
}))(Button);

const BackButton = withStyles((theme) => ({
  root: {
    borderRadius: 44,
    backgroundColor: "white",
    border: "1px dotted",
    marginLeft: 80,
  },
}))(Button);

function EditJob(props) {
  let [data, setData] = useState({});
  data.id = props.props.id;
  data.locationDetail = data.address;
  // data.imageListStoreRef=[]
  const handleSubmit = () => {
    api
      .editJob(data)
      .then((res) => {
        console.log(res);
        props.onChange();
        swal({
          title: "Updated!",
          text: "Job has been successfully updated!",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => console.log(err));
    props.close();
    window.location.reload(false);
  };
  const keyPressed = (event) => {
    if (event.target.id === "title" && event.target.value !== data.title) {
      data.title = event.target.value;
    } 
    else if (event.target.id === "locationDetail" && event.target.value !== data.locationDetail) {
      data.locationDetail = event.target.value;
    } 
    else if (event.target.id === "jobDetails" && event.target.value !== data.jobDetails) {
      data.jobDetails = event.target.value;
    }
  };

  return (
    <box className={styles.box}>
      <CloseOutlinedIcon
        style={{ height: 40, width: 40 }}
        className={styles.cross}
        onClick={props.close}
      />
      <h1 className={styles.editProfile}>Edit Job</h1>
      {/* <UploadButton urls={data.imageListStoreRef}/> */}
      <form className={styles.editfName} noValidate autoComplete="off">
          <p>Job Title:</p>
          <TextField style={{width:500}} id="title" onKeyUp={keyPressed} variant="outlined" defaultValue={props.props.jobTitle}/>
      </form>
      <form className={styles.editfName} noValidate autoComplete="off">
          <p>Location:</p>
          <GoogleMaps style={{width:500}} information={data} setLocation={setData} defaultValue={props.props.location} width="500px"/>
      </form>
      <div className={styles.editfName}>
        <p>Skills:</p>
        <Hook information={data} type="serviceTypeList" selected={props.props.services}/>
      </div>
      <div className={styles.editfName}>
        <p>Languages:</p>
        <Hook information={data} type="languageList" selected={props.props.languages}/>
      </div>
      <div className={styles.editfName}>
        <p>Description:</p>
        <textarea
          value={data.jobDetails}
          id="jobDetails"
          style={{ marginLeft: 90 }}
          onKeyUp={keyPressed}
          className={styles.nameinput}
          style={{height:100, width:500}}
          placeholder="Type your description here.."
          defaultValue={props.props.jobDetails}
        ></textarea>
      </div>
      <div className={styles.buttons}>
        <BackButton className={styles.back} onClick={props.close}>
          Cancel
        </BackButton>
        <CompleteButton className={styles.complete} onClick={handleSubmit}>
          <p className={styles.completeText}>Save</p>
        </CompleteButton>
      </div>
    </box>
  );
}

import React, { useState } from 'react';
// import { Link, withRouter, Route, useHistory} from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';
import styles from './landing.module.css'; 
import SearchIcon from '@material-ui/icons/Search'; 
// import RoomIcon from '@material-ui/icons/Room';
import { useHistory } from "react-router-dom";
// import Maps from '../Maps/index';
// import Popup from "reactjs-popup";
import GoogleMaps from '../LocationTextField';
// import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import CustomizedHook from "../PostingPage/search";
// import SearchResults from "../SearchResults/index";
// import Button from '@material-ui/core/Button';
import CustomizedHook from "./search";

//function that routes to map
// const Button = withRouter(({ history }) => (
//     <button
//     className={styles.locationButton}
//       type='button'
//       onClick={() => { history.push('/maps') }}
//     >
      
//     </button>
//   ))
 
const SearchBar = (props) => {
    const history = useHistory();
    const handleOnSubmit = (event) => {
        event.preventDefault();
        // information = {...information, ...Location};
        if(!("services" in information)){
            information['services'] = ["Electrical"]
        }
        if(!("languages" in information)){
            information['languages'] = ["English"]
        }
        information['type'] = props.type
        history.push('/SearchResults/', information);
    };
    let [information, setInformation] = useState({}); //{"services":[], "languages":[], }
    // let [Location, setLocation] = useState({}); 
    return (
    <form className={styles.rectangle}>
        <div className={styles.box1}>
            <h3 className={styles.typeofwork}>TYPE OF WORK</h3>
            <CustomizedHook information={information} setInformation={setInformation} type='services'  placeholder='What is your project?'/> 
        </div>

        <div className={styles.box1}>
            <hr className={styles.hr1}/>
            <h3 className={styles.location}>LOCATION</h3>
            <GoogleMaps width="auto" information={information} setLocation={setInformation}/>
            {/* <input className={styles.textbox2} type='text' disabled placeholder='Click location icon here' />  */}
            {/* <Button/> */}
            {/* <div className={styles.style}> */}
            
            {/* <CloseOutlinedIcon style={{ height: 40, width: 40,}} className={styles.cross} /> */}

            {/* <Popup trigger={<RoomIcon style={{fontSize:40}} className={styles.locationButton}/>} 
                modal contentStyle={contentStyle}>
                 {close => <Maps location={Location} setlocation={setLocation} close={close} /> }
            </Popup>
            </div> */}
           
        </div>


        <div className={styles.box1}>
            <hr className={styles.hr1}/>
            <h3 className={styles.language}>LANGUAGE</h3>
            <CustomizedHook information={information} setInformation={setInformation} type='languages' placeholder='Which language do you prefer?'/> 
        </div>

        <div className={styles.box4}>
            <button className={styles.searchbutton}  onClick={handleOnSubmit} >
                <SearchIcon className={styles.searchicon}/><p className={styles.searchtext}>Search</p>
            </button>
        </div>
    </form>
    );
}

// const contentStyle = {
//     width: '800px',
//     height: '600px',
//     background: 'grey',
//     borderRadius: '1px',
//     // zIndex: '-1',
    
// };

export default SearchBar;

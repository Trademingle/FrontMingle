import React from 'react';
import PersistentDrawerLeft from "../PostingPage/sideBar";
import ActiveBody from './body';

function Posting(props){
    return(
    <div>
        <PersistentDrawerLeft insidePage={ActiveBody(props)}/>
    </div>
)}

export default Posting;
import React from 'react';
import PersistentDrawerLeft from "./sideBar";
import ClientReview from './body';

function Posting(props){
    return(
    <div>
        <PersistentDrawerLeft insidePage={ClientReview(props)}/>
    </div>
)}

export default Posting;
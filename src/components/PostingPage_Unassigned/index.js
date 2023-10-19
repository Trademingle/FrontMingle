import React from 'react';
import Posting from "./bodyandside";

export default function ActivePosting(props){
    // debugger
    return(
        <div>
            <Posting id={props.match.params.unassignedId}/>
        </div>
    )
}
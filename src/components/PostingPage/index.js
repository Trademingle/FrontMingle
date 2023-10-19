import React from 'react';
import Posting from "./bodyandside";

export default function postingPage(props){
    return(
        <div>
            <Posting id={props.match.params.postingId}/>
        </div>
    )
}
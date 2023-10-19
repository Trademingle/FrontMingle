import React from 'react';
import PersistentDrawerLeft from "./sideBar";

export default function SearchResults(props) {
    return(
    <div>
        <PersistentDrawerLeft searchTerms={props.location.state} />
    </div>
)}
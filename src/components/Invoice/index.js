import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default function Invoice(props) {
    return (
      <div>
        <App id={props.match.params.id}/>
      </div>
    );
}
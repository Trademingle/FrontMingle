import React from 'react';
import './Compose.css';

export default function Compose(props) {
  const keyPressed = (event) => {
    if (event.key === 'Enter'){
      props.onEnter(event.target.value);
      event.target.value='';
    }
  }
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message..."
          onKeyUp={keyPressed}
        />

        {
          props.rightItems
        }
      </div>
    );
}
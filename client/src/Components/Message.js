import React from 'react';

export default function Message(props) {
  return (
    <div className="message">
        <li>
          <h2>{props.name} {props.lastname} | @{props.pseudo}</h2>
          <p>{props.content}</p>
        </li>
    </div>
  );
}

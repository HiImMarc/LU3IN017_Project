import React from 'react';
import Message from './Message';

export default function MessageList(props) {

  return (
    <div >
      <ul>
        {props.data.map((item, index)=> (
          <li key={index}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
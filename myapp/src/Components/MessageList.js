import React from 'react';
import Message from './Message';

export default function MessageList(props) {

  console.log(props.data)

  return (
    <div >
      <ul>
        {props.data.map((item, index)=> (
          <Message 
          key={index}
          userId={item.userId}
          id={item.id}
          title={item.title}
          content={item.body} 
          />
        ))}
      </ul>
    </div>
  );
}
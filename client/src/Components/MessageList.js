import React from 'react';
import Message from './Message';

export default function MessageList(props) {

  const messages = props.data

  return (
    <div className='messagelist'>
      {props.isConnected ? 
      (<ul>
        {messages.map((item, index)=> (
          <Message 
          key={index}
          msgid={item._id.toString()}
          authorid={item.authorid}
          userid={props.userid}
          name={item.name}
          lastname={item.lastname}
          pseudo={item.pseudo}
          content={item.content} 
          likes={item.likes}
          comments={item.comments}
          />
        ))}
      </ul>)
      :
      (<div> Please connect to see messages </div>)
      }

    </div>
  );
}
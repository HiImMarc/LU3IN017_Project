import React from 'react';

export default function Message({ message }) {
  return (
    <div className="message">
      <div className="message-header">
        <img src={message.user.avatarUrl} alt={message.user.name} />
        <h4>{message.user.name}</h4>
        <small>{message.timestamp}</small>
      </div>
      <div className="message-body">
        <p>{message.text}</p>
      </div>
    </div>
  );
}

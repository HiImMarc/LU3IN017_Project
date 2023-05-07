import React from 'react';
import Message from './Message';
import './MessageList.css'

export default function MessageList(props) {

	const messages = props.data.reverse() // reverse() pour avoir les msg du plus récent au plus ancien
	console.log("messages dans MessageList : ", messages)

	return (
		<div className='messagelist'>
			{messages.map((item, index) => (
				<Message
					key={index}
					msgid={item._id.toString()}
					authorid={item.authorid}
					authorPseudo={item.pseudo}
					userid={props.userid}
					name={item.name}
					lastname={item.lastname}
					pseudo={props.pseudo}
					content={item.content}
					likes={item.likes}
					comments={item.comments}
					friends={props.friends}
					date={item.date}
					data={props.data}
				/>
			))}
		</div>
	);
}
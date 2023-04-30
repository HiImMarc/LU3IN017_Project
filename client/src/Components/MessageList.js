import React from 'react';
import Message from './Message';

export default function MessageList(props) {

	const messages = props.data
	console.log("messages dans MessageList : ", messages)

	return (
		<div className='messagelist'>

			(<ul>
				{messages.map((item, index) => (
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
						friends={props.friends}
						date={item.date}
						data={props.data}
					/>
				))}
			</ul>)


		</div>
	);
}
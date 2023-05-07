import React from 'react'
import './ProfileMessage.css'

export default function ProfileMessage(props) {
	const date = new Date(props.date);
	const time = date.toLocaleString('fr-FR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	});
    return (
        <div className='profilemessage'>
            <h2>{time} : </h2>
            <p className='profiletexte'>{props.content}</p>
        </div>
    )
}

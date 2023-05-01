import React from 'react'

function Comment(props) {
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
        <div className='comment'>
            <h2>{props.pseudo} le {time} </h2>
            <div>{props.content}</div>
        </div>
    )
}

export default Comment
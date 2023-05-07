import React from 'react'
import './Comment.css'

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
			<button className="close" onClick={props.closeCommentsList}>
                &times;
            </button>
			<div className='titre'>Commentaires</div>
            <h2>{props.pseudo} le {time} </h2>
            <div className='commentaire'>{props.content}</div>
        </div>
    )
}

export default Comment
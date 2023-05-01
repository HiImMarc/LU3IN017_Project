import React from 'react'

export default function ProfileMessage(props) {
    //console.log("BBBBBBBBBBB",props.date)
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
        <div>
            <h2>{time} : </h2>
            <p>{props.content}</p>
        </div>
    )
}

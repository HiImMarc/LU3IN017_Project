import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Message(props) {
	const [likecount, setlikecount] = useState(0);

	async function handleLike() {
		try {
			console.log("axios : ",props.userid,props.msgid)
			await axios.patch("http://localhost:8000/messages/like", {
				userid: props.userid,
				msgid: props.msgid

			})
			.then ( (res) => {
				console.log("res : ",res.data.message)
				console.log("like count : ", res.data.likeCount)
				setlikecount(res.data.likeCount)
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="message">
			<li>
				<h2>{props.name} {props.lastname} | @{props.pseudo}</h2>
				<p>{props.content}</p>
				<br />
				<button type='submit' onClick={handleLike}>J'aime</button><label>{likecount}</label>
			</li>
		</div>
	);
}

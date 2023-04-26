import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CommentForm from './CommentForm'
import Comment from './Comment';

export default function Message(props) {
	const [likecount, setlikecount] = useState(props.likes.length);

    const [showCommentForm, setShowCommentForm] = useState(false);
    function closeCommentForm() {
        setShowCommentForm(false)
    }
    function openCommentForm() {
        setShowCommentForm(true)
    }

	const [openComments, setOpenComments] = useState(false)
	function handleOpenComments() {
		setOpenComments(!openComments)
	}

	async function handleLike() {
		try {
			await axios.patch("http://localhost:8000/messages/like", {
				userid: props.userid,
				msgid: props.msgid

			})
			.then((res) => {
				setlikecount(res.data.likeCount)
			})
		} catch (err) {
			console.log(err)
		}
	}

	async function handleDeleteMessage() {
		try {
			await axios.delete("http://localhost:8000/messages/delete", {
				params: {
					msgid : props.msgid
				}
			})
			.then ((res) => {
				console.log("delete message success",res)
				window.location.reload(false)
			})
			.catch ((err)=> console.log(err))
		} catch (err) {
			console.log("dans le try catch",err)
		}
	}

	return (
		<div className="message">
			<li>
				<h2>{props.name} {props.lastname} | @{props.pseudo}
					{props.userid == props.authorid ? (
					<button onClick={handleDeleteMessage}>delete</button>	
					) 
					:
					<button>Follow this guy</button>}
				</h2>
				<p>{props.content}</p>
				<br />
				<button type='submit' onClick={handleLike}>J'aime</button><label>{likecount}</label>
				<br/>
				<button onClick={openCommentForm}>ecrire un commentaire</button>
				<CommentForm showCommentForm={showCommentForm} closeCommentForm={closeCommentForm} openCommentForm={openCommentForm} msgid={props.msgid}
				userid={props.userid} lastname={props.lastname} name={props.name} pseudo={props.pseudo}/>
				<br/>
				<div className='comment-dropdown'>
					<button onClick={handleOpenComments}>commentaires</button>
					{ openComments ? 
					(props.comments.map((item, index)=> (
						<Comment 
						key={index}
						authorid={item.authorid}
						userid={props.userid}
						name={item.name}
						lastname={item.lastname}
						pseudo={item.pseudo}
						content={item.content} 
						/>
					  )))
					:
					<></>}
				</div>
			</li>
		</div>
	);
}

import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CommentForm from './CommentForm'
import Comment from './Comment';
import PopupProfile from './PopupProfile';
import './Message.css'

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'


export default function Message(props) {
	const [likecount, setlikecount] = useState(props.likes.length);

	const likes = props.likes
	const didLike = likes.includes(props.userid)
	const [likestate, setLikeState] = useState(didLike)



	const [showCommentForm, setShowCommentForm] = useState(false);
	function closeCommentForm() {
		setShowCommentForm(false)
	}
	function openCommentForm() {
		setShowCommentForm(true)
	}

	const [openComments, setOpenComments] = useState(false)
	function openCommentsList() {
		setOpenComments(true)
	}
	function closeCommentsList(){
		setOpenComments(false)
	}

	const [showPopupProfile, setShowPopupProfile] = useState(false);
	function closePopupProfile() {
		setShowPopupProfile(false)
	}
	function openPopupProfile() {
		setShowPopupProfile(true)
	}


	async function handleLike() {
		try {
			await axios.patch("http://localhost:8000/messages/like", {
				userid: props.userid,
				msgid: props.msgid

			})
				.then((res) => {
					setlikecount(res.data.likeCount)
					likestate ? setLikeState(false) : setLikeState(true)
				})
		} catch (err) {
			console.log(err)
		}
	}

	async function handleDeleteMessage() {
		try {
			await axios.delete("http://localhost:8000/messages/delete", {
				params: {
					msgid: props.msgid
				}
			})
				.then((res) => {
					console.log("delete message success", res)
					window.location.reload(false)
				})
				.catch((err) => console.log(err))
		} catch (err) {
			console.log("dans le try catch", err)
		}
	}

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
		<div className="message">
			<h2>{props.name} {props.lastname} | @{props.authorPseudo} | {time}
				{props.userid == props.authorid ? (
					<button className='profil-button' title='Supprimer le message' onClick={handleDeleteMessage}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				)
					:
					<button className='profil-button' title='Voir le profil' onClick={openPopupProfile}>
						<FontAwesomeIcon icon={faAddressCard} />	
					</button>}
					<PopupProfile showPopupProfile={showPopupProfile} closePopupProfile={closePopupProfile} userid={props.userid} date={time} authorPseudo={props.authorPseudo}
					name={props.name} lastname={props.lastname} pseudo={props.pseudo} authorid={props.authorid} friends={props.friends} data={props.data}/>
			</h2>
			<div className='texte'>{props.content}</div>
			<div className='reactions'>
				<button type='submit' onClick={handleLike}>
					<label>{likecount}</label>
					<FontAwesomeIcon icon={faHeart}  />
					{likestate ? <p>A aimé</p> : <p>J'aime</p>}
				</button> |
				<button onClick={openCommentForm}>
					<FontAwesomeIcon icon={faPenToSquare} />
					<p>Commenter</p>
				</button> |
				<CommentForm showCommentForm={showCommentForm} closeCommentForm={closeCommentForm} openCommentForm={openCommentForm} msgid={props.msgid}
					userid={props.userid} lastname={props.lastname} name={props.name} pseudo={props.pseudo} />
				<button onClick={openCommentsList}>
					<FontAwesomeIcon icon={faComments} />
					<p>Commentaires</p>
				</button>
				{openComments ?
						(props.comments.map((item, index) => (
							<Comment
								key={index}
								authorid={item.authorid}
								userid={props.userid}
								name={item.name}
								lastname={item.lastname}
								pseudo={item.pseudo}
								content={item.content}
								date={item.date}
								closeCommentsList={closeCommentsList}
							/>
						)))
					:
					<></>}
			</div>
		</div>
	);
}

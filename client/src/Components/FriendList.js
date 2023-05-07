import React, { useEffect } from 'react'
import './FriendList.css'
import { useState } from 'react'
import axios from 'axios'
import PopupFriendProfile from './PopupFriendProfile'

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function FriendList(props) {

	const [friendrequests, setfriendrequests] = useState([])
	useEffect(() => {
		getFriendRequests()
	}, [])

	const [showPopupProfile, setShowPopupProfile] = useState(false);
	function closePopupProfile() {
		setShowPopupProfile(false)
	}
	function openPopupProfile() {
		setShowPopupProfile(true)
	}


	async function getFriendRequests() {
		try {
			await axios.get("http://localhost:8000/friends/getTo", {
				params: {
					userid: props.userid
				}
			})
				.then((res) => {
					setfriendrequests(res.data)
				})
		} catch (error) {
			console.log(error)
		}
	}

	async function handleFriendRequest(bool, request) {
		try {
			await axios.delete("http://localhost:8000/friends/invitation/response", {
				params: {
					accept: bool,
					request: request
				}
			})
				.then(() => {
					getFriendRequests()
				})
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteFriend(friendid) {
		try {
			await axios.delete("http://localhost:8000/friends/delete", {
				params: {
					userid: props.userid,
					friendid: friendid
				}
			})
			window.location.reload(false)
		} catch (e) {
			console.error(e)
		}
	}

	console.log("friends requests : ", friendrequests)

	return (
		<div className='FriendListMain'>
			<div className='FriendRequests'>
				<h2>Mes demandes amis : </h2>
				{friendrequests.length > 0 ? friendrequests.map(request => (
					<div className='requests' key={request._id}>
						<li > {request.fromPseudo} veut être ton ami :{`\)`}</li>
						<button title='Accepter la demande' className='accept profil-button' onClick={() => handleFriendRequest(true, request)}><FontAwesomeIcon icon={faCircleCheck} /></button>
						<button title='Refuser la demande' className='refuse profil-button' onClick={() => handleFriendRequest(false, request)}><FontAwesomeIcon icon={faCircleXmark} /></button>
					</div>
				))
					:
					<></>}
			</div>
			<div className='FriendList'>
				<h2>Mes amis : </h2>
				{props.friends.map(friend => (
					<div className='friends' key={friend.id}>
						<li>{friend.pseudo} | {friend.firstname} {friend.lastname}</li>
						<button title='Voir profil' className='profil-button' onClick={openPopupProfile}><FontAwesomeIcon icon={faAddressCard} /></button>
						<PopupFriendProfile showPopupProfile={showPopupProfile} closePopupProfile={closePopupProfile} userid={props.userid} 
						authorid={props.authorid} friends={props.friends} data={props.data} pseudo={friend.pseudo} firstname={friend.firstname} lastname={friend.lastname}/>
						<button title='Retirer de mes amis' className='profil-button' onClick={() => deleteFriend(friend.id)}><FontAwesomeIcon icon={faUserMinus} /></button>
					</div>
				))}
			</div>Z
		</div>
	)
}

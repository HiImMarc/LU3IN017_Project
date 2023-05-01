import React, { useEffect } from 'react'
import './FriendList.css'
import { useState } from 'react'
import axios from 'axios'
import PopupFriendProfile from './PopupFriendProfile'

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
					props.getFriends()
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
		} catch (e) {
			console.error(e)
		}
	}

	console.log("friends requests : ", friendrequests)

	return (
		<div className='FriendListMain'>
			<div className='FriendRequests'>
				<h2>Friend Requests : </h2>
				<ul>
					{friendrequests.length > 0 ? friendrequests.map(request => (
						<div className='requests' key={request._id}>
							<li > {request.fromPseudo} veut être ton ami :{`\)`}</li>
							<button onClick={() => handleFriendRequest(true, request)}>Accepter</button>
							<br />
							<button onClick={() => handleFriendRequest(false, request)}>Refuser</button>
						</div>
					))
						:
						<></>}
				</ul>
			</div>
			<div className='FriendList'>
				<h2>Friend List : </h2>
				<ul>
					{props.friends.map(friend => (
						<div className='friends'>
							<li>{friend.pseudo} | {friend.firstname} {friend.lastname}</li>
							<button onClick={openPopupProfile}>Voir Profil</button>
							<PopupFriendProfile showPopupProfile={showPopupProfile} closePopupProfile={closePopupProfile} userid={props.userid} 
							authorid={props.authorid} friends={props.friends} data={props.data} pseudo={friend.pseudo} firstname={friend.firstname} lastname={friend.lastname}/>
							<button onClick={() => deleteFriend()}>Retirer ami</button>
						</div>
					))}
				</ul>
			</div>
		</div>
	)
}

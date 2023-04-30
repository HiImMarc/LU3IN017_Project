import React, { useEffect } from 'react'
import './FriendList.css'
import { useState } from 'react'
import axios from 'axios'

export default function FriendList(props) {

	const [friendrequests, setfriendrequests] = useState([])
	const [friends, setFriends] = useState([])
	useEffect(() => {
		getFriends()
		getFriendRequests()
	}, [])

	async function getFriends() {
		try {
			await axios.get("http://localhost:8000/friends/get", {
				params: {
					userid: props.userid
				}
			})
				.then((res) => {
					setFriends(res.data)
				})
		} catch (error) {
			console.error(error)
		}
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
					getFriends()
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


	return (
		<div className='FriendListMain'>
			<div className='FriendRequests'>
				<h2>Friend Requests : </h2>
				<ul>
					{friendrequests.map(request => (
						<div className='requests'>
							<li key={request.from}> {request.from} wants to be your friend</li>
							<button onClick={() => handleFriendRequest(true, request)}>Accepter</button>
							<br />
							<button onClick={() => handleFriendRequest(false, request)}>Refuser</button>
						</div>
					))}
				</ul>
			</div>
			<div className='FriendList'>
				<h2>Friend List : </h2>
				<ul>
					{friends.map(friend => (
						<div className='friends'>
							<li>MON AMI : {friend}</li>
							<button onClick={() => deleteFriend()}>Retirer ami</button>
						</div>
					))}
				</ul>
				{/* Ajoutez ici la liste des amis acceptés */}
			</div>
		</div>
	)
}

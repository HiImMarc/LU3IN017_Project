import React, { useEffect } from 'react'
import './FriendList.css'
import { useState } from 'react'
import axios from 'axios'

export default function FriendList(props) {

	const [friendrequests, setfriendrequests] = useState([])

	async function getFriendRequests(){
		try {
			await axios.get("http://localhost:8000/friends/getTo", {
				params: {
					userid: props.userid
				}
			})
			.then ( (res) => {
				setfriendrequests(res.data)
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getFriendRequests()
	}, [])

	return (
		<div className='FriendListMain'>
			<div className='FriendRequests'>
				<h2>Friend Requests : </h2>
				<ul>
					{friendrequests.map(request => (
					<li key={request.from}>{request.from} wants to be your friend</li>
					))}
				</ul>
			</div>
			<div className='FriendList'>
				<h2>Friend List : </h2>
				{/* Ajoutez ici la liste des amis acceptés */}
			</div>
		</div>
	)
}

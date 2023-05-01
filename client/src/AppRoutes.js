import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage'
import { useState, useEffect } from 'react'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import jwt_decode from 'jwt-decode';
import axios from 'axios'

export default function AppRoutes() {
	const [isConnected, setConnect] = useState(false);
	const [userid, setId] = useState("");

	const [pseudo, setPseudo] = useState("default Pseudo")
	const [firstname, setFirstName] = useState("default FirstName")
	const [lastname, setLastName] = useState("default Lastname")
	const [friends, setFriends] = useState([])

	function getUserIdFromToken(token) {
		try {
			const decodedToken = jwt_decode(token);
			return decodedToken.id;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	async function handleTokenInfos() {
		const token = localStorage.getItem('token');
		if (token) {
			const id = getUserIdFromToken(token)
			setId(id)
			setConnect(true)
			await axios.get("http://localhost:8000/users/id/infos/", {
				params: {
					userid: id
				}
			})
				.then((res) => {
					setUserInfo(res.data.pseudo, res.data.firstname, res.data.lastname, res.data.friends)
				})
		}
	}

	useEffect(() => {
		handleTokenInfos()
	}, [isConnected, userid, pseudo, firstname, lastname])

	function setUserInfo(pseudo, firstname, lastname, friends) {
		setPseudo(pseudo)
		setFirstName(firstname)
		setLastName(lastname)
		setFriends(friends)
	}

	function getConnected() {
		setConnect(true)
	}

	function setLogout() {
		setConnect(false)
	}

	async function setUserId(id) {
		setId(id)
	}

	return (
		<Routes>

			<Route exact path='/' element={<MainPage isConnected={isConnected} login={getConnected} logout={setLogout}
				userid={userid} setUserId={setUserId}
				pseudo={pseudo} firstname={firstname} lastname={lastname} setUserInfo={setUserInfo}
				friends={friends}
			/>} />

			<Route exact path='/login' element={<Login isConnected={isConnected} login={getConnected}
				userid={userid} setUserId={setUserId} />} />

			<Route exact path='/signup' element={<SignUp isConnected={isConnected} login={getConnected}
				userid={userid} setUserId={setUserId}
			/>} />

		</Routes>
	)

}

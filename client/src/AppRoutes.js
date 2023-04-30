import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentification from './Components/Authentification'
import Profile from './Components/Profile'
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
	const [name, setName] = useState("default Name")
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

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const id = getUserIdFromToken(token)
			setId(id)
			setConnect(true)
			axios.get("http://localhost:8000/users/id/infos/", {
				params: {
					userid: id
				}
			})
				.then((res) => {
					setUserInfo(res.data.login, res.data.name, res.data.lastname, res.data.friends)
				})

		}
	}, [isConnected, userid, pseudo, name, lastname])

	function setUserInfo(pseudo, name, lastname, friends) {
		setPseudo(pseudo)
		setName(name)
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
				pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo}
				friends={friends}
			/>} />

			<Route exact path='/login' element={<Login isConnected={isConnected} login={getConnected} logout={setLogout}
				userid={userid} setUserId={setUserId}
				pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo} friends={friends}
				/>} />

			<Route exact path='/signup' element={<SignUp isConnected={isConnected} login={getConnected} logout={setLogout}
				userid={userid} setUserId={setUserId}
				pseudo={pseudo} name={name} lastname={lastname} setUserInfo={setUserInfo} friends={friends}/>} />

		</Routes>
	)

}

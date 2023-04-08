import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Authentification from './Components/Authentification'
import Profile from './Components/Profile'
import MainPage from './Components/MainPage'
import { useState, useEffect } from 'react'


export default function AppRoutes() {
  const[isConnected, setConnect] = useState(false);
  const[userid, setId] = useState("");

  const[infoUser, setInfoUser] = useState({
    login : "default",
    name : "default",
    lastname : "default"
  })

  function setUserInfo(login, name, lastname){
    setInfoUser({
      login : {login},
      name : {name},
      lastname : {lastname}
    })
  }

  function getConnected(){
      setConnect(true)
  }

  function setLogout(){
      setConnect(false)
  }

  function setUserId(id){
    setId(id)
  }

  return (
      <Routes>
        
        <Route exact path='/' element={<MainPage isConnected={isConnected} login={getConnected} logout={setLogout}
         userid={userid} setUserId={setUserId}
         setUserInfo={setUserInfo}/>}/>

        <Route exact path='/home/profile' element={<Profile isConnected={isConnected} login={getConnected} logout={setLogout} 
        userid={userid} setUserId={setUserId}
        setUserInfo={setUserInfo}/>}/>

        <Route exact path='/authentification' element={<Authentification isConnected={isConnected} login={getConnected} logout={setLogout} 
        userid={userid} setUserId={setUserId}
        setUserInfo={setUserInfo}/>}/>

      </Routes>
  )

}

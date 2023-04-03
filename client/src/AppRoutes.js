import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Authentification from './Components/Authentification'
import Profile from './Components/Profile'
import MainPage from './Components/MainPage'
import { useState, useEffect } from 'react'


export default function AppRoutes() {
  const[isConnected, setConnect] = useState(false);
  const[page, setPage] = useState("signin_page");

  function getConnected(){
      setConnect(true)
      setPage("home")
  }

  function setLogout(){
      setConnect(false)
      setPage("signin_page")
  }

  return (
      <Routes>
        <Route exact path='/' element={<MainPage isConnected={isConnected} login={getConnected} logout={setLogout}/>}/>
        <Route exact path='/profile' element={<Profile />}/>
        <Route exact path='/authentification' element={<Authentification isConnected={isConnected} login={getConnected} logout={setLogout}/>}/>
      </Routes>
  )

}

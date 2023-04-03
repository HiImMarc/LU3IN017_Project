import React from 'react'
import { useState, useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import Authentification from './Components/Authentification'
import Home from './Components/Home'
import Profile from './Components/Profile'

export default function AppRoutes() {

  const[isConnected, setConnect] = useState(false);

  function getConnected(){
      setConnect(true)
  }

  function setLogout(){
      setConnect(false)
  }

  return (
    <Routes>
      <Route exact path="/" element={<Authentification isConnected={isConnected} login={getConnected}/>}/>
      <Route exact path="/home" element={<Home logout={setLogout}/>}/>
      <Route exact path="/home/profile" element={<Profile/>}/>
    </Routes>
  )
}

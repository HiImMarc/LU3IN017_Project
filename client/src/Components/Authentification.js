import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import './Authentification.css'

export default function Authentification(props) {

  console.log("DANS AUTH : userid :", props.userid)
  
  return (
    <nav>
      {props.isConnected ? 
        (<Home pseudo={props.pseudo} name={props.name} lastname={props.lastname} isConnected={props.isConnected} logout={props.logout}/> )
        : 
        (<div className='main'>
          <div className='signform'>
              <SignUp/>
          </div>
          <div className='loginform'>
              <Login login={props.login} userid={props.userid} setUserId={props.setUserId}
              pseudo={props.pseudo} name={props.name} lastname={props.lastname} setUserInfo={props.setUserInfo} />
          </div>
      </div>)}
    </nav>

  )
}

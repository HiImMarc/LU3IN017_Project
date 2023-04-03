import React from 'react'
import SignIn from './SignIn'
import Login from './Login'
import Home from './Home'


export default function Authentification(props) {
  
  return (
    <nav>
      {props.isConnected ? 
        (<Home isConnected={props.isConnected} logout={props.logout}/> )
        : 
        (<div className='main'>
          <div className='signform'>
              <SignIn/>
          </div>
          <div className='loginform'>
              <Login login={props.login} />
          </div>
      </div>)}
    </nav>

  )
}

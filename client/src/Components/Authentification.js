import React from 'react'
import SignIn from './SignIn'
import Login from './Login'

export default function 
() {
  return (
    <div className='main'>
        <div className='signform'>
            <SignIn/>
        </div>
        <div className='loginform'>
            <Login/>
        </div>
    </div>
  )
}

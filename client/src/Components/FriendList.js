import React from 'react'
import './FriendList.css'


export default function FriendList() {
  return (
    <div className='FriendListMain'>
      <div className='FriendRequests'>
        <h2>Friend Requests : </h2>
        {/* Ajoutez ici la liste des demandes d'amis */}
      </div>
      <div className='FriendList'>
        <h2>Friend List : </h2>
        {/* Ajoutez ici la liste des amis acceptés */}
      </div>
    </div>
  )
}

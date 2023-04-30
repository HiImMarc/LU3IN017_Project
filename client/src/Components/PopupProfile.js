import React from 'react'
import './PopupProfile.css'
import { useState } from 'react'
import PopupFriendRequest from './PopupFriendRequest'

export default function PopupProfile(props) {

    const [showPopupFriendRequest, setShowPopupFriendRequest] = useState(false)
    function openPopupFriendRequest() {
        setShowPopupFriendRequest(true)
    }
    function closePopupFriendRequest() {
        setShowPopupFriendRequest(false)
    }

    // Formulaire visible ou non
    const showhideclassName = props.showPopupProfile ? "display-block" : "display-none"


    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='main'>
                <button className="close" onClick={props.closePopupProfile}>
                    &times;
                </button>
                <br />
                <button onClick={openPopupFriendRequest}>Ajouter Ami</button>
                <PopupFriendRequest closePopupFriendRequest={closePopupFriendRequest} showPopupFriendRequest={showPopupFriendRequest}
                    userid={props.userid} name={props.name} lastname={props.lastname} pseudo={props.pseudo} authorid={props.authorid} />
                <div className='profile'>
                    <div >profile of {props.authorid}</div>
                    <div>name : {props.name} </div>
                    <div>lastname : {props.lastname}</div>
                    <div>friend count : </div>
                    <div>message count : </div>
                </div>
            </section>
        </div>
    )
}
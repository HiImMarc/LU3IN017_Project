import React from "react";
import './SideBar.css';
import Logout from './Logout';
import { Link } from "react-router-dom";
import { useState } from "react";
import MessageForm from "./MessageForm";

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faGears } from '@fortawesome/free-solid-svg-icons'

export default function SideBar(props) {

    const [showMessageForm, setShowMessageForm] = useState(false);

    function closeMessageForm() {
        setShowMessageForm(false)
    }

    function openMessageForm() {
        setShowMessageForm(true)
    }


    return (
        <div className="sidebar">

            <button className='sidebar-button' onClick={() => props.changePage("accueil")}>
                <p>Accueil</p>
                <FontAwesomeIcon icon={faHouse} />
            </button>

            <button className='sidebar-button' onClick={() => props.changePage("friendlist")}>
                <p>Mes Amis</p>
                <FontAwesomeIcon icon={faUserGroup} />
            </button>

            <button className='sidebar-button' onClick={() => props.changePage("myprofile")}>
                <p>Mon Profil</p>
                <FontAwesomeIcon icon={faUser} />
            </button>

            <button className='sidebar-button' onClick={openMessageForm}>
                <p>Nouveau Message</p>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <MessageForm showMessageForm={showMessageForm} closeMessageForm={closeMessageForm}
                userid={props.userid} setUserId={props.setUserId} pseudo={props.pseudo}
                firstname={props.firstname} lastname={props.lastname} />

            <button className='sidebar-button' onClick={() => props.changePage("options")}>
                <p>Options</p>
                <FontAwesomeIcon icon={faGears} />
            </button>

            <Logout className='logout' logout={props.logout} userid={props.userid} setUserId={props.setUserId} pseudo={props.pseudo} firstname={props.firstname} lastname={props.lastname} />
        
        </div>
    );

}
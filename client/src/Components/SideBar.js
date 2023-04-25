import React from "react";
import './SideBar.css';
import Logout from './Logout';
import { Link } from "react-router-dom";
import { useState } from "react";
import MessageForm from "./MessageForm";

export default function SideBar(props){

    const [showMessageForm, setShowMessageForm] = useState(false);

    function closeMessageForm() {
        setShowMessageForm(false)
    }

    function openMessageForm() {
        setShowMessageForm(true)
    }


    return (
        <div className="sidebar">
            <button className='button-accueil' onClick={() => props.changePage("accueil")}>Accueil</button>
            <button className='button-friends' onClick={() => props.changePage("friendlist")}>Friends</button>
            <button className='button-myprofile' onClick={() => props.changePage("myprofile")}>My Profile</button>


            <button onClick={openMessageForm}>Nouveau Message</button>
            <MessageForm updateMessages={props.updateMessages} getMessagesData={props.getMessagesData} showMessageForm={showMessageForm} closeMessageForm={closeMessageForm}
            userid={props.userid} setUserId={props.setUserId} pseudo={props.pseudo} 
            name={props.name} lastname={props.lastname}/>


            <button className='button-settings'>Settings</button>
            {props.isConnected ? 
            (<Logout className='logout' logout={props.logout} userid={props.userid} setUserId={props.setUserId} pseudo={props.pseudo} name={props.name} lastname={props.lastname}  />)
            :
            (<Link to='/login' userid={props.userid} setUserId={props.setUserId} pseudo={props.pseudo} name={props.name} lastname={props.lastname} >Cliquez ici pour vous connectez hehe </Link>)
            }
        </div>
    );

}
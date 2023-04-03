import React from "react";
import './SideBar.css';
import Logout from './Logout';
import { Link } from "react-router-dom";

export default function SideBar(props){

    return (
        <div className="sidebar">
            <button className='button-accueil'>Accueil</button>
            <button className='button-friends'>Friends</button>
            <button className='button-myprofile'>My Profile</button>
            <button className='button-settings'>Settings</button>
            {props.isConnected ? 
            (<Logout className='logout' logout={props.logout}/>)
            :
            (<Link to='/authentification'>Cliquez ici pour vous connectez hehe </Link>)
            }
        </div>
    );

}
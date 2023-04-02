import React from "react";
import './SideBar.css';
import Logout from './Logout';

export default function SideBar(props){

    return (
        <div className="sidebar">
            <button className='button-accueil'>Accueil</button>
            <button className='button-friends'>Friends</button>
            <button className='button-myprofile'>My Profile</button>
            <button className='button-settings'>Settings</button>
            <Logout className='logout' logout={props.logout}/>
        </div>
    );

}
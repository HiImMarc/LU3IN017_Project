import React from 'react'
import './PopupFriendRequest.css'
import { useState } from 'react';
import axios from 'axios';

export default function PopupFriendRequest(props) {

    /*On récupère le message*/
    const[message, setMessage] = useState("");
    function setMessage2(event){
        setMessage(event.target.value);
    }


    // Formulaire visible ou non
    const showhideclassName = props.showPopupFriendRequest ? "display-block" : "display-none"

    async function askFriend () {
        try {
            await axios.post("http://localhost:8000/friends/invitation", {
                from: props.userid,
                to: props.authorid,
                message: message
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
    <div className= {showhideclassName}> {/* Dans le css on controle l'affichage */}
        <section className='main'>
            <button className="close" onClick={props.closePopupFriendRequest}>
                &times; 
            </button>
            <br/>
            <form className='form'>
                <input type="text" placeholder='Écrivez votre message ici...' onChange={setMessage2}/>
                <button type="submit" onClick={askFriend}>Envoyer invitation</button>
            </form>
        </section>
    </div>
    ) 
}
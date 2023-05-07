import React from 'react'
import './PopupFriendRequest.css'
import { useState } from 'react';
import axios from 'axios';

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function PopupFriendRequest(props) {

    /*On récupère le message*/
    const [message, setMessage] = useState("");
    function setMessage2(event) {
        setMessage(event.target.value);
    }


    // Formulaire visible ou non
    const showhideclassName = props.showPopupFriendRequest ? "display-block" : "display-none"

    async function askFriend() {
        try {
            await axios.post("http://localhost:8000/friends/invitation", {
                from: props.userid,
                fromPseudo: props.pseudo, 
                to: props.authorid,
                toPseudo : props.authorPseudo,
                message: message
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='friendrequest'>
                <button className="close" onClick={props.closePopupFriendRequest}>
                    &times;
                </button>
                <div className='titre'>Demande d'ami</div>
                <form>
                    <textarea type="text" placeholder='Écrivez votre message ici...' onChange={setMessage2} />
                    <button type="submit" onClick={askFriend}>
                        <p>Envoyer la demande</p>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            </section>
        </div>
    )
}
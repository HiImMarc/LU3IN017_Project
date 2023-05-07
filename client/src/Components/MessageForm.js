import React from 'react'
import { useState } from 'react';
import './MessageForm.css'
import axios from 'axios';

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function MessageForm(props) {

    /*On récupère le message*/
    const [message, setMessage] = useState("");
    function setMessage2(event) {
        setMessage(event.target.value);
    }

    // Formulaire visible ou non
    const showhideclassName = props.showMessageForm ? "display-block" : "display-none"

    async function submitMessage(e) {
        e.preventDefault();

        await axios.post("http://localhost:8000/messages/new", {
            id: props.userid,
            name: props.name,
            lastname: props.lastname,
            pseudo: props.pseudo,
            content: message,
            date: Date.now()
        })
            .then( () => window.location.reload(false))
            .catch((err) => console.log(err))
    }


    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='messageForm'>
                <button className="close" onClick={props.closeMessageForm}>
                    &times;
                </button>
                <div className='titre'>Nouveau message</div>
                <form>
                    <textarea type="text" placeholder='Écrivez votre message ici...' onChange={setMessage2} />
                    <button type="submit" onClick={submitMessage}>
                        <p>Envoyer</p>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            </section>
        </div>
    )
}

export default MessageForm
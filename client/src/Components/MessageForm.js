import React from 'react'
import { useState } from 'react';
import './MessageForm.css'
import axios from 'axios';

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
            .then(() => {
                props.updateMessages()
            })
            .catch((err) => console.log(err))
    }


    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='main'>
                <button className="close" onClick={props.closeMessageForm}>
                    &times;
                </button>
                <form className='form'>
                    <input type="text" placeholder='Écrivez votre message ici...' onChange={setMessage2} />
                    <button type="submit" onClick={submitMessage}>Envoyer !</button>
                </form>

            </section>
        </div>
    )
}

export default MessageForm
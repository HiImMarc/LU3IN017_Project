import React from 'react'
import { useState } from 'react';
import './CommentForm.css'
import axios from 'axios';

function CommentForm(props) {

    const[comment, setComment] = useState("");

    function setComment2(event){
        setComment(event.target.value);
    }
    
    // Formulaire visible ou non
    const showhideclassName = props.showCommentForm ? "display-block" : "display-none"

    async function submitComment(e) {
        e.preventDefault();

        await axios.patch("http://localhost:8000/messages/comment/new", {
            msgid: props.msgid,
            userid : props.userid,
            lastname : props.lastname,
            name : props.name,
            pseudo : props.pseudo,
            content : comment
        })
        .then ( (res) => {
            console.log("res from submitComment : ",res)
            props.closeCommentForm()
            window.location.reload(false)
        })

    }

  return (
    <div className= {showhideclassName}> {/* Dans le css on controle l'affichage */}
        <section className='main'>
            <button className="close" onClick={props.closeCommentForm}>
                &times; 
            </button>
                <form className='form'>
                    <input type="text" placeholder='Écrivez votre commentaire ici...' onChange={setComment2}/>
                    <button type="submit" onClick={submitComment}>Envoyer commentaire !</button>
                </form>

        </section>
    </div>
  ) 
}

export default CommentForm
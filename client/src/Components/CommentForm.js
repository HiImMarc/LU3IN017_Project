import React from 'react'
import { useState } from 'react';
import './CommentForm.css'
import axios from 'axios';

function CommentForm(props) {

    const[comment, setComment] = useState("");

    const [lastname,setLastName] =  useState("");
    const [name,setName] =  useState("");
    const [pseudo,setPseudo] =  useState("");


    function setComment2(event){
        setComment(event.target.value);
    }
    
    // Formulaire visible ou non
    const showhideclassName = props.showCommentForm ? "display-block" : "display-none"

    async function submitComment(e) {
        e.preventDefault();

        await axios.get("http://localhost:8000/users/id/infos", {
            params:{
                userid: props.userid
            }
        })
        .then ( async (response) => {
            const authorLastname = response.data.lastname
            const authorName = response.data.name
            const authorPseudo = response.data.pseudo
            console.log("les params de mon commentaire : ",authorLastname,authorName,authorPseudo)
            await axios.patch("http://localhost:8000/messages/comment/new", {
                msgid: props.msgid,
                userid : props.userid,
                lastname : authorLastname,
                name : authorName,
                pseudo : authorPseudo,
                content : comment
            })
            .then ( (res) => {
                console.log("res from submitComment : ",res)
                props.closeCommentForm()
                window.location.reload(false)
            })
        })
        .catch ((err) => console.log("error commentForm",err))



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
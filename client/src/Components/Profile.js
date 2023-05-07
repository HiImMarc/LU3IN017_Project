import { useEffect, useState } from 'react';
import React from 'react';
import './Profile.css'
import axios from 'axios';
import ProfileMessage from './ProfileMessage';

export default function Profile(props) {

    const [nbMessages,setNbMessages] = useState(0)

    function getNbMessages() {
        axios.get("http://localhost:8000/messages/user",{
            params:{
                userid: props.userid
            }
        })
            .then((res) => {
                setNbMessages(res.data.length)
            })
            .catch(error => console.log(error))

    }

    useEffect(() => getNbMessages(), [])

    const messagesList = props.data.filter(item => item.authorid === props.userid);

    return (
        <div className='myprofile'>
            <h2 className='monprofil'>Mon profil :</h2>
            <br/>
            <div className='profile'>
                <p><b>Pseudo :</b> {props.pseudo}</p>
                <p><b>Nom :</b> {props.lastname}</p>
                <p><b>Prénom :</b> {props.firstname}</p>
                <p><b>Nombre d'amis :</b> {props.friends.length}</p>
                <p><b>Nombre de messages :</b> {nbMessages}</p>
            </div>
            <br/>
            <div className='mymessages'>
                {messagesList.map((item, index) => (
                    <ProfileMessage
                        key={index}
                        msgid={item._id.toString()}
                        authorid={item.authorid}
                        userid={props.userid}
                        content={item.content}
                        likes={item.likes}
                        comments={item.comments}
                        friends={props.friends}
                        date={item.date}
                    />
                ))}
            </div>
        </div>
    )
}

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
                //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",res)
            })
            .catch(error => console.log(error))

    }

    useEffect(() => getNbMessages(), [])

    //console.log("qSDJQSKLFJDSKLIDJSQKLDJSQKLDJSKLDS",props.data)

    const messagesList = props.data.filter(item => item.authorid === props.userid);
    //console.log("qSDJQSKLFJDSKLIDJSQKLDJSQKLDJSKLDS",messagesList)

    return (
        <div className='myprofile'>
            <div className='profile'>
                Pseudo : {props.pseudo}
                <br />
                Nom : {props.firstname}
                <br />
                Prénom : {props.lastname}
                <br />
                Nombre d'amis : {props.friends.length}
                <br/> 
                Nombre de messages : {nbMessages}
            </div>
            <br />
            <div className='mymessages'>
                <ul>
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
            </ul>
            </div>
        </div>
    )
}

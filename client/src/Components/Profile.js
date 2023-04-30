import { useEffect, useState } from 'react';
import React from 'react';
import './Profile.css'
import MessageList from './MessageList';
import ProfileMessage from './ProfileMessage';

export default function Profile(props) {

    console.log("qSDJQSKLFJDSKLIDJSQKLDJSQKLDJSKLDS",props.data)

    const messagesList = props.data.filter(item => item.authorid === props.userid);
    console.log("qSDJQSKLFJDSKLIDJSQKLDJSQKLDJSKLDS",messagesList)

    return (
        <div className='myprofile'>
            <div className='profile'>
                Pseudo : {props.pseudo}
                <br />
                Nom : {props.name}
                <br />
                Prénom : {props.lastname}
                <br />
                Nombre d'amis : {props.friends.length}
                <br/> 
                Nombre de messages : 
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
                    />
                ))}
            </ul>
            </div>
        </div>
    )
}

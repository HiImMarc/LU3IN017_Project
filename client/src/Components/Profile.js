import { useEffect, useState } from 'react';
import React from 'react';
import './Profile.css'
import MessageList from './MessageList';

export default function Profile(props) {


    return (
        <div className='myprofile'>
            <div className='profile'>
                {props.pseudo}
                <br />
                {props.name}
                <br />
                {props.lastname}
                <br />
                { }
                { }
            </div>
            <br />
            <div className='mymessages'>
                here
            </div>
        </div>
    )
}

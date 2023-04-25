import {useEffect, useState} from 'react';
import React from 'react';
import './Profile.css'
import MessageList from './MessageList';

export default function Profile(props) {
    
    //Etats pour la gestion des messages
    const [messageData, setMessageData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(getMessageData, [])

    // Filtrer le tableau de messages en fonction de la valeur de recherche
    const filteredMessages = messageData.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.body.toLowerCase().includes(searchInput.toLowerCase())
    );

    function getMessageData(){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then (response => response.json())
        .then(data => setMessageData(data))
    }

    return (
            <div className="core">
                <div className='profile'>MON PRFOL AFFICHE EST ICI</div>
                <br/>
                <div className='mymessages'>
                    <MessageList isConnected={props.isConnected} data={props.data} searchInput={props.searchInput} userid={props.userid} setUserId={props.setUserId}/>
                </div>
            </div>
    );
}

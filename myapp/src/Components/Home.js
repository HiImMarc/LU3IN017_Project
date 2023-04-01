import {useEffect, useState} from 'react';
import React from 'react';
import Logo from '../Image/Logo.png'
import SearchBar from './SearchBar'
import MessageList from './MessageList';
import SideBar from './SideBar';
import './Home.css'

function Home(props) {

    //Etats pour la gestion des messages
    const [messageData, setMessageData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(getMessageData, [])

    // Filtrer le tableau de messages en fonction de la valeur de recherche
    const filteredMessages = messageData.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.body.toLowerCase().includes(searchInput.toLowerCase())
    );

    function handleSearch(input){
        setSearchInput(input);
    }

    function getMessageData(){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then (response => response.json())
        .then(data => setMessageData(data))
    }

    return (
        <div className="home">
            <header>
                <div className='logo'>
                    <img className='concreteLogo'src={Logo}/>
                </div>
                <div className='searchBar'>
                    <SearchBar onSearch={handleSearch}/>
                </div>
                <div className='miniprofile'>User Profile</div>
            </header>

            <div className="core">
                <div  className="messageList">
                    <MessageList data={filteredMessages} searchInput={searchInput}/>
                </div>
                <div className="sideBar">
                    <SideBar isConnected={props.isConnected} logout={props.logout} />
                </div>
            </div>

        </div>
    );
}

export default Home;
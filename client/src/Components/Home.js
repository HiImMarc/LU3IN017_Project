import {useEffect, useState} from 'react';
import React from 'react';
import Logo from '../Image/Logo.png'
import SearchBar from './SearchBar'
import MessageList from './MessageList';
import SideBar from './SideBar';
import './Home.css'
import axios
 from 'axios';
function Home(props) {

    //Etats pour la gestion des messages
    const [messageData, setMessageData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(getMessagesData, [])

    // Filtrer le tableau de messages en fonction de la valeur de recherche
    let filteredMessages = messageData.filter(item =>
        (searchInput.trim() === "") ||
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.content.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.lastname.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.pseudo.toLowerCase().includes(searchInput.toLowerCase())
    );

    function handleSearch(input){
        setSearchInput(input);
    }

    function getMessagesData(){ 
        axios.get("http://localhost:8000/messages")
        .then ( (res) => {
            setMessageData(res.data)
            console.log("LA DATA MESSAGE RETURNED EST :", res.data)
            console.log("LA DATA MESSAGE EST :", messageData)
            
        })
        .catch(error => console.log(error))

    }




    console.log('Home : isConnected',props.isConnected)
    console.log("MON ID est : ", props.userid);


    return (
        <div className="home">
            <header>
                <div className='logo'>
                    <img className='concreteLogo'src={Logo}/>
                </div>
                <div className='searchBar'>
                    <SearchBar onSearch={handleSearch}/>
                </div>
                <div className='miniprofile'>

                    <label className='pseudo'>{props.pseudo}</label>
                    <br/>
                    <label className='nom'>{props.name}</label>
                    <br/>
                    <label className='prenom'>{props.lastname}</label>

                    {/* RAJOUTER LE NOMBRE D AMIS ? ET PTET LE NOMBRE DE MSG ? ET DAUTRES TRUCS JSP ENCORE */}

                </div>
            </header>

            <div className="core">
                <div  className="messageList">
                    <MessageList isConnected={props.isConnected} data={filteredMessages} searchInput={searchInput} userid={props.userid} setUserId={props.setUserId}/>
                </div>
                <div className="sideBar">
                    <SideBar updateMessages={getMessagesData} getMessagesData={getMessagesData} isConnected={props.isConnected} logout={props.logout} login={props.login} userid={props.userid} setUserId={props.setUserId}
                    pseudo={props.pseudo} name={props.name} lastname={props.lastname} />
                </div>
            </div>
        </div>
    );
}

export default Home;
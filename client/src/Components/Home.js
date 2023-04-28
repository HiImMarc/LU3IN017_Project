import {useEffect, useState} from 'react';
import React from 'react';
import Logo from '../Image/Logo.png'
import SearchBar from './SearchBar'
import MessageList from './MessageList';
import SideBar from './SideBar';
import './Home.css'
import axios from 'axios';
import Profile from './Profile'
import FriendList from './FriendList'


function Home(props) {

    const [page, setPage] = useState("accueil")
    function changePage(page){
        setPage(page)
    }

    // Pour le switch entre mes messages/tout les messages/messages de mes amis seulement
    const [filter, setFilter] = useState('all');


    //Etats pour la gestion des messages
    const [messageData, setMessageData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(getMessagesData,[])

    // Filtrer le tableau de messages en fonction de la valeur de recherche
    const filteredMessages = messageData.filter(item => 
        (searchInput.trim() === "") ||
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.content.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.lastname.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.pseudo.toLowerCase().includes(searchInput.toLowerCase())
    );
    let messagesList = null;
    switch (filter) {
        case 'all':
            messagesList = filteredMessages;
            break;
        case 'me':
            messagesList = filteredMessages.filter(item => item.authorid === props.userid);
            break;
        case 'friends':
            // const user = props.users.find(user => user.id === props.userid);
            // const friendIds = user.friends;
            // messagesList = filteredMessages.filter(item => friendIds.includes(item.userid));
            break;
        default:
            messagesList = filteredMessages;
            break;
    }


    function handleSearch(input){
        setSearchInput(input);
    }

    function getMessagesData(){ 
        axios.get("http://localhost:8000/messages")
        .then ( (res) => {
            setMessageData(res.data)
            console.log("LA DATA MESSAGE RETURNED EST :", res.data)         
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

                {page === "accueil" ?
                    <div className="messageList">
                        <button onClick={() => setFilter('all')}>Tous les messages</button>
                        <button onClick={() => setFilter('me')}>Mes messages</button>
                        <button onClick={() => setFilter('friends')}>Messages d'amis</button>
                    <MessageList isConnected={props.isConnected} data={messagesList} searchInput={searchInput} userid={props.userid} setUserId={props.setUserId}/>
                    </div>
                    :
                    <></>
                }
                {page==="myprofile" ? 
                    <div className='myprofile'>
                    <Profile lastname={props.lastname} name={props.name} pseudo={props.pseudo} isConnected={props.isConnected} data={filteredMessages} searchInput={searchInput} userid={props.userid} watcherid={props.userid} setUserId={props.setUserId}/>
                    </div>
                    :
                    <></>
                }
                {page==="friendlist" ? 
                    <div className='friendlist'>
                        <FriendList isConnected={props.isConnected} data={filteredMessages} searchInput={searchInput} userid={props.userid} setUserId={props.setUserId}/>
                    </div>
                    :
                    <></>
                }
                <div className="sideBar">
                    <SideBar changePage={changePage} updateMessages={getMessagesData} getMessagesData={getMessagesData} isConnected={props.isConnected} logout={props.logout} login={props.login} userid={props.userid} setUserId={props.setUserId}
                    pseudo={props.pseudo} name={props.name} lastname={props.lastname}/>
                </div>
            </div>

        </div>
    );
}

export default Home;
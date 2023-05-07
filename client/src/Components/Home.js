import { useEffect, useState } from 'react';
import React from 'react';
import Logo from '../Image/Logo.png'
import SearchBar from './SearchBar'
import MessageList from './MessageList';
import SideBar from './SideBar';
import './Home.css'
import axios from 'axios';
import Profile from './Profile'
import FriendList from './FriendList'
import Options from './Options';

function Home(props) {

    const [page, setPage] = useState("accueil")
    function changePage(page) {
        setPage(page)
    }

    // Pour le switch entre mes messages/tout les messages/messages de mes amis seulement
    const [filter, setFilter] = useState('all');

    //Etats pour la gestion des messages
    const [messageData, setMessageData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        getMessagesData()
    }, [])

    // Filtrer le tableau de messages en fonction de la valeur de recherche
    const filteredMessages = messageData.filter(item =>
        (searchInput.trim() === "") ||
        item.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
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
            messagesList = filteredMessages.filter(item => {
                return props.friends.some(friend => friend.id === item.authorid)
            });
            break;
        default:
            messagesList = filteredMessages;
            break;
    }

    console.log("messageList", messagesList)

    function handleSearch(input) {
        setSearchInput(input);
    }

    async function getMessagesData() {
        axios.get("http://localhost:8000/messages")
            .then((res) => {
                setMessageData(res.data)
                console.log("LA DATA MESSAGE EST :", res.data)
            })
            .catch(error => console.log(error))

    }

    console.log('Home : isConnected', props.isConnected)
    console.log("userid : ", props.userid);
    console.log("friends : ", props.friends)


    return (
        <div className="home">
            <div className='header'>
                <div className='logo'>
                    <img className='concreteLogo' src={Logo} />
                </div>
                <div className='searchBar'>
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className='miniprofile'>
                    <label className='pseudo'>{props.pseudo}</label>
                </div>
            </div>

            <div className="core">

                {page === "accueil" ?
                    <div className="accueil">
                        <button className='filter-button' onClick={() => setFilter('all')}>Tous les messages</button>
                        <button className='filter-button' onClick={() => setFilter('me')}>Mes messages</button>
                        <button className='filter-button' onClick={() => setFilter('friends')}>Messages d'amis</button>
                        <MessageList data={messagesList} searchInput={searchInput} userid={props.userid} setUserId={props.setUserId} pseudo={props.pseudo}
                            friends={props.friends} />
                    </div>
                    :
                    <></>
                }
                {page === "myprofile" ?
                    <Profile lastname={props.lastname} firstname={props.firstname} pseudo={props.pseudo} isConnected={props.isConnected} data={messagesList}
                        searchInput={searchInput} userid={props.userid} friends={props.friends} />
                    :
                    <></>
                }
                {page === "friendlist" ?
                    <div className='friendlist'>
                        <FriendList isConnected={props.isConnected} userid={props.userid} setUserId={props.setUserId}
                            friends={props.friends} data={messagesList} />
                    </div>
                    :
                    <></>
                }
                {page === "options" ?
                    <Options isConnected={props.isConnected} userid={props.userid} setUserId={props.setUserId}
                        friends={props.friends} data={messagesList} logout={props.logout}/>
                    :
                    <></>
                }
                <div className="sideBar">
                    <SideBar changePage={changePage} updateMessages={getMessagesData} getMessagesData={getMessagesData} isConnected={props.isConnected} logout={props.logout}
                        login={props.login} userid={props.userid} setUserId={props.setUserId}
                        pseudo={props.pseudo} firstname={props.firstname} lastname={props.lastname} />
                </div>
            </div>

        </div>
    );
}

export default Home;
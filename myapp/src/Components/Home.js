import React from 'react';
import Logo from '../Image/Logo.png'
import SearchBar from './SearchBar'
import MessageList from './MessageList';
import SideBar from './SideBar';
import './Home.css'

function Home() {
  return (
    <div className="home">
        {/* Header */}
        <header>
            <div className='logo'>
                <img className='concreteLogo'src={Logo}/>
            </div>
            <div className='searchBar'>
                <SearchBar/>
            </div>
        </header>

        <div className="core">
            <div  className="messageList">
                <MessageList/>
            </div>
            <div className="sideBar">
                <SideBar />
            </div>
        </div>

    </div>
  );
}

export default Home;
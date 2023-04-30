import React from 'react';
import Logo from '../Image/Logo.png'
import SearchBar from './SearchBar'

export default function Header(props) {
    return (
        <header>
            <div className='logo'>
                <img className='concreteLogo' src={Logo} />
            </div>
            <div className='searchBar'>
                <SearchBar onSearch={props.onSearch} />
            </div>
            <div className='miniprofile'>User Profile</div>
        </header>)
}

import { useState, useEffect } from "react";
import NavigationPanel from './NavigationPanel';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


export default function MainPage(props){
    const[isConnected, setConnect] = useState(false);
    const[page, setPage] = useState("signin_page");

    function getConnected(){
        setConnect(true)
        setPage("message_page")
    }

    function setLogout(){
        setConnect(false)
        setPage("signin_page")
    }

    return (
        <div>
            <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>
        </div>
    )
}
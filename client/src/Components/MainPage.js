import { useState, useEffect } from "react";
import NavigationPanel from './NavigationPanel'


export default function MainPage(){
    const[isConnected, setConnect] = useState(false);
    const[page, setPage] = useState("signin_page");

    function getConnected(){
        setConnect(true)
        setPage("home")
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
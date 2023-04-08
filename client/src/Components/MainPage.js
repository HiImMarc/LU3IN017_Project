import { useState, useEffect } from "react";
import NavigationPanel from './NavigationPanel'
import Home from "./Home";

export default function MainPage(props){

    console.log("USER ID : ", props.userid)

    return (
        <div className="mainpage">
            <Home isConnected={props.isConnected} login={props.getConnected} logout={props.setLogout}
            userid={props.userid} setUserId={props.setUserId}
            setUserInfo={props.setUserInfo}/>
        </div>
    )
}
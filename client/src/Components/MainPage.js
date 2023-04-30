import { useState, useEffect } from "react";
import NavigationPanel from './NavigationPanel'
import Home from "./Home";

export default function MainPage(props) {

    return (
        <div className="mainpage">
            <Home isConnected={props.isConnected} login={props.getConnected} logout={props.setLogout}
                userid={props.userid} setUserId={props.setUserId}
                pseudo={props.pseudo} name={props.name} lastname={props.lastname} setUserInfo={props.setUserInfo} />
        </div>
    )
}
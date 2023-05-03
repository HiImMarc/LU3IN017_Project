import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";

export default function MainPage(props) {

    return (
        <div className="mainpage">
            { props.isConnected ?


            <Home isConnected={props.isConnected} login={props.getConnected} logout={props.logout}
                userid={props.userid} setUserId={props.setUserId}
                pseudo={props.pseudo} firstname={props.firstname} lastname={props.lastname} setUserInfo={props.setUserInfo} 
                friends={props.friends}
                />
            :
            <Login isConnected={props.isConnected} login={props.getConnected} logout={props.setLogout}
            userid={props.userid} setUserId={props.setUserId}
            pseudo={props.pseudo} firstname={props.firstname} lastname={props.lastname} setUserInfo={props.setUserInfo} 
            friends={props.friends} />
            }
        </div>
    )
}
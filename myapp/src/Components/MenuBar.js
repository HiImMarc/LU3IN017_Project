import { useState } from "react";
import logo from '../Image/Logo.png'
import './MenuBar.css'
import MenuOptions from './MenuOptions'


export default function MenuBar(props){

    return (
        <div className="main">
            {/* Le logo */}
            <div className=''>
                <img id='logo'src={logo}/>
            </div>
            <br/>
            {/* La liste des options disponibles */}
            <div className="menuOption">
                <MenuOptions/>
            </div>

            {/* Petit aperçu du profile connecté */}

            
        </div>

        /* PROFILE */


    );

    


}
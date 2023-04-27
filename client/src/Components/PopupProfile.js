import React from 'react'
import './PopupProfile.css'


export default function PopupProfile(props) {

    

// Formulaire visible ou non
const showhideclassName = props.showPopupProfile ? "display-block" : "display-none"


async function askFriend(){
    
}


return (
<div className= {showhideclassName}> {/* Dans le css on controle l'affichage */}
    <section className='main'>
        <button className="close" onClick={props.closePopupProfile}>
            &times; 
        </button>
        <br/>
        <button onClick={askFriend}>Ajouter Ami</button>
        <div className='profile'>
            profile of {props.authorid}/

        </div>
    </section>
</div>
) 
}
import React, { useEffect } from 'react'
import './PopupProfile.css'
import { useState } from 'react'
import PopupFriendRequest from './PopupFriendRequest'
import ProfileMessage from './ProfileMessage'
import axios from 'axios'

export default function PopupProfile(props) {

    const [showPopupFriendRequest, setShowPopupFriendRequest] = useState(false)
    function openPopupFriendRequest() {
        setShowPopupFriendRequest(true)
    }
    function closePopupFriendRequest() {
        setShowPopupFriendRequest(false)
    }

    const [nbMessages,setNbMessages] = useState(0)

    function getNbMessages() {
        axios.get("http://localhost:8000/messages/user",{
            params:{
                userid: props.authorid
            }
        })
            .then((res) => {
                setNbMessages(res.data.length)
                //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",res)
            })
            .catch(error => console.log(error))

    }
    useEffect(() => getNbMessages(), [])

    // Formulaire visible ou non
    const showhideclassName = props.showPopupProfile ? "display-block" : "display-none"

    const messagesList = props.data.filter(item => item.authorid === props.authorid);

    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='main'>
                <button className="close" onClick={props.closePopupProfile}>
                    &times;
                </button>
                <br />
                {props.friends.some(friend => friend.id === props.authorid) ?
                (<div>Vous êtes amis</div>)
                :
                (<button onClick={openPopupFriendRequest}>Ajouter Ami</button>)
                }
                <PopupFriendRequest closePopupFriendRequest={closePopupFriendRequest} showPopupFriendRequest={showPopupFriendRequest}
                    userid={props.userid} name={props.name} lastname={props.lastname} pseudo={props.pseudo} authorPseudo={props.authorPseudo} authorid={props.authorid} />
                <br/>
                <div className='profile'>
                    <div >Profil : {props.authorPseudo}</div>
                    <div>Prénom : {props.name} </div>
                    <div>Nom : {props.lastname}</div>
                    <div>Nombre d'amis : {props.friends.length}</div>
                    <div>Nombre de messages : {nbMessages}</div>
                </div>
                <br/>
                <div className='profile-messages'>
                        <ul>
                        {messagesList.map((item, index) => (
                            <ProfileMessage
                                key={index}
                                msgid={item._id.toString()}
                                authorid={item.authorid}
                                userid={props.userid}
                                content={item.content}
                                likes={item.likes}
                                comments={item.comments}
                                friends={props.friends}
                                date={item.date}
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}
import React from 'react'
import './PopupProfile.css'
import { useState } from 'react'
import PopupFriendRequest from './PopupFriendRequest'
import ProfileMessage from './ProfileMessage'

export default function PopupProfile(props) {

    const [showPopupFriendRequest, setShowPopupFriendRequest] = useState(false)
    function openPopupFriendRequest() {
        setShowPopupFriendRequest(true)
    }
    function closePopupFriendRequest() {
        setShowPopupFriendRequest(false)
    }

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
                {props.friends.includes(props.authorid) ?
                (<div>Vous êtes amis</div>)
                :
                (<button onClick={openPopupFriendRequest}>Ajouter Ami</button>)
                }
                <PopupFriendRequest closePopupFriendRequest={closePopupFriendRequest} showPopupFriendRequest={showPopupFriendRequest}
                    userid={props.userid} name={props.name} lastname={props.lastname} pseudo={props.pseudo} authorid={props.authorid} />
                <br/>
                <div className='profile'>
                    <div >profile of {props.pseudo}</div>
                    <div>name : {props.name} </div>
                    <div>lastname : {props.lastname}</div>
                    <div>friend count : {props.friends.length}</div>
                    <div>message count : </div>
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
                            />
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}
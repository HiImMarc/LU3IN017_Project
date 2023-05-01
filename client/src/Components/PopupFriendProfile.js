import React from 'react'
import './PopupProfile.css'
import ProfileMessage from './ProfileMessage'

export default function PopupFriendProfile(props) {

    // Formulaire visible ou non
    const showhideclassName = props.showPopupProfile ? "display-block" : "display-none"

    const messagesList = props.data.filter((item =>  {
        return props.friends.some(friend => friend.id === item.authorid)}));

    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='main'>
                <button className="close" onClick={props.closePopupProfile}>
                    &times;
                </button>

                <div className='profile'>
                    <div >Profil : {props.pseudo}</div>
                    <div>Prénom : {props.firstname} </div>
                    <div>Nom : {props.lastname}</div>
                    <div>Nombre d'amis : {props.friends.length}</div>
                    <div>Nombre de messages : </div>
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
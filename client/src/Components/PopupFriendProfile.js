import React from 'react'
import './PopupFriendProfile.css'
import ProfileMessage from './ProfileMessage'

export default function PopupFriendProfile(props) {

    // Formulaire visible ou non
    const showhideclassName = props.showPopupProfile ? "display-block" : "display-none"

    const messagesList = props.data.filter((item =>  {
        return props.friends.some(friend => friend.id === item.authorid)}));

    return (
        <div className={showhideclassName}> {/* Dans le css on controle l'affichage */}
            <section className='profilebox' id='puf'>
                <button className="close" onClick={props.closePopupProfile}>
                    &times;
                </button>
                <div className='popupfirst'>
                    <div >Profil de {props.pseudo}</div>
                </div>
                <div className='profile' id='pufprof'>
                    <p><b>Nom :</b> {props.lastname}</p>
                    <p><b>Prénom :</b> {props.firstname}</p>
                    <p><b>Nombre d'amis :</b> {props.friends.length}</p>
                    <p><b>Nombre de messages :</b> {}</p>
                </div>
                <br/>
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
            </section>
        </div>
    )
}
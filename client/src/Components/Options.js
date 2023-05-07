import React from 'react'
import axios from 'axios';
import './Options.css';


export default function Options(props) {

    async function deleteAccount() {
        axios.delete("http://localhost:8000/users/delete",{
            params:{
                userid: props.userid
            }
        })
            .then((res) => {
                localStorage.removeItem('token');
                props.Logout()
            })
            .catch(error => console.log(error))

    }

    return (
        <div className='options'>
            <button className='deleteaccount' onClick={()=> deleteAccount()}>SUPPRIMER MON COMPTE</button>
        </div>
    )
}

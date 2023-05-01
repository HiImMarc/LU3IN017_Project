import React from 'react'
import axios from 'axios';


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
        <div className='main'>
            <button className='deleteaccount' onClick={()=> deleteAccount()}>DELETE MY ACCOUNT</button>


        </div>
    )
}

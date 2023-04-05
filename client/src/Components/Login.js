import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [userid, setUserId] = useState("");

    function getLogin(event) {
        setLogin(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }


    async function submit(e){
        e.preventDefault();

        try{
            await axios.get("http://localhost:8000/login", {
                login, password
            })
            .then (function (response) {
                console.log("response.data : ",response.data)
                setUserId(response.data)
            })
        } catch (err){
            console.log(err)
        }
    }
    

    console.log("userid",userid)

    return (
        <div className='main'>
            <div className='loginform'>
                <form method="POST" action="" id="form">
                    <input className='login' type="text" placeholder='Login' onChange={getLogin} />
                    <br />
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword} />
                    <br />
                    <Link to='/' onClick={props.login}>Connexion</Link>
                    <button className='bConnexion' type="submit" onClick={submit}>
                        Connexion
                    </button><button type="reset">Annuler</button>
                </form>
            </div>
        </div>
    );
}

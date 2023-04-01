import {useState} from 'react';
import './Login.css';

export default function Login(props){

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function getLogin(event){
        setLogin(event.target.value);
    }

    function getPassword(event){
        setPassword(event.target.value);
    }

    return (
        <div className='main'>
            <div className='form'>
                <form method="POST" action="" id="form">
                    <input className='login' type="text" placeholder='Login' onChange={getLogin}/>
                    <br/>
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword}/>
                    <br/>
                    <button className='bConnexion'type="submit" onClick={props.login}>
                        Connexion 
                    </button><button type="reset">Annuler</button>
                </form>
            </div>
        </div>
    );
}

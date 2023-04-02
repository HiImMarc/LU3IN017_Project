import {useState} from 'react';
import './SignIn.css'


export default function SignIn(props){

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");


    function getLogin(event){
        setLogin(event.target.value);
    }
    function getPassword(event){
        setPassword(event.target.value);
    }
    function getName(event){
        setName(event.target.value);
    }
    function getLastName(event){
        setLastName(event.target.value);
    }

    return (
        <div className='main'>
            <div className='form'>
                <form method="POST" action="" id="form">
                    <input className='login' type="text" placeholder='Login' onChange={getLogin}/>
                    <br/>
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword}/>
                    <br/>
                    <input className='name' type="text" placeholder='Name' onChange={getName}/>
                    <br/>
                    <input className='lastname' type="text" placeholder='lastName' onChange={getLastName}/>
                    <br/>
                    <button className='bConnexion'type="submit" onClick={props.login}>
                        Inscription
                    </button><button type="reset">Annuler</button>
                </form>
            </div>
        </div>
    );
}

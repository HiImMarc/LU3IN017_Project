import { useState } from 'react';
import './Login.css';
import { Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    // Les infos de l'user 
    const [pseudo, setPseudo] = useState("Please Connect");
    const [name, setNom] = useState("No name please connect");
    const [lastname, setLastName] = useState("No lastname please connect");

    function getLogin(event) {
        setLogin(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    function setInfos(){
        axios.get('http://localhost:8000/users/id/infos/:user', {
            params: {
                id : props.userid
            }
        })
        .then( (res) => {
            console.log("RESULTAT DE SETINFOS");
        })
    }

    const navigate = useNavigate();

    async function submit(e){
        e.preventDefault();

        try{
            console.log("J'use et : ",login,password)
            await axios.get("http://localhost:8000/login", {
                params: {
                    login: login,
                    password: password
                }
            })
            .then ((res) => {
                if (res.data === "wrong password or login"){
                    console.log("mauvais identifiants")
                } else {
                    setInfos()
                    navigate('/')
                    props.login()
                }
            })
        } catch (err){
            console.log(err)
        }

     
    }

    console.log("DANS LOGIN USER ID : ",props.userid)

    return (
        <div className='main'>
            <div className='loginform'>
                <form method="POST" action="" id="form">
                    <input className='login' type="text" placeholder='Login' onChange={getLogin} />
                    <br />
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword} />
                    <br />
                    <Link to='/' onClick={props.login} userid={props.userid}>Connexion</Link>
                    <button className='bConnexion' type="submit" onClick={submit}> Connexion </button>
                    <button type="reset">Annuler</button>
                </form>
            </div>
        </div>
    );
}

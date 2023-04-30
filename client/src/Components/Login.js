import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function getLogin(event) {
        setLogin(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        try {
            console.log("J'use et : ", login, password)
            await axios.get("http://localhost:8000/login", {
                params: {
                    login: login,
                    password: password
                }
            })
                //On "connecte" l'user
                .then((res) => {
                    if (res.data === "wrong password or login") {
                        console.log("mauvais identifiants")
                    } else {
                        console.log("res[0].data", res)
                        props.setUserId(res.data._id)
                        localStorage.setItem('token', res.data.token)
                        navigate('/')
                        props.login()
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", res.data._id)
                        return res.data._id  // On a besoin de l'id pour récup les info de l'user
                    }
                })
                //On récupère les infos de l'user
                .then(async (res) => {
                    if (res) {
                        console.log("RESSSSS", res)
                        await axios.get("http://localhost:8000/users/id/infos", {
                            params: {
                                userid: res
                            }
                        })
                            .then((res) => {
                                console.log("ON A REUSSI ? :", res.data.login, res.data.name, res.data.lastname)
                                props.setUserInfo(res.data.login, res.data.name, res.data.lastname)
                            })
                            .catch((e) => {
                                console.log(e)
                            })
                    }
                })
        } catch (err) {
            console.log(err)
        }


    }

    console.log("DANS LOGIN USER ID : ", props.userid)

    return (
        <div className='main'>
            <div className='loginform'>
                <form method="POST" action="" id="form">
                    <input className='login' type="text" placeholder='Login' onChange={getLogin} />
                    <br />
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword} />
                    <br />
                    <button className='bConnexion' type="submit" onClick={submit}> Connexion </button>
                    <button type="reset">Annuler</button>
                </form>
            </div>

            <Link className='tosignup' to='/signup'>Pas de compte ? Inscrivez vous ici</Link>
        </div>
    );
}

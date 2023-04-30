import { useState } from 'react';
import './SignUp.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function SignUp(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");

    const navigate = useNavigate();

    function getLogin(event) {
        setLogin(event.target.value);
    }
    function getPassword(event) {
        setPassword(event.target.value);
    }
    function getName(event) {
        setName(event.target.value);
    }
    function getLastName(event) {
        setLastName(event.target.value);
    }

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/users/new", {
                login, password, name, lastname
            })
                .then((response) => {
                    if (response.data === "login already exists") {
                        console.log("CE LOGIN EXISTE DEJA");
                    } else {
                        console.log("Utilisateur : ", login, " a été crée avec succès !")
                        navigate("/login");
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='main'>
            <div className='form'>
                <form method="POST" action="" id="form">
                    <input className='login' type="text" placeholder='Login' onChange={getLogin} />
                    <br />
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword} />
                    <br />
                    <input className='name' type="text" placeholder='Name' onChange={getName} />
                    <br />
                    <input className='lastname' type="text" placeholder='lastName' onChange={getLastName} />
                    <br />
                    <button className='bConnexion' type="submit" onClick={submit}>
                        Inscription
                    </button><button type="reset">Annuler</button>
                </form>
            </div>
            <Link className='tologin' to='/login'>Déjà inscrit ? Connectez vous ici</Link>

        </div>
    );
}

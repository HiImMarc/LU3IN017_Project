export default function SignIn () {

    return (
        <div className='main'>
            <div className='form'>
                <form method="POST" action="" id="form">
                    <input className='nom' type="text" placeholder='Nom'/>
                    <input className='login' type="text" placeholder='Login' onChange={getLogin}/>
                    <br/>
                    <input className='mdp' type="password" placeholder='Password' onChange={getPassword}/>
                    <br/>
                    <button className='bConnexion'type="submit">Connexion</button><button type="reset">Annuler</button>
                </form>
            </div>
        </div>
    )

}
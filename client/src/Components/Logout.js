import { Link } from "react-router-dom";

export default function Logout(props){
    return (
        <div>
            <Link to='/authentification' onClick={props.logout} >Déconnexion</Link>
        </div>
    );
}

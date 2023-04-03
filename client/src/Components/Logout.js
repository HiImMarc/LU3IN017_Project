import { Link } from "react-router-dom";
import './Logout.css'

export default function Logout(props){
    return (
        <div className="deconnect">
            <Link  to='/authentification' onClick={props.logout} >Déconnexion</Link>
        </div>
    );
}

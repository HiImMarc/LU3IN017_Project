import { Link } from "react-router-dom";
import './Logout.css'

export default function Logout(props) {

    function Logout() {
        localStorage.removeItem('token');
        props.Logout()
    }

    return (
        <div className="deconnect">

            <Link to='/login' onClick={Logout} >Déconnexion</Link>
        </div>
    );
}

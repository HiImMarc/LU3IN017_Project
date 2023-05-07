import { Link } from "react-router-dom";
import './Logout.css'

// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Logout(props) {

    function Logout() {
        localStorage.removeItem('token');
        props.Logout()
    }

    return (
        <Link className='sidebar-button' to='/login' onClick={Logout} >
            <p>Déconnexion</p>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </Link>
    );
}

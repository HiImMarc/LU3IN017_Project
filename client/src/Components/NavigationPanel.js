import Login from './Login';
import Home from './Home';
import Authentification from './Authentification';

export default function NavigationPanel(props) {
    return (
        <nav id="navigation_pan">
            {props.isConnected ?
                <Home isConnected={props.isConnected} logout={props.logout} />
                :
                <Authentification login={props.login} />}
        </nav>
    )
}

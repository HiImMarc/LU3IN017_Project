import Login from './Login';
import Home from './Home';

export default function NavigationPanel(props){
    return (
        <nav id="navigation_pan">
            {props.isConnected ? 
            <Home isConnected={props.isConnected} logout={props.logout}/> 
            : 
            <Login login={props.login}/>}
        </nav>
    )
}

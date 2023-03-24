import Login from './Login'
import Home from './Home'

export default function NavigationPanel(props){
    console.log(props.isConnected);

    return (
        <nav id="navigation_pan">
            {props.isConnected ? <Home/> : <Login login={props.login}/>}
        </nav>
    )
}

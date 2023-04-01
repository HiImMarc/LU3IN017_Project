export default function Logout(props){
    return (
        <div>
            <button className="button" onClick={props.logout}>
                Déconnexion
            </button>
        </div>
    );
}

import { useEffect } from "react";
import "./header.css"
import { Link } from "react-router-dom";


function Header(prop) {
    useEffect(() => {
        if (localStorage.getItem("userType")) {
            document.getElementById(prop.local).style.background =  "rgb(128, 9, 54)";
        }
    }, [])

    return ( 
        <header>
            <div className="header-title">
                <h1>Puc Espaços</h1>
            </div>

            <nav>
                <Link className="nav-link" to="/reservations" id="reservations"> Reservas </Link>
                <Link className="nav-link" to="/facilities" id="facilities"> Espaços </Link>
                {                 
                    ((localStorage.getItem("userType") === "Administrador")) && 
                    <Link className="nav-link" to="/users" id="users" > Usuários </Link> 
                }
                
                <Link 
                    to="/" 
                    className="nav-link nav-link-leave"
                    onClick={() => localStorage.clear()}
                > Sair </Link>
            </nav>
        </header>
     );
}

export default Header;
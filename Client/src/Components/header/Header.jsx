import { useEffect } from "react";
import "./header.css"
import { Link } from "react-router-dom";


function Header(prop) {

    useEffect(() => {
        document.getElementById(prop.local).style.background =  "rgb(128, 9, 54)";
    }, [])

    return ( 
        <header>
            <div className="header-title">
                <h1>Puc Espaços</h1>
            </div>

            <nav>
                <div className="nav-main">
                    <Link to="/reservations" id="reservations"> Reservas </Link>
                    <Link to="/facilities" id="facilities"> Espaços </Link>
                    { // If                                              
                        localStorage.getItem("userType") === "DOCENTE" && 
                        <Link to="/users" id="users" > Usuários </Link> 
                    }
                </div>

                <Link 
                    to="/" 
                    className="nav-link"
                    onClick={() => localStorage.clear()}
                > Sair </Link>
            </nav>
        </header>
     );
}

export default Header;
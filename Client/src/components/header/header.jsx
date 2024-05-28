import "./header.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CardConfirmation from "../cardConfirmation/cardConfirmation";


function Header(prop) {
    const [triggerCardConfirmation, settriggerCardConfirmation] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("userType")) {
            document.getElementById(prop.local).style.background =  "rgb(128, 9, 54)";
        }
    }, [])

    function showCardConfirmation() {
        triggerCardConfirmation ? settriggerCardConfirmation(false) : settriggerCardConfirmation(true)
    }

    return ( 
        <header>
            <div className="header-title">
                <h1>Puc Espaços</h1>
                <h4>Seja bem-vindo(a) {localStorage.getItem("userName")}</h4>
            </div>

            <nav>
                {
                    ((localStorage.getItem("userType") !== "Discente")) && 
                    <Link className="nav-link" to="/reservations" id="reservations"> Reservas </Link>
                }
                <Link className="nav-link" to="/facilities" id="facilities"> Espaços </Link>
                {                 
                    ((localStorage.getItem("userType") === "Administrador")) && 
                    <Link className="nav-link" to="/users" id="users" > Usuários </Link> 
                }
                
                <Link 
                    className="nav-link nav-link-leave"
                    onClick={() => showCardConfirmation()}
                > Sair </Link>
            </nav>

            { triggerCardConfirmation &&
                <CardConfirmation 
                    message="Deseja sair?"
                    showConfirmationCard={showCardConfirmation}
                    action={() => {
                        window.location = "/";
                        localStorage.clear();
                    }}
                />
            }
        </header>
     );
}

export default Header;
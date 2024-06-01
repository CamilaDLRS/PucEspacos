import "./header.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileNavbar from "./mobile-navbar.js"

import CardConfirmation from "../cardConfirmation/cardConfirmation";


function Header(prop) {
    const [mobileNavbar, setMobileNavbar] = useState(new MobileNavbar(".mobile-menu", ".nav-list", ".nav-link"));

    useEffect(() => {
        if (localStorage.getItem("userType")) {
            document.getElementById(prop.local).style.background =  "rgb(128, 9, 54)";
        }
    }, [])

    useEffect(() => {
        setMobileNavbar(new MobileNavbar( ".mobile-menu", ".nav-list",".nav-link"))
    }, [])
    
    const [triggerCardConfirmation, settriggerCardConfirmation] = useState(false);
    function showCardConfirmation() {
        triggerCardConfirmation ? settriggerCardConfirmation(false) : settriggerCardConfirmation(true)
    }

    mobileNavbar.Init();
    console.log(mobileNavbar)
    return ( 
        <header>
            <div className="header-title">
                <h1 className="title">Puc Espaços</h1>
                <h4>Seja bem-vindo(a) {localStorage.getItem("userName")}</h4>
            </div>

            <div className="mobile-menu-area">
                <div className="mobile-menu">
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </div>
  
            <nav className="nav-list">
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
import { useState} from "react";
import InputForm from "./InputForm"
import Botao from "./Botao";
import "./Formularios.css";

function Login() {
    const [senhaTipo, setSenhaTipo,] = useState("password");

    return (
        <div className="container">
            <form action="#" method="get">
                <div className="divisaoLogin divisaoLoginCima">
                    <InputForm nomeCampo="E-mail" tipoInput="text"/>
                    <InputForm nomeCampo="Senha" tipoInput={senhaTipo}/>
                    
                    <Botao nomeBotao="Acessar" classBtn="btn-login"/>
                </div>
                <div className="divisaoLogin divisaoLoginBaixo">
                    <Botao nomeBotao="Criar um Conta" classBtn="btn-criar-conta"/>
                </div>
            </form>
        </div>
    )
}

export default Login
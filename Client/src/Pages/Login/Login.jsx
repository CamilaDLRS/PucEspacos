import Title from "../../Components/Title/Title";
import FormLogin from "../../Components/Forms/FormLogin"
import "./login.css"

function Login() {
    return ( 
        <div className="page-container">
            <Title />
            <FormLogin />
        </div>
     );
}

export default Login;
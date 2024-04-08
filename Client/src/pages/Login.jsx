import "./pages.css"
import Title from "../components/title/Title";
import FormLogin from "../components/forms/FormLogin"

function Login() {
    return ( 
        <div className="page-container">
            <Title />
            <FormLogin />
        </div>
     );
}

export default Login;
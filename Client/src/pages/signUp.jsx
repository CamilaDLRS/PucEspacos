import "./pages.css"
import { ToastContainer} from 'react-toastify';
import Title from "../components/title/title";
import FormSignUp from "../components/forms/formSignUp"

function SignUp() {
    if (localStorage.getItem("userType")) {
        window.location = "/reservations";
    }

    return ( 
        <div className="page-container-login">
            <Title />
            <FormSignUp />
            <ToastContainer />
        </div>
     );
}

export default SignUp;
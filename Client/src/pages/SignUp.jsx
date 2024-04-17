import "./pages.css"

import Title from "../components/title/Title";
import FormSignUp from "../components/forms/FormSignUp"

function SignUp() {
    if (localStorage.getItem("userType")) {
        window.location = "/reservations";
    }

    return ( 
        <div className="page-container">
            <Title />
            <FormSignUp />
        </div>
     );
}

export default SignUp;
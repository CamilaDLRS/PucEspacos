import "./pages.css"

import Title from "../components/title/Title";
import FormSignUp from "../components/forms/FormSignUp"

function SignUp() {
    return ( 
        <div className="page-container">
            <Title />
            <FormSignUp />
        </div>
     );
}

export default SignUp;
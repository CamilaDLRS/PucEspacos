import "./pages.css"

import Title from "../components/title/Title";
import FormSingUp from "../components/forms/FormSingUp"

function SingUp() {
    return ( 
        <div className="page-container">
            <Title />
            <FormSingUp />
        </div>
     );
}

export default SingUp;
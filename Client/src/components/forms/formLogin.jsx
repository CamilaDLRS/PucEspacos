import "./forms.css";
import {Formik, Form, Field, ErrorMessage} from "formik"
import { useState } from "react";
import { signInUserSchema } from "../../schemas/user";
import { Link } from "react-router-dom";
import Eye from "../../imgs/iconEye";
import EyeInvisible from "../../imgs/iconEyeInvisible";
import { login } from "../../services/user";

function FormLogin() {
    const [inputPasswordType, setInputPasswordType] = useState("password");
    const [iconEye, setIconEye] = useState(EyeInvisible);
    
    function showPassword() {
        if (inputPasswordType === "password") {
            setInputPasswordType("text")
            setIconEye(Eye)
        } else {
            setInputPasswordType("password")
            setIconEye(EyeInvisible)
        }
    }

    return ( 
        <Formik
            onSubmit={login}
            validationSchema={signInUserSchema}
            
            initialValues={{
                password: "",
                email: ""
            }}
        >   
            {() => (
                <Form className="login-container">
                    <Field name="email" type="text" placeholder="Email..."/>
                    <ErrorMessage name="email" component="div" className="error"/>
                    
                    <div className="input-password">
                        <Field 
                            name="password" 
                            placeholder="Senha..." 
                            type={inputPasswordType} 
                        />

                        <div onClick={showPassword} className="icon-eye">
                            {iconEye} 
                        </div>
                    </div>
                    <ErrorMessage name="password" component="div" className="error"/> 

                    <button type="submit">Acessar</button>
                    <div className="divider"></div>
                    <Link to="/signUp" className="button-sign-up"> Criar Conta </Link>
                </Form>
            )}
        </Formik>
    )
}


export default FormLogin;
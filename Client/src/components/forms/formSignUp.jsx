import "./forms.css";
import {Formik, Form, Field, ErrorMessage} from "formik"
import { useState } from "react";
import { createUserSchema } from "../../schemas/user";
import { Link } from "react-router-dom";
import Eye from "../../imgs/iconEye";
import EyeInvisible from "../../imgs/iconEyeInvisible";
import { signUp } from "../../services/user";

function FormSingUp() {
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
            onSubmit={signUp} 
            validationSchema={createUserSchema}

            initialValues={{
                userName: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            }}
        >   
            {() => (
                <Form className="login-container">
                    <Field name="userName" type="text" placeholder="Nome..."/>
                    <ErrorMessage name="userName" component="div" className="error"/>

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

                    <div className="input-password">
                        <Field 
                            name="passwordConfirmation" 
                            placeholder="Confirmar senha..." 
                            type={inputPasswordType} 
                        />
                        <div onClick={showPassword} className="icon-eye">
                            {iconEye} 
                        </div>
                    </div>
                    <ErrorMessage name="passwordConfirmation" component="div" className="error"/>

                    <button type="submit">Criar Conta</button>
                    <div className="divider"></div>
                    <Link to="/" className="button-sign-up"> Fazer Login </Link>
                </Form>
            )}
        </Formik>
    )
    
}

export default FormSingUp;
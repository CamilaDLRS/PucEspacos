import "./forms.css";
import {Formik, Form, Field, ErrorMessage} from "formik"
import { useState } from "react";
import { createUserSchema } from "../../schemas/user.schemas";
import { Link } from "react-router-dom";
import axios from 'axios';
import Eye from "../../imgs/IconEye";
import EyeInvisible from "../../imgs/IconEyeInvisible";


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

    async function handleSubmit(data) {
        const httpOptions = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        };

        return await axios
            .post("http://localhost:5001/users",
            JSON.stringify(data),
            httpOptions
            )
            .then((response) => {
                alert(response.data.message)
                window.location = "/"
            })
            .catch((e) => {
                alert(e.response.data.error.message)
            });
    }

    return (
        <Formik
            onSubmit={handleSubmit} 
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
                    <ErrorMessage name="userName" component="div"/>

                    <Field name="email" type="text" placeholder="Email..."/>
                    <ErrorMessage name="email" component="div"/>
                    
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
                    <ErrorMessage name="password" component="div"/>

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
                    <ErrorMessage name="passwordConfirmation" component="div"/>

                    <button type="submit">Criar Conta</button>
                    <div className="divider"></div>
                    <Link to="/" className="button-sign-up"> Fazer Login </Link>
                </Form>
            )}
        </Formik>
    )
    
}

export default FormSingUp;
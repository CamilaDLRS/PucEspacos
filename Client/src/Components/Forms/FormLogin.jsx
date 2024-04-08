import "./forms.css";
import {Formik, Form, Field, ErrorMessage} from "formik"
import { useState } from "react";
import { signInUserSchema } from "../../schemas/user.schemas";
import { Link } from "react-router-dom";
import axios from 'axios';
import Eye from "../../imgs/IconEye";
import EyeInvisible from "../../imgs/IconEyeInvisible";

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

    async function handleSubmit(data) {
        const httpOptions = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        };
        const password = data.password;
        const email = data.email;
        
        return await axios
            .get(`http://localhost:5001/users/signin?password=${password}&email=${email}`,
            httpOptions
            )
            .then((response) => {
                const data = response.data.data;
                localStorage.setItem("userType", data.userType)
                window.location = '/users'
            })
            .catch((e) => {
                alert(e.response.data.error.message);
            });
    }

    return ( 
        <Formik
            onSubmit={handleSubmit}
            validationSchema={signInUserSchema}
            
            initialValues={{
                password: "",
                email: ""
            }}
        >   
            {() => (
                <Form className="login-container">
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

                    <button type="submit">Acessar</button>
                    <div className="divider"></div>
                    <Link to="/SingUp" className="button-sign-up"> Criar Conta </Link>
                </Form>
            )}
        </Formik>
    )
}


export default FormLogin;
import "./pages.css";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Title from "../components/title/title";
import FormLogin from "../components/forms/formLogin";

function Login() {
  if (localStorage.getItem("userType")) {
    window.location = "/reservations";
  }

  useEffect(() => {
    setTimeout(() => {
        toast(localStorage.getItem("responseMessage"))
        localStorage.removeItem("responseMessage")
      }, 100)
  }, [localStorage.getItem("responseMessage")])

  return (
    <>
      {!localStorage.getItem("userType") &&
        <div className="page-container-login">
          <Title />
          <FormLogin />
          <ToastContainer />
        </div>
      }
    </>
  );
}

export default Login;

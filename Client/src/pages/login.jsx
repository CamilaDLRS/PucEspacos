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
      toast(localStorage.getItem("responseMessage"))
      setTimeout(() => {
        localStorage.removeItem("responseMessage")
      }, 2000)
  }, [localStorage.getItem("responseMessage")])

  return (
    <div className="page-container">
      <Title />
      <FormLogin />
      <ToastContainer />
    </div>
  );
}

export default Login;

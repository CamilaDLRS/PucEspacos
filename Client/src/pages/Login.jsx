import "./pages.css";
import Title from "../components/title/Title";
import FormLogin from "../components/forms/FormLogin";

function Login() {
  if (localStorage.getItem("userType")) {
    window.location = "/reservations";
  }

  return (
    <div className="page-container">
      <Title />
      <FormLogin />
    </div>
  );
}

export default Login;

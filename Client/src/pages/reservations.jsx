import "./pages.css";
import Header from "../components/header/Header";

function Reservations() {
  if (!localStorage.getItem("userType")) {
    window.location = "/users";
  }

  return (
    <>
      <Header local="reservations" />
    </>
  );
}

export default Reservations;

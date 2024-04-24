import "./pages.css";
import Header from "../components/header/header";

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

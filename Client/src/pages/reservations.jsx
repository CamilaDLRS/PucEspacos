import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";

function Reservations() {
  if (!localStorage.getItem("userType")) {
    window.location = "/users";
  }

  return (
    <>
      <Header local="reservations" />

      <div className="reservation-filter">
        <Inputs 
          inputs={[ 
            {
              type: "checkbox",
              label: "Minhas",
              id: "myReservations"
            },
            {
              type: "checkbox",
              label: "No Meu Nome",
              id: "myName"
            }, 
            {
              type: "date",
              label: "Inicio",
              id: "checkinDate"
            }, 
            {
              type: "date",
              label: "Fim",
              id: "checkoutDate"
            }
          ]}          
        />
      </div>
    </>
  );
}

export default Reservations;

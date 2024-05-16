import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";
import CardReservation from "../components/cardReservation/cardReservation";

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
              type: "date",
              label: "Inicio",
              id: "checkinDate"
            }, 
            {
              type: "date",
              label: "Fim",
              id: "checkoutDate"
            },
            {
              type: "select",
              onChange: (value) => console.log(value),
              title: "Blocos",
              options: [{key: 1, label: "Bloco 1", value:"2"}]
            },
            {
              type: "button",
              label: "Espaços",
              id: "butoon"
            }
          ]}          
        />
      </div>

      <CardReservation />
    </>
  );
}

export default Reservations;

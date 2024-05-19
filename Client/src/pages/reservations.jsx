import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";
import CardReservation from "../components/cardReservation/cardReservation";
import IconPlusCircle from "../imgs/iconPlusCircle"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardFacilityReserve from "../components/cardFacilityReserve/cardFacilityReserve"
import { ToastContainer, toast } from 'react-toastify';

function Reservations() {
  if (!localStorage.getItem("userType")) {
    window.location = "/users";
  }

  useEffect(() => {
    toast(localStorage.getItem("responseMessage"))
    setTimeout(() => {
      localStorage.removeItem("responseMessage")
    }, 100)
  }, [localStorage.getItem("responseMessage")])

  const [inputTemplate, setInputTemplate] = useState({
    userId: null,
    checkinDate: "",
    checkoutDate: "",
    buildingId: "null",
    facilitiesIdList: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]
  });

  const [triggerFacilityList, setTriggerFacilityList] = useState(false);

  function showFacilityList(event) {
    if (event.target.classList.contains("show-facility-list")) {
      triggerFacilityList ? setTriggerFacilityList(false) : setTriggerFacilityList(true);
    }
  }

  console.log(inputTemplate)

  return (
    <div>
      <Header local="reservations" />
      
      <div className="page-container">
        <Link to="/reservationsCreate" className="create-reservation-link"> 
          <div className="icon">
            Nova Reserva
            <IconPlusCircle className="icon" /> 
          </div>
        </Link>


        <div className="reservation-filter">
          <Inputs 
            inputTemplate={inputTemplate}
            setInputTemplate={setInputTemplate}
            triggerFunction={showFacilityList}
            inputs={[ 
              {
                type: "checkbox",
                label: "Minhas",
                id: "myReservations"
              },
              {
                type: "date",
                label: "Inicio",
                id: "checkinDate",
                value: inputTemplate.checkinDate,
                onChange: (value) => {
                  setInputTemplate({...inputTemplate, checkinDate: value, checkoutDate: ""})
                } 
              }, 
              {
                type: "date",
                label: "Fim",
                id: "checkoutDate",
                value: inputTemplate.checkoutDate,
                onChange: (value) => setInputTemplate({...inputTemplate, checkoutDate: value}),
                min: inputTemplate.checkinDate 
              },
              {
                type: "select",
                title: "Blocos",
                options: [{key: 1, label: "Bloco 1", value:"2"}] // lista blocos
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
      </div>

      {
        triggerFacilityList && 
        <CardFacilityReserve 
          triggerFunction={showFacilityList}
          facilitiesIdList={inputTemplate.facilitiesIdList}
        />
      }
      
      <ToastContainer />
    </div>
  );
}

export default Reservations;

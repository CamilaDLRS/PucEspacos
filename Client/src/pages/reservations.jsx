import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";
import CardReservation from "../components/cardReservation/cardReservation";
import IconPlusCircle from "../imgs/iconPlusCircle"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardFacilityReserve from "../components/cardFacilityReserve/cardFacilityReserve"
import { ToastContainer, toast } from 'react-toastify';

import FormEditReservation from "../components/formEditReservation/formEditReservation";

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

  //#region UPDATING

  const reservation = {
    responsibleUserId: "212270a5-cc6f-4040-a149-b44efc24e1a8",
    requestingUserId: null,
    facilityId: "e5e39abd-1554-477f-8786-6aa1741127c3",
    reservationStatus: "Aprovada",
    reservationPurpose: "Aula",
    checkinDate: 1711968600000,
    checkoutDate: 1711974000000,
    reservationId: "0b668249-0526-40da-832d-c5ac9d54e6fc",
    createdDate: 1716166583000,
    updatedDate: 1716166583000,
    requestingUserName: null,
    responsibleUserName: "Lucia",
    facilityName: "Sala de Estudos 2",
    buildingName: "2 - Azul"
  };

  const [reservationById, setReservationById] = useState();
  const [showFormEditReservation, setShowFormEditReservation] = useState(false);

  function showFormReservation(reservation, event) {
    if (event.target.classList.contains("showFormReservation")) {
      showFormEditReservation ? setShowFormEditReservation(false) : setShowFormEditReservation(true)
      setReservationById(reservation)
    }
  }
  //#endregion

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

        <CardReservation 
          reservation = { reservation }
          showFormReservation = {showFormReservation}
        />
      </div>

      {
        triggerFacilityList && 
        <CardFacilityReserve 
          triggerFunction={showFacilityList}
          facilitiesIdList={inputTemplate.facilitiesIdList}
        />
      }

        { showFormEditReservation && 
          <FormEditReservation 
            showFormReservation={showFormReservation} 
            reservation={reservationById}
          />
        }    
      
      <ToastContainer />
    </div>
  );
}

export default Reservations;

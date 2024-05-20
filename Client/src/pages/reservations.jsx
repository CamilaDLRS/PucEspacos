import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";
import CardReservation from "../components/cardReservation/cardReservation";
import IconPlusCircle from "../imgs/iconPlusCircle"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardFacilityReserve from "../components/cardFacilityReserve/cardFacilityReserve"
import { ToastContainer, toast } from 'react-toastify';
import { getAllReservations } from "../services/reservation";
import { getAllBuildings } from "../services/building";

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
    requestingUserId: "b2cb9978-4a50-4393-9985-eb8fad46f5f1",
    // onlyByRequestingUserId: true,
    checkinDate: null,
    checkoutDate: null,
    buildingId: null,
    facilitiesIdList: []
  });

  const [reservations, setReservations] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);

  useEffect(() => {
    getAllReservations().then((response) => setReservations(response));
    getAllBuildings().then((response) => setBuildings(response));
  }, []);

  useEffect(() => {
    const buildingFilterOptions = [];

    buildingFilterOptions.push(
      ...buildings.map((building) => {
        return { key: building.buildingId, value: building.buildingId, label: building.buildingName };
      })
    );
    setBuildingFilterOptions(buildingFilterOptions);
  }, [buildings]);

  const [triggerFacilityList, setTriggerFacilityList] = useState(false);

  function showFacilityList(event) {
    if (event.target.classList.contains("show-facility-list")) {
      triggerFacilityList ? setTriggerFacilityList(false) : setTriggerFacilityList(true);
    }
  }

  function convertToDateTime(timestamp) {
    const dtToday = new Date(timestamp);
    const year = dtToday.getFullYear().toString();
    var month = dtToday.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var day = dtToday.getDate() + 1;
    day = day < 10 ? "0" + day.toString() : day.toString();

    return `${year}-${month}-${day}`
  }

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
                value: convertToDateTime(inputTemplate.checkinDate),
                onChange: (value) => {
                  setInputTemplate({...inputTemplate, checkinDate: value, checkoutDate: null})
                } 
              }, 
              {
                type: "date",
                label: "Fim",
                id: "checkoutDate",
                value: convertToDateTime(inputTemplate.checkoutDate),
                onChange: (value) => setInputTemplate({...inputTemplate, checkoutDate: value}),
                min: convertToDateTime(inputTemplate.checkinDate)
              },
              {
                type: "select",
                title: "Blocos",
                options: buildingFilterOptions // lista blocos
              },
              {
                type: "button",
                label: "Espaços",
                id: "butoon"
              }
            ]}          
          />
        </div>

        {reservations &&
          reservations.map((reserve) => ( 
            <CardReservation 
              reserve={reserve} 
            />
          ))
        }
      </div>

      {
        triggerFacilityList && 
        <CardFacilityReserve 
          triggerFunction={showFacilityList}
          buildingId={inputTemplate.buildingId}
        />
      }
      
      <ToastContainer />
    </div>
  );
}

export default Reservations;

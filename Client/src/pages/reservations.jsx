import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";
import CardReservation from "../components/cardReservation/cardReservation";
import IconPlusCircle from "../imgs/iconPlusCircle"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardFacilityReserve from "../components/cardFacilityReserve/cardFacilityReserve"
import { toast } from 'react-toastify';
import { getReservations } from "../services/reservations";
import { getAllBuildings } from "../services/building";

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
    requestingUserId: null,
    responsibleUserId: null,
    onlyByResponsibleUserId: false,
    onlyByRequestingUserId: false,
    reservationStatus: null,
    buildingId: null,
    checkinDate: null,
    checkoutDate: null,
    facilityIds: []
  });

  useEffect(() => {
    if (localStorage.getItem("userType") === "Discente") {
      setInputTemplate({...inputTemplate, requestingUserId: localStorage.getItem("userId")})
    }

    if (localStorage.getItem("userType") === "Docente") {
      setInputTemplate({...inputTemplate, responsibleUserId: localStorage.getItem("userId")})
    }
  }, [])

  const [reservations, setReservations] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);

  useEffect(() => {
    getReservations(inputTemplate).then((response) => setReservations(response));
    getAllBuildings().then((response) => setBuildings(response));
  }, [inputTemplate]);

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

  const [itensPerPage, setItensPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  let pages = 0;
  let currentReservations = [];
  if (reservations) {
    pages = Math.ceil(reservations.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    currentReservations = reservations.slice(startIndex, endIndex);
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [itensPerPage])
  
  //#region UPDATING

  const reservation = {
    responsibleUserId: "212270a5-cc6f-4040-a149-b44efc24e1a8",
    requestingUserId: null,
    facilityId: "e5e39abd-1554-477f-8786-6aa1741127c3",
    reservationStatus: "Aprovada",
    reservationPurpose: "Aula",
    checkinDate: 1711968600000,
    checkoutDate: 1711975200000,
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
          <div>

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
                inputs={ [ ["Administrador", "Secretário", "Docente"].includes(localStorage.getItem("userType")) &&
                  {
                    type: "checkbox",
                    label: "Minhas",
                    id: "myReservations",
                    onChange: (value) => {
                      value 
                      ? setInputTemplate({...inputTemplate, responsibleUserId: localStorage.getItem("userId"), onlyByResponsibleUserId: true})
                      : localStorage.getItem("userType") === "Docente" 
                        ? setInputTemplate({...inputTemplate, responsibleUserId: localStorage.getItem("userId"),  onlyByResponsibleUserId: false})
                        : setInputTemplate({...inputTemplate, responsibleUserId: null,  onlyByResponsibleUserId: false})
                      
                      
                    }
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
                    title: "Todos Blocos",
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
            
            <div className="pages-filter-area"> 
              <div className="pages-filter">
                {Array.from(Array(pages), (item, index) => {
                  return (
                    <button 
                      value={index} 
                      onClick={(e) => setCurrentPage(Number(e.target.value))}
                      style={index === currentPage ? {background: "rgb(177, 173, 173)"} : null}
                    > {index + 1} </button >
                  )
                })} 
              </div>
              
              {reservations && reservations.length > 5 
               ? <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                  <option value={5}>5</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                </select>
               : <></>
              }
          </div>
      </div>
        {currentReservations.length > 0 
         ? currentReservations.map((reserve) => ( 
            <CardReservation 
              reservation={reserve} 
              showFormReservation={showFormReservation}
            />
          ))
         : <h2>Sem reservas </h2>
        }

      </div>

      {
        triggerFacilityList && 
        <CardFacilityReserve 
          triggerFunction={showFacilityList}
          buildingId={inputTemplate.buildingId}
          setInputTemplate={setInputTemplate}
          inputTemplate={inputTemplate}
        />
      }

        { showFormEditReservation && 
          <FormEditReservation 
            showFormReservation={showFormReservation} 
            reservation={reservationById}
          />
        }    
      
    </div>
  );
}

export default Reservations;

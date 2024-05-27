import "./pages.css";
import Header from "../components/header/header";
import Inputs from "../components/inputs/input";
import CardReservation from "../components/cardReservation/cardReservation";
import IconPlusCircle from "../imgs/iconPlusCircle"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardFacilityReserve from "../components/cardFacilityReserve/cardFacilityReserve"
import { getReservations } from "../services/reservations";
import { getAllBuildings } from "../services/building";
import { convertToDateString } from "../utils.js";
import FormEditReservation from "../components/formEditReservation/formEditReservation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reservations() {
  if (!localStorage.getItem("userType")) {
    window.location = "/users";
  } else if (localStorage.getItem("userType") === "Discente") {
    window.location = "/facilities";
  }

  useEffect(() => {
    toast(localStorage.getItem("responseMessage"))
    setTimeout(() => {
      localStorage.removeItem("responseMessage")
    }, 100)
  }, [localStorage.getItem("responseMessage")])

  const [inputTemplate, setInputTemplate] = useState({
    requestingUserId: localStorage.getItem("userType") === "Discente" ? localStorage.getItem("userId") : null,
    responsibleUserId: localStorage.getItem("userType") !== "Discente" ? localStorage.getItem("userId") : null,
    onlyByResponsibleUserId: localStorage.getItem("userType") !== "Discente" ? true : false,
    onlyByRequestingUserId: false,
    reservationStatus: null,
    buildingId: null,
    checkinDate: new Date().getTime(),
    checkoutDate:  new Date().getTime() + (7 * 24 * 60 * 60 * 1000),
    facilityIds: []
  });

  useEffect(() => {
    getAllBuildings().then((response) => setBuildings(response));
  }, [])

  const [search, setSearch] = useState();
  const [reservations, setReservations] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);

  useEffect(() => {
    getReservations(inputTemplate).then((response) => setReservations(response));
  }, [search]);

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
    <>
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
                  setSearch={setSearch}
                  search={search}
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
                      value: convertToDateString(inputTemplate.checkinDate),
                      onChange: (value) => {
                        if (value > inputTemplate.checkoutDate) {
                          setInputTemplate({...inputTemplate, checkinDate: value, checkoutDate: null})
                        }
                        else {
                          setInputTemplate({...inputTemplate, checkinDate: value})
                        }
                      } 
                    }, 
                    {
                      type: "date",
                      label: "Fim",
                      id: "checkoutDate",
                      value: convertToDateString(inputTemplate.checkoutDate),
                      onChange: (value) => setInputTemplate({...inputTemplate, checkoutDate: value}),
                      min: convertToDateString(inputTemplate.checkinDate)
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

          { currentReservations.length < 1 &&
            <>
              <h3>Sem Reservas com base nos filtros selecionados!</h3>
              <h3>Tente outros...</h3>
            </>

          }

          {currentReservations.map((reserve) => ( 
              <CardReservation 
                reservation={reserve} 
                showFormReservation={showFormReservation}
              />
            ))
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
      <ToastContainer />
    </>
  );
}

export default Reservations;

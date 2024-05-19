import "./pages.css";
import "../components/filters/filters.css";
import Header from "../components/header/header";
import { getAllFacilities, getAllFacilityTypes } from "../services/facility";
import { getAllBuildings } from "../services/building";
import CardFacility from "../components/cardFacility/cardFacility";
import Filters from "../components/filters/filters";
import { useEffect, useState } from "react";
import CardReadFacility from "../components/cardReadFacility/cardReadFacility";
import FormFacility from "../components/formFacility/formFacility";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormResrvationPurpose from "../components/formReservationPurpose/formReservationPurpose";
import CardReservationReview from "../components/cardReservationReview/cardReservationReview"

function Facilities() {
  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      window.location = "/";
    }
  })

  useEffect(() => {
      toast(localStorage.getItem("responseMessage"))
      setTimeout(() => {
        localStorage.removeItem("responseMessage")
      }, 100)
  }, [localStorage.getItem("responseMessage")])


  //Para implementacao em resrva INICIO

  const [showReserve, setShowReserve] = useState(false);
  const [showConfirmReserve, setShowConfirmReserve] = useState(false);
  //Para implementacao em resrva FIM

  const [facilities, setFacilities] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [facilityTypes, setFacilityTypes] = useState([]);

  const [buildingFilter, setBuildingFilter] = useState("");
  const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [typeFilterOptions, setTypeFilterOptions] = useState([]);

  const [showReadFacility, setShowReadFacility] = useState(false);
  const [facilityById, setFacilityById] = useState();

  const [triggerFacilityForm, setTriggerFacilityForm] = useState(false);

  useEffect(() => {
    getAllFacilities().then((response) => setFacilities(response));
    getAllBuildings().then((response) => setBuildings(response));
    getAllFacilityTypes().then((response) => setFacilityTypes(response));
  }, []);

  useEffect(() => {
    const buildingFilterOptions = [{ key: 0, value: "", label: "Todos" }];

    buildingFilterOptions.push(
      ...buildings.map((building) => {
        return { key: building.buildingId, value: building.buildingName, label: building.buildingName };
      })
    );
    setBuildingFilterOptions(buildingFilterOptions);
  }, [buildings]);

  useEffect(() => {
    const typeFilterOptions = [{ key: 0, value: "", label: "Todos" }];

    typeFilterOptions.push(
      ...facilityTypes.map((type) => {
        return { key: type.facilityTypeId, value: type.facilityTypeDescription, label: type.facilityTypeDescription };
      })
    );
    setTypeFilterOptions(typeFilterOptions);
  }, [facilityTypes]);


  const filteredFacilities = facilities.filter((facility) => {
    const buildingMatches = !buildingFilter || facility.buildingName === buildingFilter;
    const typeMatches = !typeFilter || facility.facilityTypeDescription === typeFilter;

    return buildingMatches && typeMatches;
  });

  //Para implementacao em resrva INICIO
  function showCardReserve(facility, event) {
    if (event.target.classList.contains("showReservationPurpose")) {
      showReserve ? setShowReserve(false) : setShowReserve(true);console.log("Reserva")
    }
    if (event.target.classList.contains("showConfirmReserve")) {
      showConfirmReserve ? setShowConfirmReserve(false) : setShowConfirmReserve(true);
      showReserve && setShowReserve(false);
      console.log("Reserva 2")
    }
    
  }
  //Para implementacao em resrva FIM

  function showFacility(facility, event) {
    if (event.target.classList.contains("showReadFacility")) {
      showReadFacility ? setShowReadFacility(false) : setShowReadFacility(true);
      setFacilityById(facility);
    }
    console.log("Espaco")
  }

  function showFacilityForm(facility, event) {
    if (event.target.classList.contains("show-form")) {
      triggerFacilityForm ? setTriggerFacilityForm(false) : setTriggerFacilityForm(true);
      setFacilityById(facility);
    }
  }

  return (
    <>
      <Header local="facilities" />
      <div className="page-container">
        <Filters
          filters={[
            {
              title: "Bloco",
              label: false,
              onChange: (value) => setBuildingFilter(value),
              options: buildingFilterOptions,
            },
            {
              title: "Tipo",
              onChange: (value) => setTypeFilter(value),
              options: typeFilterOptions,
            },
          ]}
          
          showAddButton={true}
          triggerFunction={showFacilityForm}
          addSomething="Adicionar Espaço"
        />

        {(localStorage.getItem("userType") === "Docente" ||
          localStorage.getItem("userType") === "Discente") 
          ? filteredFacilities.map((facility) => { 
            return facility.isActive ? (<CardFacility
              facility={facility}
              showFacility={showFacility}
              showFacilityForm={showFacilityForm}
            />) : <></>
          })
          : filteredFacilities.map((facility) => { 
            return (<CardFacility
              facility={facility}
              showFacility={showFacility}
              showFacilityForm={showFacilityForm}
            />)
          }) 
        }

        {triggerFacilityForm &&
          <FormFacility 
            facilityFunction={showFacilityForm}
            facility = {facilityById}
            buildings= {buildings}
            facilityTypes = {facilityTypes}
          />   
        }

        {showReadFacility &&
          <CardReadFacility
            showFacility={showFacility}
            facility={facilityById}
          />
        }
      </div>

      {/* //Para implementacao em resrva INICIO */}
      {showReserve &&
        <FormResrvationPurpose
          showCardReserve={showCardReserve}
        />
      }

      {showConfirmReserve &&
        <CardReservationReview
          showCardReserve = {showCardReserve}
        />
      }

      {/* //Para implementacao em resrva FIM */}

      <ToastContainer />
    </>
  );
}

export default Facilities;

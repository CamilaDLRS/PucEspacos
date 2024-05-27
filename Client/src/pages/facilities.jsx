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

  const [itensPerPage, setItensPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  let pages = 0;
  let currentFacilities = [];
  if (filteredFacilities) {
    pages = Math.ceil(filteredFacilities.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    currentFacilities = filteredFacilities.slice(startIndex, endIndex);
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
            
            {filteredFacilities && filteredFacilities.length > 5 
              ? <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
              : <></>
            }
        </div>



        {(localStorage.getItem("userType") === "Docente" ||
          localStorage.getItem("userType") === "Discente") 
          ? currentFacilities.map((facility) => { 
            return facility.isActive ? (<CardFacility
              facility={facility}
              showFacility={showFacility}
              showFacilityForm={showFacilityForm}
            />) : <></>
          })
          : currentFacilities.map((facility) => { 
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
            facility={facilityById}
            buildings={buildings}
            facilityTypes={facilityTypes}
          />
        }

        {showReadFacility &&
          <CardReadFacility
            showFacility={showFacility}
            facility={facilityById}
          />
        }
      </div>
      <ToastContainer />
    </>
  );
}

export default Facilities;

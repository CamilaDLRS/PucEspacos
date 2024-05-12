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

function Facilities() {
  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      window.location = "/";
    }
  })

  const [facilities, setFacilities] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [facilityTypes, setFacilityTypes] = useState([]);

  const [buildingFilter, setBuildingFilter] = useState("");
  const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [typeFilterOptions, setTypeFilterOptions] = useState([]);

  const [showReadFacility, setShowReadFacility] = useState(false);
  const [facilityById, setFacilityById] = useState();

  const [showEditFacility, setShowEditFacility] = useState(false);
  const [showCreateFacility, setShowCreateFacility] = useState(false);
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
  }

  // function editFacility(facility, event) {
  //   if (event.target.classList.contains("show-edit-form")) {
  //     showEditFacility ? setShowEditFacility(false) : setShowEditFacility(true);
  //     setFacilityById(facility);
  //   }
  // }

  // function createFacility(event) {
  //   console.log(event.target)
  //   if (event.target.classList.contains("show-create-form")) {
  //     showCreateFacility ? setShowCreateFacility(false) : setShowCreateFacility(true);
  //   }
  // }

  function showFacilityForm(facility, event) {
    if (event.target.classList.contains("show-form")) {
      triggerFacilityForm ? setTriggerFacilityForm(false) : setTriggerFacilityForm(true);
      setFacilityById(facility);
    }
  }

  return (
    <>
      <Header local="facilities" />

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


      {filteredFacilities.map((facility) => (
        <CardFacility
          facility={facility}
          showFacility={showFacility}
          showFacilityForm={showFacilityForm}
        />
      ))}

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
    </>
  );
}

export default Facilities;

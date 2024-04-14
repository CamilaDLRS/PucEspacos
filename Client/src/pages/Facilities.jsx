import "./pages.css";
import "../components/filters/filters.css";
import Header from "../components/header/Header";
import { getAllFacilities, getAllFacilityTypes } from "../services/facility";
import { getAllBuildings } from "../services/building";
import CardFacility from "../components/cardFacility/CardFacility";
import Filters from "../components/filters/filters";
import { useEffect, useState } from "react";

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
      />

      {filteredFacilities.map((facility) => (
        <CardFacility
          key={facility.id}
          facilityName={facility.facilityName}
          facilityType={facility.facilityTypeDescription}
          note={facility.note}
          capacity={facility.capacity}
          isActive={facility.isActive}
        />
      ))}
    </>
  );
}

export default Facilities;

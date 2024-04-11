import "./pages.css";
import Header from "../components/header/Header";
import { getAllFacilities } from "../services/facility";
import CardFacility from "../components/cardFacility/CardFacility";
import { useEffect, useState } from "react";

function Facilities() {
  if (!localStorage.getItem("userType")) {
    window.location = "/users";
  }
  
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
      async function fetchFacilities () {
          setFacilities(await getAllFacilities())
      }
      fetchFacilities()
  }, []);

  return (
    <>
      <Header local="facilities" />
      { facilities.map(facility => {
                return (
                    <CardFacility 
                      facilityName={facility.facilityName}
                      facilityType={facility.facilityTypeId}
                      note = {facility.note}
                      capacity = {facility.capacity}
                      isActive = {facility.isActive}
                    />
                )
            }) }
    </>
  );
}

export default Facilities;

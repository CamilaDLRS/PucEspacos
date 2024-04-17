import "./cardFacility.css";
import IconBxsEdit from "../../imgs/IconBxsEdit";
import IconPower from "../../imgs/IconPower";
import IconPersonFill from "../../imgs/IconPersonFill";
import CardConfirmation from "../cardConfirmation/CardConfirmation";
import { updateFacilityStatus } from "../../services/facility";
import { useState } from "react";


function CardFacility({ facility, showFacility, editFacility }) {

  const [showStausCard, setShowStausCard] = useState(false);    

  function showStatusCardConfirmation() {
    showStausCard ? setShowStausCard(false) : setShowStausCard(true);
  }

  return (
    <div className="card-facility">
      <div className="card-facility-header">
        <p> {facility.facilityName} </p>

        <div className="card-header-facility-type">
          <p> {facility.facilityType} </p>
          
          {facility.capacity ? <><IconPersonFill /> <p className="normal-font"> {facility.capacity} </p> </> : <p></p>}
        </div>
      </div>

      <div className="card-facility-body">
        {facility.note ? <p className="normal-font"> <strong>Observação:</strong>  {facility.note} </p> : <p></p>}
        <div className="card-facility-button showReadFacility" onClick={showFacility.bind(event, facility)}> Mais </div>
      </div>
        {
          (localStorage.getItem("userType") === "Administrador"
            || localStorage.getItem("userType") === "Secretário") &&
          <div className="card-facility-icons">       
            <IconPower 
              onClick={(e) => showStatusCardConfirmation()} 
              className="card-facility-icon" 
              color={facility.isActive ? "green" : "red"} 
            /> 
            <IconBxsEdit 
              className="card-facility-icon show-edit-form" 
              onClick={editFacility.bind(event, facility)} 
            />
          </div>
        }

        {showStausCard &&
          <CardConfirmation     
              message={ facility.isActive ? 
                "Tem certeza que deseja DESATIVAR este espaço? Todas as reservas registradas nele que ainda não ocorram serão canceladas." : 
                "Tem certeza que deseja ATIVAR este espaço?" 
              }
              showConfirmationCard={showStatusCardConfirmation}
              action={() => updateFacilityStatus(facility.facilityId, !facility.isActive)} 
          />
        }

    </div>
  );
}

export default CardFacility;

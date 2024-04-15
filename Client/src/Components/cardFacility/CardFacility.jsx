import IconBxsEdit from "../../imgs/IconBxsEdit";
import IconPower from "../../imgs/IconPower";
import IconTrash from "../../imgs/IconTrash";
import IconPersonFill from "../../imgs/IconPersonFill";
import "./cardFacility.css";

function CardFacility({ facility, showFacility, editFacility }) {

  return (
    <div className="card-facility">
      <div className="card-facility-header">
        <p> {facility.facilityName} </p>

        <div className="card-header-facility-type">
          <p> {facility.facilityType} </p>
          <IconPersonFill />
          <p> {facility.capacity} </p>
        </div>
      </div>

      <div className="card-facility-body">
        {facility.note ? <p className="normal-font"> <strong>Observação:</strong>  {facility.note} </p> : <p></p>}
        <div className="card-facility-button showReadFacility" onClick={showFacility.bind(event, facility)}> Mais </div>
      </div>
      {
        (localStorage.getItem("userType") === "Administrador"
          || localStorage.getItem("userType") === "Docente") &&
        <div className="card-facility-icons">
          {facility.isActive ? <IconPower className="card-facility-icon" color="green" /> : <IconPower className="card-facility-icon" color="red" />}
          <IconBxsEdit className="card-facility-icon show-edit-form" onClick={editFacility.bind(event, facility)} />
          <IconTrash className="card-facility-icon" />
        </div>
      }

    </div>
  );
}

export default CardFacility;

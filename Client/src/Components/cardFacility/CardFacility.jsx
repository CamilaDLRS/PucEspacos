import IconBxsEdit from "../../imgs/IconBxsEdit";
import IconPower from "../../imgs/IconPower";
import IconTrash from "../../imgs/IconTrash";
import IconPersonFill from "../../imgs/IconPersonFill";
import "./cardFacility.css";

function CardFacility(prop) {
  return (
    <div className="card-facility">
      <div className="card-facility-header">
        <p> {prop.facilityName} </p>

        <div className="card-header-facility-type">
          <p> {prop.facilityType} </p>
          <p> {prop.capacity} </p>
          <IconPersonFill />
        </div>
      </div>

      <div className="card-facility-body">
         {prop.note ? <p className="normal-font"> <strong>Observação:</strong>  {prop.note} </p> : <p></p>}
         <div className="card-facility-button"> Mais </div>
      </div>
        <div className="card-facility-icons">
          {prop.isActive ? <IconPower className="card-facility-icon" color="green" /> : <IconPower className="card-facility-icon" color="red" />}
          <IconBxsEdit className="card-facility-icon" />
          <IconTrash />
        </div>
    </div>
  );
}

export default CardFacility;

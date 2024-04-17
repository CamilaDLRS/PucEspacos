import IconPersonFill from "../../imgs/IconPersonFill";
import "./cardReadFacility.css";

function CardReadFacility({ facility, showFacility }) {
  console.log(facility);
  return (
    <div className="container-absolute showReadFacility" onClick={showFacility.bind(event, "")}>
      <div className="read-facility">
        <div className="title-container">
          <h1> {facility.facilityName} </h1>
          <div className="icon-container">
            <IconPersonFill />
            <p> {facility.capacity} </p>
          </div>
        </div>
        <div className="title-container">
          <h3> {facility.buildingName} </h3>
          <h3> {facility.facilityTypeDescription} </h3>
        </div>
        {facility.note ? (
          <p className="normal-font">
            {" "}
            <strong>Observação:</strong> {facility.note}{" "}
          </p>
        ) : (
          <p></p>
        )}

        {facility.assets.length > 0 ? (
          <div className="normal-font">
            <strong>Ativos:</strong>
            {facility.assets.map((asset) => (
              <p className="list-item" >
                {asset.quantity} {asset.assetDescription}{" "}
              </p>
            ))}
          </div>
        ) : (
          <strong>Não há ativos registrados</strong>
        )}
      </div>
    </div>
  );
}

export default CardReadFacility;

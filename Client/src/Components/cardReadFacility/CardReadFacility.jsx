import IconPersonFill from "../../imgs/IconPersonFill"
import "./cardReadFacility.css";

function CardReadFacility({facility, showFacility}) {
  console.log(facility)
  return ( 
    <div className="container-absolute showReadFacility" onClick={showFacility.bind(event, "")}>
        <div className="read-facility"> 
        <h1> {facility.facilityName} </h1>
         <IconPersonFill />
           <p> {facility.capacity} </p>
         <h3> {facility.buildingName} </h3>
         <h3> {facility.facilityTypeDescription} </h3>
         {facility.note ? <p className="normal-font"> <strong>Observação:</strong>  {facility.note} </p> : <p></p>}

         {facility.assets.length > 0 ? 
           <div className="normal-font"> 
              <strong>Ativos:</strong>  
              { facility.assets.map((asset) => (
                  <p>{asset.quantity}   {asset.assetDescription} </p>               
                ))
              }
           </div> : 
           <strong>Não há ativos registrados</strong>
         }
        </div>
    </div>
  );
}

export default CardReadFacility;
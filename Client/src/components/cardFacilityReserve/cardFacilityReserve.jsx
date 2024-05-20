import "./cardFacilityReserve.css";
import { getAllBuildById } from "../../services/building";
import { useEffect, useState } from "react";

function CardFacilityReserve({buildingId, triggerFunction}) {
    const [build, setBuild] = useState()

    useEffect(() => {
        getAllBuildById(buildingId, true).then((response) => setBuild(response));
    }, [])

    console.log(build);

    return ( 
        <div className="container-absolute show-facility-list" onClick={triggerFunction}>
            <div className="facility-list-area">
                <div className="header-facility-reserve">
                    <h1>Espaços</h1>
                    <h3>{build && build.buildingName}</h3>
                </div>

                
                <div className="facilities-area">
                    {build && build.facilities.map(facility => (
                        <label htmlFor="" className="input-checkbox">
                            <input type="checkbox" name="" id={facility.facilityId} />
                            {facility.facilityName}
                        </label>
                    ))}
                </div>


                <div className="btn-area">
                    <div className="show-facility-list" onClick={triggerFunction}>Cancelar</div>
                    <div>Confirmar</div>
                </div>
            </div>
        </div>
     );
}

export default CardFacilityReserve;
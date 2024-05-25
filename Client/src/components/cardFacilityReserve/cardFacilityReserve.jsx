import "./cardFacilityReserve.css";
import { getAllBuildById } from "../../services/building";
import { useEffect, useState } from "react";

function CardFacilityReserve({buildingId, triggerFunction, setInputTemplate, inputTemplate}) {
    const [build, setBuild] = useState()
    const [checkedFacilities, setCheckedFacilities] = useState([...inputTemplate.facilityIds]);

    useEffect(() => {
        getAllBuildById(buildingId, true).then((response) => setBuild(response));
    }, [])

    useEffect(() => {

        if (build) {
            build.facilities.map((facility) => {
                document.querySelector(`#${facility.facilityId}`).checked = true ;
            })
        }

    }, [build])


    return ( 
        <div className="container-absolute show-facility-list" onClick={triggerFunction}>
            <div className="facility-list-area">
                <div className="header-facility-reserve">
                    <h1>Espaços</h1>
                    <h3>{build && build.buildingName}</h3>
                </div>

                
                <div className="facilities-area">
                    {build && build.facilities.map(facility => (
                        <label htmlFor={facility.facilityId} className="input-checkbox">
                            <input 
                                type="checkbox" 
                                name="" 
                                id={facility.facilityId}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckedFacilities([...checkedFacilities, facility.facilityId])  
                                    } else {
                                        setCheckedFacilities(checkedFacilities.filter(facilityId => facilityId !== facility.facilityId))
                                    }
                                }} 
                            />
                            {facility.facilityName}
                        </label>
                    ))}
                </div>


                <div className="btn-area">
                    <div className="show-facility-list" onClick={triggerFunction}>Cancelar</div>
                    <div className="show-facility-list" onClick={() => {
                        // triggerFunction();
                        setInputTemplate({...inputTemplate, facilityIds: checkedFacilities});
                    }}>Confirmar</div>
                </div>
            </div>
        </div>
     );
}

export default CardFacilityReserve;
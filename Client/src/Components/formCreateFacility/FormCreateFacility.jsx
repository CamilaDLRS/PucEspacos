import "./formCreateFacility.css";
import Filters from "../filters/filters"
import { useState, useEffect } from "react";

function FormCreateFacility ({triggerFunction, buildings, facilityTypes}) {

    const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);

    useEffect(() => {
        const buildingFilterOptions = [];

        buildingFilterOptions.push(
            ...buildings.map((building) => {
                return { key: building.buildingId, value: building.buildingId, label: building.buildingName };
            })
        );
        setBuildingFilterOptions(buildingFilterOptions);
    }, [buildings]);

    useEffect(() => {
        const typeFilterOptions = [];

        typeFilterOptions.push(
            ...facilityTypes.map((type) => {
                return { key: type.facilityTypeId, value: type.facilityTypeId, label: type.facilityTypeDescription };
            })
        );
        setTypeFilterOptions(typeFilterOptions);
    }, [facilityTypes]);


    return (
        <div className="container-absolute show-create-form" onClick={triggerFunction}>
            <div className="form-create-facility">
                <input type="text" placeholder="Nome do Bloco..." />
                
                <div>
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
                    
                </div>

                <input type="text" />

                <select name="" id="">
                    <option value=""> Ativos </option>
                </select>

                <div className="btn-area">
                    <div> Cancelar </div>
                    <div> Criar </div>
                </div>
            </div>
        </div>
    )
}

export default FormCreateFacility;
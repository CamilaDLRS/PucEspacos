import "./formCreateFacility.css";
import Filters from "../filters/filters"
import { useState, useEffect } from "react";
import { getAllAssets } from "../../services/asset";
import {Formik, Form, Field, ErrorMessage} from "formik"
import {createFacilitySchema} from "../../schemas/facility"

function FormCreateFacility ({triggerFunction, buildings, facilityTypes}) {

    const [facilityCreate, setFacilityCreate] = useState({
        facilityName: '',
        note: '',
        capacity: '',
        buildingId: '',
        facilityTypeId: '',
        isActive: false,
        assets: []
    });

    const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);
    const [allAssets, setAllAssets] = useState([]);


    useEffect(() => {
        getAllAssets().then((response) => {setAllAssets(response)});
    }, [])

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

    console.log(facilityCreate)


    return (
        <div className="container-absolute show-create-form" onClick={triggerFunction}>
            <Formik
            onSubmit={() => console.log("enviado")}
            validationSchema={createFacilitySchema}
            
            initialValues={{
                facilityName: "",
                note: "",
            }}
        >   
            {() => (
                <Form className="form-create-facility">
                <Field
                    name="facilityName" 
                    type="text" 
                    placeholder="Nome do Bloco..." 
                    onChange={(e) => setFacilityCreate({...facilityCreate, facilityName: e.target.value})}
                />
                
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

                <input 
                    name="note"
                    type="text" 
                    placeholder="Observação"
                    onChange={(e) => setFacilityCreate({...facilityCreate, note: e.target.value})}
                />

                <select 
                    onChange={(e) => {
                        console.log(e.target.value)
                        const assetFilter = allAssets.filter((asset) => {asset.assetId === e.target.value});
                        console.log(assetFilter)
                    }}
                >
                    <option value=""> Ativos </option>
                    {
                        allAssets.map((asset) => (
                            <option value={asset.assetId}> {asset.assetDescription} </option>
                        ))
                    }
                </select>

                {
                    facilityCreate.assets.length > 0 &&
                    facilityCreate.assets.map((asset) => (
                        <div>
                            {asset.assetDescription}
                        </div>
                    ))
                }

                <div className="btn-area">
                    <div> Cancelar </div>
                    <div> Criar </div>
                </div>
                </Form>
            )}
        </Formik>
            
        </div>
    )
}

export default FormCreateFacility;
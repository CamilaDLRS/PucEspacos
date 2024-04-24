import "./formCreateFacility.css";
import Filters from "../filters/filters"
import { useState, useEffect } from "react";
import { getAllAssets } from "../../services/asset";
import IconTrash from "../../imgs/IconTrash";
import IconPersonFill from "../../imgs/IconPersonFill";
import CardConfirmation from "../cardConfirmation/CardConfirmation";
import { createFacility } from "../../services/facility";

function FormCreateFacility ({triggerFunction, buildings, facilityTypes}) {

    const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);

    const [allAssets, setAllAssets] = useState([]);
    const [currentAssets, setCurrentAssets] = useState([]);

    const [showCard, setShowCard] = useState(false);    

    const [facilityCreate, setFacilityCreate] = useState({
        facilityName: '',
        note: '',
        capacity: null,
        buildingId: '',
        facilityTypeId: '',
        isActive: true,
        assets: []
    });

    useEffect(() => {
        getAllAssets().then((response) => {setAllAssets(response)});
        setCurrentAssets(allAssets)
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

    useEffect(() => {
        const filteredAssets = allAssets.filter(
            asset => !facilityCreate.assets.some(facilityAsset => facilityAsset.assetId === asset.assetId)
        );
        setCurrentAssets(filteredAssets);
        
    }, [facilityCreate.assets, allAssets]);

    function deleteAsset(assetDeleted) {
        if (facilityCreate.assets.length > 0) {
            const newFacilities = facilityCreate.assets.filter(asset => asset.assetId != assetDeleted.assetId);
            setFacilityCreate({ ...facilityCreate, assets: newFacilities});
        }
    }   

    function showConfirmationCard() {
        showCard ? setShowCard(false) : setShowCard(true);
    }

    function createNewFacility() {
        if (validate()) {
            showConfirmationCard();
        }
    }

    const [errors, setErrors] = useState({
        facilityName: '',
        capacity: '',
        building: '',
        facilityType: '',
        assets: []
    });

    const validate = () => {
        let isValid = true;
        const newErrors = {
            facilityName: '',
            capacity: '',
            building: '',
            facilityType: '',
            assets: []
        };
    
        // Validando facilityName
        if (!facilityCreate.facilityName.trim()) {
            newErrors.facilityName = 'O nome do espaço é obrigatório.';
            isValid = false;
        }

        // Validando capacity
        if (facilityCreate.capacity) {
            if (facilityCreate.capacity <= 0) {
                newErrors.capacity = 'Capacidade do espaço não pode ser negativo';
                isValid = false;
            }
            else if (Number(facilityCreate.capacity) > 2000) {
                newErrors.capacity = 'Capacidade máxima 2000.';
                isValid = false;
            }
        }

        // Validando Bloco 
        if (facilityCreate.buildingId === "") {
            newErrors.building = 'Selecione um bloco';
            isValid = false;
        }
 
        // Validando tipoespaco
        if (facilityCreate.facilityTypeId === "") {
            newErrors.facilityType = 'Selecione um tipo';
            isValid = false;
        }


        // Validando assets
        const assetErrors = facilityCreate.assets.map((asset, index) => {
            if (!Number.isInteger(Number(asset.quantity)) || Number(asset.quantity) < 1) {
                return `A quantidade do ativo deve ser um número inteiro positivo.`;
            }
            return '';
        });

        if (assetErrors.some(error => error)) {
            newErrors.assets = assetErrors;
            isValid = false;
        }
        
        console.log(newErrors);
        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="container-absolute show-create-form" onClick={triggerFunction}>
                <div className="form-create-facility">

                    <div className="form-edit-selects">
                        <input
                            name="facilityName" 
                            type="text" 
                            placeholder="Nome do Espaço..." 
                            className="facility-name"
                            onChange={(e) => {
                                setFacilityCreate({...facilityCreate, facilityName: e.target.value})
                                setErrors({ ...errors, facilityName: '' });
                            }}
                        />
                        {errors.facilityName && <span className="error">{errors.facilityName}</span>}
                
                        <div className="facility-capacity">
                            <IconPersonFill />
                            <input
                                type="number"
                                value={facilityCreate.capacity}
                                onChange={(event) => {
                                        setFacilityCreate({ ...facilityCreate, capacity: event.target.value || null });
                                        setErrors({ ...errors, capacity: '' });
                                    }
                                }
                            />
                            {errors.capacity && <span className="error">{errors.capacity}</span>}
                        </div>
                    </div>
                    
                    
                    <div>
                        <Filters 
                            filters={[
                                {
                                    title: "Bloco",
                                    label: false,
                                    onChange: (value) =>{ 
                                        setFacilityCreate({...facilityCreate, buildingId: value});
                                        setErrors({ ...errors, building: '' });
                                    },
                                    options: buildingFilterOptions,
                                },
                                {
                                    title: "Tipo",
                                    onChange: (value) => {
                                        setFacilityCreate({...facilityCreate, facilityTypeId: value});
                                        setErrors({ ...errors, facilityType: '' });
                                    },
                                    options: typeFilterOptions,
                                },
                            ]}
                        />

                        <div className="error-filters">  
                            {errors.building && <span className="error">{errors.building}</span>}
                            {errors.facilityType && <span className="error">{errors.facilityType}</span>}
                        </div>
                    </div>

                    <input 
                        name="note"
                        type="text" 
                        placeholder="Observação"
                        onChange={(e) => setFacilityCreate({...facilityCreate, note: e.target.value})}
                    />

                    <select 
                        onChange={(e) => {
                            if (e.target.value !== "" && currentAssets.length > 0) {
                                const assetFilter = currentAssets.find((asset) => asset.assetId == e.target.value);
                                assetFilter.quantity = '';
                                setFacilityCreate({...facilityCreate, assets: [...facilityCreate.assets, assetFilter]})
                            }
                        }}
                    >
                        <option value=""> Ativos </option>
                        {
                            currentAssets.map((asset) => (
                                <option value={asset.assetId}> {asset.assetDescription} </option>
                            ))
                        }
                    </select>

                    {
                        facilityCreate.assets.map((asset, index) => (
                            <>
                            <div className="facilty-assets" key={index}>
                                <div className="facility-assets-info">
                                    <input 
                                        type="number" 
                                        value={asset.quantity} 
                                        placeholder="0"
                                        onChange={(e) => { 
                                            asset.quantity = e.target.value;   
                                            setFacilityCreate({...facilityCreate, assets: [...facilityCreate.assets]});
                                        }}
                                        />
                                    <p>{asset.assetDescription}</p>
                                </div>
                                <IconTrash className="icon-trash" onClick={(e) => {deleteAsset(asset)}} />
                            </div>
                            {errors.assets[index] && <span className="error">{errors.assets[index]}</span>}
                            </>
                        ))
                    }

                    <div className="btn-area">
                        <div className="show-create-form" onClick={triggerFunction}> Cancelar </div>
                        <div onClick={() => createNewFacility()}> Criar </div>
                    </div>
                </div>

                { 
                    showCard &&
                    <CardConfirmation 
                        message="Tem certeza que deseja criar este espaço?"
                        showConfirmationCard={showConfirmationCard}
                        action={() => createFacility(facilityCreate)} 
                    />
                }
        </div>
    )
}

export default FormCreateFacility;
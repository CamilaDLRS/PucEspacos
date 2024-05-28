import "./formFacility.css"
import IconPersonFill from "../../imgs/iconPersonFill";
import IconTrash from "../../imgs/iconTrash";
import Filters from "../filters/filters";
import { useEffect, useState } from "react";
import { getAllAssets } from "../../services/asset";
import { getFacilityById, updateFacility, createFacility } from "../../services/facility";
import CardConfirmation from "../cardConfirmation/cardConfirmation";

function FormEditFacility({ facility, facilityFunction, buildings, facilityTypes }) {

    const [facilityTemplate, setFacilityTemplate] = useState({
        facilityName: '',
        note: '',
        capacity: null,
        buildingId: '',
        facilityTypeId: '',
        isActive: true,
        assets: []
    });

    const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);

    const [allAssets, setAllAssets] = useState([]);
    const [currentAssets, setCurrentAssets] = useState([]);
    const [showCard, setShowCard] = useState(false);    

    function showConfirmationCard() {
        showCard ? setShowCard(false) : setShowCard(true);
    }

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
        getAllAssets().then((response) => {setAllAssets(response)});
        
        if (facility) {
            getFacilityById(facility.facilityId).then((response) => {
                setFacilityTemplate({
                    facilityName: response.facilityName,
                    note: response.note,
                    capacity: response.capacity,
                    buildingId: response.buildingId,
                    facilityTypeId: response.facilityTypeId,
                    isActive: response.isActive,
                    assets: response.assets
                });
            });
        }
    }, [])

    useEffect(() => {
        const filteredAssets = allAssets.filter(
            asset => !facilityTemplate.assets.some(facilityAsset => facilityAsset.assetId === asset.assetId)
        );
        setCurrentAssets(filteredAssets);
        
    }, [facilityTemplate.assets, allAssets]);

    const onChangeSelectAssets = (selectedAssetId) => {
        if (currentAssets.length > 0 && selectedAssetId !== "") {
            const selectedAsset = currentAssets.find(asset => asset.assetId === selectedAssetId);
            setFacilityTemplate({ ...facilityTemplate, assets: [selectedAsset, ...facilityTemplate.assets]});
        }
    };

    function deleteAsset(assetDeleted) {
        if (facilityTemplate.assets.length > 0) {
            const newFacilities = facilityTemplate.assets.filter(asset => asset.assetId != assetDeleted.assetId);
            setFacilityTemplate({ ...facilityTemplate, assets: newFacilities});
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
            assets: []
        };
    
        // Validando facilityName
        if (!facilityTemplate.facilityName || !facilityTemplate.facilityName.trim()) {
            newErrors.facilityName = 'O nome do espaço é obrigatório.';
            isValid = false;
        }

        // Validando capacity
        if (facilityTemplate.capacity) {
            if (!Number.isInteger(Number(facilityTemplate.capacity)) || Number(facilityTemplate.capacity) < 1) {
                newErrors.capacity = 'A capacidade deve ser um número inteiro positivo.';
                isValid = false;
            }
            else if (Number(facilityTemplate.capacity) > 2000) {
                newErrors.capacity = 'Capacidade máxima 2000.';
                isValid = false;
            }
        }

        // Validando bloco 
        if (facilityTemplate.buildingId === "") {
            newErrors.building = 'Selecione um bloco';
            isValid = false;
        }
    
        // Validando tipoespaco
        if (facilityTemplate.facilityTypeId === "") {
            newErrors.facilityType = 'Selecione um tipo';
            isValid = false;
        }

        const assetErrors = facilityTemplate.assets.map((asset, index) => {
            if (!Number.isInteger(Number(asset.quantity)) || Number(asset.quantity) < 1) {
                return `A quantidade do ativo deve ser um número inteiro positivo.`;
            }
            return '';
        });

        if (assetErrors.some(error => error)) {
            newErrors.assets = assetErrors;
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    function validateFields() {
        if (validate()) {
            showConfirmationCard();
        }
    }

    return ( 
        <div className="container-absolute show-form" onClick={facilityFunction.bind(event, null)}>
            <div className="form-facility">
                <div className="facitityName-capacity">
                    <input
                        name="facilityName" 
                        type="text" 
                        placeholder= "Nome do espaço..."
                        value={facilityTemplate.facilityName}
                        onChange={(event) => {
                            setFacilityTemplate({...facilityTemplate, facilityName: event.target.value})
                            setErrors({ ...errors, facilityName: '' });
                        }}
                        className="facility-name"
                    />

                    <div className="facility-capacity">
                        <IconPersonFill className="icon-person"/>
                        <input
                            type="number"
                            value={facilityTemplate.capacity}
                            onChange={(event) => {
                                if (event.target.value.length > 4) {
                                    event.target.value = event.target.value.slice(0, 4)
                                };
                                setFacilityTemplate({...facilityTemplate, capacity: event.target.value || null});
                                setErrors({ ...errors, capacity: '' });
                            }}
                        />
                    </div>
                </div>

                <div className="error-area">  
                    {errors.facilityName ? <span className="error">{errors.facilityName}</span> : <span className="error"></span>}
                    {errors.capacity ? <span className="error">{errors.capacity}</span> : <span className="error"></span>}
                </div>

                <div>
                    <Filters 
                        filters={[
                            {
                                title: facility ? facility.buildingName : "Bloco",
                                label: false,
                                onChange: (value) =>{ 
                                    setFacilityTemplate({...facilityTemplate, buildingId: value})
                                    setErrors({ ...errors, building: '' });
                                },
                                options: buildingFilterOptions,
                            },
                            {
                                title: facility ? facility.facilityTypeDescription : "Tipo",
                                onChange: (value) => {
                                    setFacilityTemplate({...facilityTemplate, facilityTypeId: value})
                                    setErrors({ ...errors, facilityType: '' });
                                },
                                options: typeFilterOptions,
                            },
                        ]}
                    />

                    <div className="error-area">  
                            {errors.building ? <span className="error">{errors.building}</span> : <span className="error"></span>}
                            {errors.facilityType ? <span className="error">{errors.facilityType}</span> : <span className="error"></span>}
                    </div>
                </div>

                <input 
                    name="note"
                    type="text" 
                    placeholder="Observação..."
                    value={facilityTemplate.note}
                    onChange={(e) => setFacilityTemplate({...facilityTemplate, note: e.target.value})}
                />

                <select 
                    className="filter-select"   
                    onChange={(e) => {
                        onChangeSelectAssets(e.target.value)
                    }}
                    >
                    <option value="" > Ativos </option>
                    {
                        currentAssets.map((asset) => (
                            <option value={asset.assetId}> {asset.assetDescription} </option>
                        ))
                    }
                </select>


                <div className="choosed-assets">
                    {
                        facilityTemplate.assets.map((asset, index) => (
                            <>
                            <div className="facilty-assets" key={index}>
                                <div className="facility-assets-info">
                                    <input 
                                        type="number" 
                                        value={asset.quantity ? asset.quantity : ''} 
                                        placeholder="0"
                                        onChange={(e) => { 
                                            if (e.target.value.length > 4) {
                                                e.target.value = e.target.value.slice(0, 4)
                                            }
                                            asset.quantity = e.target.value;   
                                            setFacilityTemplate({...facilityTemplate, assets: [...facilityTemplate.assets]});
                                            setErrors({ ...errors, assets: errors.assets.map((err, i) => i === index ? '' : err) });
                                        }}
                                        />
                                    <p>{asset.assetDescription}</p>
                                </div>
                                <IconTrash className="icon icon-trash" onClick={(e) => {
                                    deleteAsset(asset)
                                }}/>
                            </div>
                            {errors.assets[index] && <span className="error">{errors.assets[index]}</span>}
                            </>
                        ))
                    }
                </div>
                

                <div className="btn-area">
                    <div className="show-form" onClick={facilityFunction.bind(event, null)}> Cancelar </div>
                    <div onClick={validateFields} > {facility ? "Editar" : "Criar"} </div>
                </div>
            </div>

            { 
                showCard &&
                <CardConfirmation 
                    message={facility ? "Tem certeza que deseja editar este espaço?" : "Tem certeza que deseja criar este espaço?"}
                    showConfirmationCard={showConfirmationCard}
                    action={() => facility ? updateFacility(facility.facilityId, facilityTemplate) :  createFacility(facilityTemplate)} 
                />
            }
        </div>
    );
}

export default FormEditFacility;

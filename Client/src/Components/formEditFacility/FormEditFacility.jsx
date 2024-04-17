import "./formEditFacility.css";
import IconPersonFill from "../../imgs/IconPersonFill";
import IconTrash from "../../imgs/IconTrash";
import Filters from "../filters/filters";
import { useEffect, useState } from "react";
import { getAllAssets } from "../../services/asset";
import { getFacilityById, updateFacility } from "../../services/facility";
import CardConfirmation from "../cardConfirmation/CardConfirmation";

function FormEditFacility({ facility, buildings, facilityTypes, editFacility }) {

    const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);

    const [allAssets, setAllAssets] = useState([]);
    const [currentAssets, setCurrentAssets] = useState([]);
    const [showCard, setShowCard] = useState(false);    

    const [facilityEdit, setFacilityEdit] = useState({
        facilityName: '',
        note: '',
        capacity: '',
        buildingId: '',
        facilityTypeId: '',
        isActive: false,
        assets: []
    });

    const [errors, setErrors] = useState({
        facilityName: '',
        capacity: '',
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
        if (!facilityEdit.facilityName.trim()) {
            newErrors.facilityName = 'O nome do espaço é obrigatório.';
            isValid = false;
        }

        // Validando capacity
        if (!Number.isInteger(Number(facilityEdit.capacity)) || Number(facilityEdit.capacity) < 1) {
            newErrors.capacity = 'A capacidade deve ser um número inteiro positivo.';
            isValid = false;
        }
        else if (Number(facilityEdit.capacity) > 2000) {
            newErrors.capacity = 'Capacidade máxima 2000.';
            isValid = false;
        }

        // Validando assets
        const assetErrors = facilityEdit.assets.map((asset, index) => {
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

    const saveFacility = () => {
        if (validate()) {
            updateFacility(facility.facilityId, facilityEdit);
            setShowCard(false);
        }
    };

    useEffect(() => {
        getAllAssets().then((response) => {setAllAssets(response)});
         getFacilityById(facility.facilityId).then((response) => {
            setFacilityEdit({
                facilityName: response.facilityName,
                note: response.note,
                capacity: response.capacity,
                buildingId: response.buildingId,
                facilityTypeId: response.facilityTypeId,
                isActive: response.isActive,
                assets: response.assets
            });
        }); 
    }, []);

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
            asset => !facilityEdit.assets.some(facilityAsset => facilityAsset.assetId === asset.assetId)
        );
        setCurrentAssets(filteredAssets);
        
    }, [facilityEdit.assets, allAssets]);

    const onChangeSelectAssets = (selectedAssetId) => {
        if (currentAssets.length > 0 && selectedAssetId !== "") {
            const selectedAsset = currentAssets.find(asset => asset.assetId === selectedAssetId);
            setFacilityEdit({ ...facilityEdit, assets: [...facilityEdit.assets, selectedAsset]});
        }
      };

    const deleteAsset = (assetDeleted) => {
        if (facilityEdit.assets.length > 0) {
            const newFacilities = facilityEdit.assets.filter(asset => asset.assetId != assetDeleted.assetId);
            setFacilityEdit({ ...facilityEdit, assets: newFacilities});
        }
    };

    function showConfirmationCard() {
        showCard ? setShowCard(false) : setShowCard(true);
    }

    return (
        <div className="container-absolute show-edit-form" onClick={editFacility.bind(event, "")}>
            <div className="form-edit-facility">
                <div className="form-edit-selects">
                    <input
                        type="text"
                        value={facilityEdit.facilityName}
                        className="facility-name"
                        onChange={(event) => {
                            setFacilityEdit({ ...facilityEdit, facilityName: event.target.value });
                            setErrors({ ...errors, facilityName: '' });
                        }
                    }
                    />
                    {errors.facilityName && <span className="error">{errors.facilityName}</span>}
            
                    <div className="facility-capacity">
                        <IconPersonFill />
                        <input
                            type="number"
                            value={facilityEdit.capacity}
                            onChange={(event) => {
                                    setFacilityEdit({ ...facilityEdit, capacity: event.target.value });
                                    setErrors({ ...errors, capacity: '' });
                                }
                            }
                        />
                    </div>
                    {errors.capacity && <span className="error">{errors.capacity}</span>}
            

                </div>

                <Filters
                    filters={[
                        {
                            title: facility.buildingName,
                            label: false,
                            onChange: (value) => setBuildingFilter(value),
                            options: buildingFilterOptions,
                        },
                        {
                            title: facility.facilityTypeDescription,
                            onChange: (value) => setTypeFilter(value),
                            options: typeFilterOptions,
                        },
                    ]}
                />

                <input
                    type="text"
                    placeholder="Observação"
                    value={facilityEdit.note}
                    onChange={(event) => setFacilityEdit({ ...facilityEdit, note: event.target.value })}
                />
                <select className="assest-select"
                    onChange={(e) => onChangeSelectAssets(e.target.value)} 
                >   
                    <option value="" >Ativos</option>
                    {
                        currentAssets.map((asset) => (
                            <option value={asset.assetId}> 
                                {asset.assetDescription} 
                            </option>
                        ))
                    }
                </select>

                <div>
                    {facilityEdit.assets.map((asset, index) => (
                        <>
                        <div className="facilty-assets" key={index}>
                            <div className="facility-assets-info">
                                <input 
                                    type="number" 
                                    value={asset.quantity} 
                                    placeholder="0"
                                    onChange={(e) => { 
                                        asset.quantity = e.target.value;   
                                        setFacilityEdit({...facilityEdit, assets: [...facilityEdit.assets]});
                                        setErrors({ ...errors, assets: errors.assets.map((err, i) => i === index ? '' : err) });
                                    }}
                                    />
                                <p>{asset.assetDescription}</p>
                            </div>
                            <IconTrash className="icon-trash" onClick={(e) => {deleteAsset(asset)}} />
                        </div>
                        {errors.assets[index] && <span className="error">{errors.assets[index]}</span>}
                        </>
                    ))}
                </div>

                <div className="btn-area">
                    <div className="show-edit-form" onClick={editFacility.bind(event, "")}> Cancelar </div>
                    <div onClick={(e) => saveFacility()}> Salvar </div>
                </div>

                { 
                    showCard &&
                    <CardConfirmation 
                        message="Tem certeza que deseja editar este espaço?"
                        showConfirmationCard={showConfirmationCard}
                        action={() => updateFacility(facility.facilityId, facilityEdit)} 
                    />
                }
            </div>
        </div>
    )
}

export default FormEditFacility;

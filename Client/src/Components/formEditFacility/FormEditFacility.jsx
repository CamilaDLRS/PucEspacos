import "./formEditFacility.css"
import IconPersonFill from "../../imgs/IconPersonFill"
import IconTrash from "../../imgs/IconTrash"
import Filters from "../filters/filters"
import { useEffect, useState } from "react";
import { getAllAssets } from "../../services/asset";
import { editFacilityStatus } from "../../services/facility"

function FormEditFacility({ facility, buildings, facilityTypes, editFacility }) {

    const [buildingFilterOptions, setBuildingFilterOptions] = useState([]);
    const [typeFilterOptions, setTypeFilterOptions] = useState([]);

    const [facilityEdit, setFacilityEdit] = useState({
        facilityName: facility.facilityName,
        note: facility.note,
        capacity: facility.capacity,
        buildingId: facility.buildingId,
        facilityTypeId: facility.facilityTypeId,
        assets: facility.assets
    })

    const [allAssets, setAllAssets] = useState([])
    const [currentAssets, setCurrentAssets] = useState([])

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
    }, []);

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

    return (
        <div className="container-absolute show-edit-form" onClick={editFacility.bind(event, "")}>
            <div className="form-edit-facility " >
                <div className="form-edit-selects">
                    <input
                        type="text"
                        value={facilityEdit.facilityName}
                        className="facility-name"
                        onChange={(event) => {
                            console.log(facilityEdit)
                            setFacilityEdit({ ...facilityEdit, facilityName: event.target.value })
                        }
                        }
                    />
                    <div className="facility-capacity">
                        <IconPersonFill />
                        <input
                            type="number"
                            value={facilityEdit.capacity}
                            onChange={(event) => setFacilityEdit({ ...facilityEdit, capacity: event.target.value })}
                        />
                    </div>

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
                <select 
                    onChange={(e) => onChangeSelectAssets(e.target.value)} 
                >   
                    <option value=""></option>
                    {
                        currentAssets.map((asset) => (
                            <option value={asset.assetId}> 
                                {asset.assetDescription} 
                            </option>
                        ))
                    }
                </select>

                <div>
                    {facilityEdit.assets.map((asset) => (
                        <div className="facilty-assets">
                            <div className="facility-assets-info">
                                <input 
                                    type="number" 
                                    value={asset.quantity} 
                                    placeholder="0"
                                    onChange={(e) => {
                                        asset.quantity = e.target.value;
                                        setFacilityEdit({...facilityEdit, assets: [...facilityEdit.assets]})
                                    }}
                                />
                                <p>{asset.assetDescription}</p>
                            </div>
                            <IconTrash className="icon-trash" onClick={(e) => {deleteAsset(asset)}} />
                        </div>
                    ))}
                </div>

                <div className="btn-area">
                    <div className="show-edit-form" onClick={editFacility.bind(event, "")}> Cancelar </div>
                    <div> Salvar </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditFacility

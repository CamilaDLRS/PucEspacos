import "./cardFacilityReserve.css";

function CardFacilityReserve({facilitiesIdList, triggerFunction}) {
    return ( 
        <div className="container-absolute show-facility-list" onClick={triggerFunction}>
            <div className="facility-list-area">
                <div className="header-facility-reserve">
                    <h1>Espaços</h1>
                    <h3>nomebloco</h3>
                </div>

                
                <div className="facilities-area">
                    {facilitiesIdList.map(facility => (
                        <label htmlFor="" className="input-checkbox">
                            <input type="checkbox" name="" id="" />
                            nome espaço
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
import Filters from "../filters/filters";
import "./formReservationPurpose.css"

function FormResrvationPurpose({showCardReserve}) {
    

    return (
        <div className="container-absolute showReservationPurpose" onClick={showCardReserve.bind(event, "")}>
            <div className="reserve-purpose">
                <div className="title-container">
                    <h1>Selecione a Finalidade:</h1>
                </div>
                <div >
                    <input type="text" className="reserve-purpose-form"/>
                </div>
                <div className="btn-area">
                    <div className="showReservationPurpose">Voltar</div>
                    <div className="showConfirmReserve ">Continuar</div>
                </div>
            </div>
            
        </div>
    )

}

export default FormResrvationPurpose;
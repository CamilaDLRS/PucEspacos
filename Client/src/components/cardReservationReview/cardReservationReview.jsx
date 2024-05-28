import "./cardReservationReview.css";
import { createReservation } from "../../services/reservations";


function CardReservationReview({ showCardReserve, facilityName, buildingName, reservationDate, checkin, checkout, createReserve, reservationCreateData }) {

    function createReserve(reservationCreateData, event) {
        if (event.target.classList.contains('createResereve')) {
            createReservation(reservationCreateData);
        }
    }

    return (
        <div className="container-absolute showConfirmReserve" onClick={showCardReserve.bind(event, "")}>
            <div className="confirme-reserve">
                <div>
                    <h1>Confirma Essa Reserva?</h1>
                </div>
                <div className="info espaco">
                    <h3>{facilityName}</h3>
                    <h3>Bloco {buildingName}</h3>
                </div>
                <div className="info data-hora">
                    <h3>{reservationDate}</h3>
                    <h3>Das {checkin} até {checkout}</h3>
                </div>
                <div className="btn-area">
                    <div className="showConfirmReserve" >Não</div>
                    <div className="showConfirmReserve createResereve" onClick={() => createReserve(reservationCreateData, event)}>Sim</div>
                </div>
            </div>
        </div>
    )
}
export default CardReservationReview;
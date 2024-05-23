import "./cardReservationReview.css";

function CardReservationReview({ showCardReserve, facilityName, buildingName, reservationDate, reservationTime }) {
    return (
        <div className="container-absolute showConfirmReserve" onClick={showCardReserve.bind(event, "")}>
            <div className="confirme-reserve">
                <div>
                    <h1>Confirma Essa Reserva?</h1>
                </div>
                <div className="info espaco">
                    <h3>{facilityName}</h3>
                    <h3>{buildingName}</h3>
                </div>
                <div className="info data-hora">
                    <h3>{reservationDate}</h3>
                    <h3>{reservationTime}</h3>
                </div>
                <div className="btn-area">
                    <div className="showConfirmReserve">Não</div>
                    <div className="showConfirmReserve">Sim</div>
                </div>
            </div>
        </div>
    )
}
export default CardReservationReview;
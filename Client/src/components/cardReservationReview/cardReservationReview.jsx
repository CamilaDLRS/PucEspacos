import "./cardReservationReview.css";

function CardReservationReview({ showCardReserve }) {
    return (
        <div className="container-absolute showConfirmReserve" onClick={showCardReserve.bind(event, "")}>
            <div className="confirme-reserve">
                <div>
                    <h1>Confirma Essa Reserva?</h1>
                </div>
                <div className="info espaco">
                    <h3>Nome Espaco</h3>
                    <h3>Nome Bloco</h3>
                </div>
                <div className="info data-hora">
                    <h3>data</h3>
                    <h3>Hora</h3>
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
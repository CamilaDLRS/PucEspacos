import "./cardConfirmation.css"

function CardConfirmation({message, showConfirmationCard, action }) {
    return ( 
        <div className="container-absolute container-absolute-card-confirmation">
            <div className="card-confirmation">
                <h2> {message} </h2>
                <div className="btn-area">
                    <div onClick={(e) => showConfirmationCard()}>Não</div>
                    <div onClick={(e) => action() }>Sim</div>
                </div>
            </div>
        </div>
     );
}

export default CardConfirmation;
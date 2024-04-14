import "./cardConfirmation.css"
import { editUser } from "../../services/user";

function CardConfirmation({showConfirmationCard, userId, dataEditUser}) {
    return ( 
        <div className="container-absolute">
            <div className="card-confirmation">
                <h2> Confirmar Edição? </h2>
                <div className="btn-area">
                    <div onClick={(e) => showConfirmationCard()}>Não</div>
                    <div onClick={(e) => editUser(userId, dataEditUser)}>Sim</div>
                </div>
            </div>
        </div>
     );
}

export default CardConfirmation;
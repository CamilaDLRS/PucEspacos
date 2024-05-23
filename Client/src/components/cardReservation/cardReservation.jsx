import "./cardReservation.css";
import IconBxsEdit from "../../imgs/iconBxsEdit";

function CardReservation({reservation, showFormReservation}) {

    return ( 
        <div className="card-reservation">
            <div className="card-reservation-header">
                <span>20 - Quarta-Feira</span>
                <span>Março 2024</span>
            </div>
            <div  className="card-reservation-body">
                <table>
                    <tr>
                        <th> Horário Reserva </th>
                        <th> Localização </th>
                        <th> Reservante </th>
                        {"se tem responsável" === "true" &&
                            <th> Responsavel </th>
                        }
                        <th> Finalidade </th>
                    </tr>
                    <tr>
                        <td> 07:45 - 10:30 </td>
                        <td> Araça 303 </td>
                        <td> Dimitri Delinski </td>
                        {"se tem responsável" === "true" &&
                            <td> Steve Jobs </td>
                        }
                        <td> Estudos </td>
                    </tr>
                </table>
            </div>
            <div className="card-reservation-footer">
                <span> Solicitada </span>
                <div>
                    {
                        <div className="edit-icon showFormReservation" onClick={showFormReservation.bind(event, reservation)}>
                            <IconBxsEdit className="showFormReservation" />
                        </div>
                    }
                </div>

            </div>
        </div> 
    );
}

export default CardReservation;
import "./cardReservation.css";

function CardReservation() {
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
                        <td> -- </td>
                        {"se tem responsável" === "true" &&
                            <td> Steve Jobs </td>
                        }
                        <td> Estudos </td>
                    </tr>
                </table>
            </div>
            <div className="card-reservation-footer">
                <span> Solicitada </span>
                <span> Icones </span>
            </div>
        </div> 
    );
}

export default CardReservation;
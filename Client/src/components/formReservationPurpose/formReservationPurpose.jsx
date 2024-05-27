import IconDown from "../../imgs/IconDown.jsx/";
import { useEffect, useState } from "react";
import {showList, unShowlist} from "../../utils.js";
import { getAllReservationPurposes } from "../../services/reservations";
import "./formReservationPurpose.css"

function FormResrvationPurpose({showCardReserve}) {
    
  const [reservationPurposes, setReservationPurposes] = useState([]);
  const [reservationPurpose, setReservationPurpose] = useState("--");

    useEffect(() => {
        getAllReservationPurposes().then((response) => setReservationPurposes(response));
      }, []);

    return (
        <div className="container-absolute showReservationPurpose" onClick={showCardReserve.bind(event, "")}>
            <div className="reserve-purpose">
                <div className="title-container">
                    <h3>Selecione a Finalidade:</h3>
                </div>
                <label
                      className="form-field"
                      htmlFor="purpose"
                      onClick={() => showList("purpose-list")}
                      onMouseLeave={() => unShowlist("purpose-list")}
                  >
                      <IconDown className="reservation-icon" />
                      <span>{reservationPurpose}</span>

                      <ul className="reservation-list purpose-list">
                          {
                              reservationPurposes.map(purpose => (
                                  <li onClick={(e) => {
                                      setReservationPurpose(purpose)
                                  }}
                                  >{purpose}</li>
                              ))
                          }
                      </ul>
                  </label>
                <div className="btn-area">
                    <div className="showReservationPurpose">Voltar</div>
                    <div className="showConfirmReserve ">Continuar</div>
                </div>
            </div>
            
        </div>
    )

}

export default FormResrvationPurpose;
import Filters from "../filters/filters";
import { useEffect, useState } from "react";
import { getAllReservationPurposes } from "../../services/reservations";
import "./formReservationPurpose.css"

function FormResrvationPurpose({showCardReserve}) {
    
    const [purposeFilterOptions, setPurposeFilterOptions] = useState([]);
    const [reservationPurposes, setReservationPurposes] = useState([]);

    useEffect(() => {
        getAllReservationPurposes().then((response) => setReservationPurposes(response));
      }, []);

    useEffect(() => {
        const purposeFilterOptions = [];
    
        purposeFilterOptions.push(
          ...reservationPurposes.map((reservationPurpose) => {
            return { key: reservationPurpose, value: reservationPurpose, label: reservationPurpose };
          })
        );
        setPurposeFilterOptions(purposeFilterOptions);
      }, [reservationPurposes]);

    const filters = [
        {
   /*          onChange: (value) => setDataEditReservation({...dataEditReservation, reservationPurpose : value}), */
            options: purposeFilterOptions,
        }
      ];

    return (
        <div className="container-absolute showReservationPurpose" onClick={showCardReserve.bind(event, "")}>
            <div className="reserve-purpose">
                <div className="title-container">
                    <h1>Selecione a Finalidade:</h1>
                </div>
                <div>
                    <Filters filters={filters}/>
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
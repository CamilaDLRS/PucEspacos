import Filters from "../filters/filters";
import { useEffect, useState } from "react";
import { getAllReservationPurposes } from "../../services/reservations";
import "./formReservationPurpose.css"

function FormResrvationPurpose({ showCardReserve, setReservationPurposesData }) {

  const [purposeFilterOptions, setPurposeFilterOptions] = useState([]);
  const [reservationPurposes, setReservationPurposes] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [purposeMesage, setPurposeMesage] = useState(false)

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

  useEffect(() => {
    setReservationPurposesData(purpose)
  }, [purpose])

  function showPurposeMesage(event) {
    if (event.target.classList.contains('showConfirmReserve')) {
      { purposeMesage ? setPurposeMesage(false) : setPurposeMesage(true) }
    }
  }


  const filters = [
    {
      onChange: (value) => setPurpose(value),
      options: purposeFilterOptions,
    }
  ];

  console.log(purposeMesage)
  return (
    <div className="container-absolute showReservationPurpose" onClick={showCardReserve.bind(event, "")}>
      <div className="reserve-purpose">
        <div className="title-container">
          <h1>Selecione a Finalidade:</h1>
        </div>
        <div>
          <Filters filters={filters} />
          {purposeMesage &&
            <div style={{ color: 'red' }}>Obrigatorio Selecionar Uma Finalidade</div>
          }

        </div>
        <div className="btn-area">
          <div className="showReservationPurpose">Voltar</div>
          <div className="showConfirmReserve" onClick={showPurposeMesage.bind(event)}>Continuar</div>
        </div>
      </div>

    </div>
  )

}

export default FormResrvationPurpose;
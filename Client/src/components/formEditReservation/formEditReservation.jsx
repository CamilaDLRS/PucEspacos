import "./formEditReservation.css";
import { getAllReservationPurposes, editReservation } from "../../services/reservations";
import { useEffect, useState } from "react";
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconIconClock from "../../imgs/iconIconClock/";
import Filters from "../filters/filters";
import {checkin, checkout, convertToTimeString, convertToDateString} from "../../utils.js";

function FormEditReservation({ reservation, showFormReservation }) {

  const [minDate, setMinDate] = useState("");
  const [reservationPurposes, setReservationPurposes] = useState([]);
  
  const [purposeFilterOptions, setPurposeFilterOptions] = useState([]);

  const [dataEditReservation, setDataEditReservation] = useState({
    reservationPurpose: reservation.reservationPurpose,
    date: convertToDateString(reservation.checkinDate),
    checkin: convertToTimeString(reservation.checkinDate),
    checkout: convertToTimeString(reservation.checkoutDate)
  })
  useEffect(() => {
    getAllReservationPurposes().then((response) => setReservationPurposes(response));
  }, []);

  function showList(elementClass) {
    document.querySelector(`.${elementClass}`).style.display = "flex";
  }

  function unShowlist(elementClass) {
    document.querySelector(`.${elementClass}`).style.display = "none";
  }


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
    const dtToday = new Date();
    const year = dtToday.getFullYear().toString();
    var month = dtToday.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var day = dtToday.getDate() < 10 ? "0" + dtToday.getDate().toString() : dtToday.getDate().toString();

    setMinDate(`${year}-${month}-${day}`)
  }, []);

  const filters = [
    {
        title : reservation.reservationPurpose,
        label: "Finalidade",
        onChange: (value) => setDataEditReservation({...dataEditReservation, reservationPurpose : value}),
        options: purposeFilterOptions,
    }
  ];

  return (
    <div className="container-absolute showFormReservation" onClick={showFormReservation.bind(event, "")}>
      <div className="form-edit-reserve">
        <label className="form-field" htmlFor="date">
          Dia
          <IconCalendarDays className="reservation-icon" />
          <input
            type="date"
            name=""
            id="date"
            min={minDate}
            value={dataEditReservation.date}
            onChange={(event) => setDataEditReservation({ ...dataEditReservation, date: event.target.value })}
          />
        </label>

        <div className="date-select-area">
          <label
            className="form-field"
            htmlFor="checkin"
            onClick={() => showList("checkin-hours-list")}
            onMouseLeave={() => unShowlist("checkin-hours-list")}
          >
            <span>Inicio</span>
            <span>{dataEditReservation.checkin}</span>
            <IconIconClock className="reservation-icon reservation-icon-clock" />
            <ul className="reservation-list checkin-hours-list">
              {checkin.map((hour) => (
                <li
                  onClick={(e) => {
                    setDataEditReservation({ ...dataEditReservation, checkin: hour, checkout: "--:--" });
                  }}
                >
                  {hour}
                </li>
              ))}
            </ul>
          </label>

          <label
            className="form-field"
            htmlFor="checkout"
            onClick={() => showList("checkout-hours-list")}
            onMouseLeave={() => unShowlist("checkout-hours-list")}
          >
            <label htmlFor="">Fim</label>
            <span>{dataEditReservation.checkout}</span>
            <IconIconClock className="reservation-icon reservation-icon-clock" />

            <ul className="reservation-list checkout-hours-list">
              {checkout.map((hour) => {
                if (hour > dataEditReservation.checkin) {
                  return (
                    <li onClick={(e) => setDataEditReservation({ ...dataEditReservation, checkout: hour })}>{hour}</li>
                  );
                }
              })}
            </ul>
          </label>
        </div>

        <div>
            <Filters filters={filters}/>
        </div>

        <div className="btn-area">
            <div onClick={(e) => editReservation(reservation.reservationId, dataEditReservation)}>Salvar</div>
            <a className="showFormReservation" onClick={showFormReservation.bind(event, "")}>Cancelar</a>
        </div>
      </div>
    </div>
  );
}

export default FormEditReservation;

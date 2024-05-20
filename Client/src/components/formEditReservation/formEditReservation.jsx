import "./formEditReservation.css";
import { getAllReservationPurposes, editReservation } from "../../services/reservations";
import { useEffect, useState } from "react";
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconIconClock from "../../imgs/iconIconClock/";
import Filters from "../filters/filters";

function FormEditReservation({ reservation, showFormReservation }) {

  const checkin = ["06:15","07:00", "07:50", "08:35", "09:40", "10:25", "11:10", "11:55", "12:40", "13:25", "14:10", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:45", "21:30", "22:15", "23:00" ];
  const checkout = [ "07:00", "07:50", "08:35", "09:20", "10:25", "11:10", "11:55", "12:40", "13:25", "14:10", "14:55", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30", "21:30", "22:15", "23:00", "23:30"];
  const [minDate, setMinDate] = useState("");
  const [reservationPurposes, setReservationPurposes] = useState([]);
  
  const [purposeFilterOptions, setPurposeFilterOptions] = useState([]);

  const [dataEditReservation, setDataEditReservation] = useState({
    reservationPurpose: reservation.reservationPurpose,
    checkin: "--:--" /* reservation.checkinDate */,
    checkout: "--:--"/*  reservation.checkoutDate */,
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

  function convertToDateTime(timestamp) {
    const dtToday = new Date(timestamp);
    const year = dtToday.getFullYear().toString();
    var month = dtToday.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var day = dtToday.getDate() + 1;
    day = day < 10 ? "0" + day.toString() : day.toString();

    return `${year}-${month}-${day}`
  }

  function convertToTimestamp(dateString) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // Mês é 0-indexado no Date
    return date.getTime();
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
    const dtToday = new Date(reservation.checkinDate);
    const year = dtToday.getFullYear().toString();
    var month = dtToday.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var day = dtToday.getDate().toString();

    setMinDate(`${year}-${month}-${day}`)
    setDataEditReservation({...dataEditReservation, reservationDate: `${year}-${month}-${day}`})
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
            value={convertToDateTime(dataEditReservation.checkinDate)}
            onChange={(event) => setDataEditReservation({ ...dataEditReservation, checkinDate: convertToTimestamp(event.target.value) })}
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

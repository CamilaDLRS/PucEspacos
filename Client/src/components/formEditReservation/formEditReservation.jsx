import "./formEditReservation.css";
import { getAllReservationPurposes, editReservation } from "../../services/reservations";
import { useEffect, useState } from "react";
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconIconClock from "../../imgs/iconIconClock/";
import IconDown from "../../imgs/IconDown.jsx/";
import {showList, unShowlist, checkin, checkout, convertToTimeString, convertToDateString} from "../../utils.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormEditReservation({ reservation, showFormReservation }) {

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const [reservationPurposes, setReservationPurposes] = useState([]);
  const [reservationPurpose, setReservationPurpose] = useState("--");

  const [dataEditReservation, setDataEditReservation] = useState({
    reservationPurpose: reservation.reservationPurpose,
    date: convertToDateString(reservation.checkinDate),
    checkin: convertToTimeString(reservation.checkinDate),
    checkout: convertToTimeString(reservation.checkoutDate)
  })
  useEffect(() => {
    getAllReservationPurposes().then((response) => setReservationPurposes(response));
    setReservationPurpose(reservation.reservationPurpose);
  }, []);

  useEffect(() => {
    toast(localStorage.getItem("responseMessage"))
    setTimeout(() => {
        localStorage.removeItem("responseMessage")
    }, 100)
}, [localStorage.getItem("responseMessage")]);

  useEffect(() => {
    const dtToday = new Date();
    const year = dtToday.getFullYear().toString();
    var month = dtToday.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var day = dtToday.getDate() < 10 ? "0" + dtToday.getDate().toString() : dtToday.getDate().toString();

    setMinDate(`${year}-${month}-${day}`)

    const maxDate = new Date(new Date(`${year}-${month}-${day}`).getTime() + 180 * 24 * 60 * 60 * 1000);
    const maxYear = maxDate.getFullYear().toString();
    var maxMonth = maxDate.getMonth() + 1;
    maxMonth = maxMonth < 10 ? "0" + maxMonth.toString() : maxMonth.toString();
    var maxDay = maxDate.getDate().toString();
    maxDay = maxDay < 10 ? "0" + maxDay.toString() : maxDay.toString();
    setMaxDate(`${maxYear}-${maxMonth}-${maxDay}`)
  }, []);


  const [errors, setErrors] = useState({
    checkin: '',
    checkout: '',
    date: ''
});

const validate = () => {
    let isValid = true;
    const newErrors = {
        checkin: '',
        checkout: '',
        date: ''
    };

    console.log(dataEditReservation);

    // Validando checkin
    if (dataEditReservation.checkin === "--:--") {
        newErrors.checkin = 'Selecione o horário de ínicio.';
        isValid = false;
    }

    // Validando checkout
    if (dataEditReservation.checkout === "--:--") {
        newErrors.checkout = 'Selecione o horário de fim.';
        isValid = false;
    }

    // Validando data
    if (!Boolean(dataEditReservation.date)) {
        newErrors.date = 'Selecione a data.';
        isValid = false;
    }

    setErrors(newErrors);

    return isValid;
};

function validateFields() {
    if (validate()) {
      editReservation(reservation.reservationId, dataEditReservation);
    }
}

  return (
    <>
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
              max={maxDate}
              value={dataEditReservation.date}
              onChange={(event) => {
                setDataEditReservation({ ...dataEditReservation, date: event.target.value, checkin: "--:--", checkout: "--:--" });
                setErrors({ ...errors, date: '' });
              }}
            />
          </label>
          <div className="error-area">  
            {errors.date ? <span className="error">{errors.date}</span> : <span className="error"></span>}
          </div>

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
                {checkin.map((hour) => {

                  if (!(dataEditReservation.date == minDate && hour <= convertToTimeString(new Date().getTime())))  {
                    return (
                      <li onClick={(e) => {
                        setDataEditReservation({ ...dataEditReservation, checkin: hour, checkout: "--:--" });
                        setErrors({ ...errors, checkin: '' });
                      }
                    }>{hour}</li>
                    );
                  }
                 
                })}
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
                      <li onClick={(e) => {
                        setDataEditReservation({ ...dataEditReservation, checkout: hour })
                        setErrors({ ...errors, checkout: '' });
                      }}>{hour}</li>
                    );
                  }
                })}
              </ul>
            </label>
          </div>
          <div className="error-area">  
            {errors.checkin ? <span className="error">{errors.checkin}</span> : <span className="error"></span>}
            {errors.checkout ? <span className="error">{errors.checkout}</span> : <span className="error"></span>}
          </div>

          <label
                className="form-field"
                htmlFor="purpose"
                onClick={() => showList("purpose-list")}
                onMouseLeave={() => unShowlist("purpose-list")}
            >
                Finalidade
                <IconDown className="reservation-icon" />
                <span>{reservationPurpose}</span>

                <ul className="reservation-list purpose-list">
                    {
                        reservationPurposes.map(purpose => (
                            <li onClick={(e) => {
                                setDataEditReservation({...dataEditReservation, reservationPurpose : purpose})
                                setReservationPurpose(purpose)
                            }}
                            >{purpose}</li>
                        ))
                    }
                </ul>
            </label>

          <div className="btn-area">
              <div className="showFormReservation" onClick={showFormReservation.bind(event, "")}>Cancelar</div>
              <div onClick={validateFields}>Editar</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default FormEditReservation;

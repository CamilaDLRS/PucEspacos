import "./formCreateReservation.css";
import { useEffect, useState } from "react";
import { getAllFacilityTypes } from "../../services/facility";
import { getAllBuildings } from "../../services/building";
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconPersonFill from "../../imgs/iconPersonFill";
import IconIconClock from "../../imgs/iconIconClock/";
import IconDown from "../../imgs/IconDown";
import { Link } from "react-router-dom";
import { showList, unShowlist, checkin, checkout, convertToTimeString } from "../../utils.js";

function FormCreateReservation({ reservationTemplate, setReservationTemplate, getFacilitiesAvailables }) {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    const [buildings, setBuildings] = useState([]);
    const [facilityTypes, setFacilityTypes] = useState([]);

    const [buildName, setBuildName] = useState("--");
    const [faciliTypeName, setFaciliTypeName] = useState("--");


    useEffect(() => {
        const dtToday = new Date();
        const year = dtToday.getFullYear().toString();
        var month = dtToday.getMonth() + 1;
        month = month < 10 ? "0" + month.toString() : month.toString();
        var day = dtToday.getDate().toString();
        day = day < 10 ? "0" + day.toString() : day.toString();
        setMinDate(`${year}-${month}-${day}`)

        const maxDate = new Date(new Date(`${year}-${month}-${day}`).getTime() + 180 * 24 * 60 * 60 * 1000);
        const maxYear = maxDate.getFullYear().toString();
        var maxMonth = maxDate.getMonth() + 1;
        maxMonth = maxMonth < 10 ? "0" + maxMonth.toString() : maxMonth.toString();
        var maxDay = maxDate.getDate().toString();
        maxDay = maxDay < 10 ? "0" + maxDay.toString() : maxDay.toString();
        setMaxDate(`${maxYear}-${maxMonth}-${maxDay}`)

        setReservationTemplate({ ...reservationTemplate, reservationDate: `${year}-${month}-${day}` })
    }, [])

    useEffect(() => {
        getAllBuildings().then((response) => {
            setBuildings(response)
        });
        getAllFacilityTypes().then((response) => {
            setFacilityTypes(response)
        });
    }, []);

    const [errors, setErrors] = useState({
        capacity: '',
        building: '',
        facilityType: '',
        checkin: '',
        checkout: '',
        reservationDate: ''
    });

    const validate = () => {
        let isValid = true;
        const newErrors = {
            building: '',
            capacity: '',
            facilityType: '',
            checkin: '',
            checkout: '',
            reservationDate: ''
        };
    
        // Validando capacity
        if (reservationTemplate.capacity) {
            if (!Number.isInteger(Number(reservationTemplate.capacity)) || Number(reservationTemplate.capacity) < 1) {
                newErrors.capacity = 'A capacidade deve ser um número inteiro positivo.';
                isValid = false;
            }
            else if (Number(reservationTemplate.capacity) > 2000) {
                newErrors.capacity = 'Capacidade máxima 2000.';
                isValid = false;
            }
        }

        // Validando bloco 
        if (reservationTemplate.buildingId === "") {
            newErrors.building = 'Selecione um bloco.';
            isValid = false;
        }
    
        // Validando tipoespaco
        if (reservationTemplate.facilityTypeId === "") {
            newErrors.facilityType = 'Selecione um tipo de espaço.';
            isValid = false;
        }

        // Validando checkin
        if (reservationTemplate.checkin === "--:--") {
            newErrors.checkin = 'Selecione o horário de ínicio.';
            isValid = false;
        }

        // Validando checkout
        if (reservationTemplate.checkout === "--:--") {
            newErrors.checkout = 'Selecione o horário de fim.';
            isValid = false;
        }

        // Validando data
        if (!Boolean(reservationTemplate.reservationDate)) {
            newErrors.reservationDate = 'Selecione a data.';
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    function validateFields() {
        if (validate()) {
            getFacilitiesAvailables(reservationTemplate);
            if (window.innerWidth <= 980 ) {
                document.querySelector(".form-create-reserve").style.display = "none";
                document.querySelector(".back-to-filters").style.display = "flex";
                document.querySelector(".reservation-list").style.display = "block";
            }
        }
    }

    return (
        <div className="form-create-reserve">
            <label className="form-field" htmlFor="date">
                Dia
                <IconCalendarDays className="reservation-icon" />

                <input
                    type="date"
                    name=""
                    id="date"
                    min={minDate}
                    value={reservationTemplate.reservationDate}
                    max={maxDate}
                    onChange={(event) => {
                        setReservationTemplate({ ...reservationTemplate, reservationDate: event.target.value })
                        setErrors({ ...errors, reservationDate: '' });
                    }
                }
                />
            </label>
            <div className="error-area">  
                    {errors.reservationDate ? <span className="error">{errors.reservationDate}</span> : <span className="error"></span>}
            </div>

            <div className="date-select-area">
                <label
                    className="form-field"
                    htmlFor="checkin"
                    onClick={() => showList("checkin-hours-list")}
                    onMouseLeave={() => unShowlist("checkin-hours-list")}
                >
                    <span>Inicio</span>
                    <span>
                        {reservationTemplate.checkin}
                    </span>
                    <IconIconClock className="reservation-icon reservation-icon-clock" />
                    <ul className="reservation-list-filter checkin-hours-list">
                        {
                            checkin.map((hour) => {
                            if (!(reservationTemplate.reservationDate == minDate && hour <= convertToTimeString(new Date().getTime())))  {
                                return (
                                    <li onClick={(e) => {
                                        setReservationTemplate({ ...reservationTemplate, checkin: hour, checkout: "--:--" })
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
                    <span>{reservationTemplate.checkout}</span>
                    <IconIconClock className="reservation-icon reservation-icon-clock" />

                    <ul className="reservation-list-filter checkout-hours-list">
                        {
                            checkout.map(hour => {
                                if (reservationTemplate.checkin != "--:--" && hour > reservationTemplate.checkin) {
                                    return (<li onClick={(e) => {
                                        setReservationTemplate({ ...reservationTemplate, checkout: hour })
                                        setErrors({ ...errors, checkout: '' });
                                }
                                    }>{hour}</li>)
                                }
                            })
                        }
                    </ul>
                </label>
            </div>
            <div className="error-area">  
                {errors.checkin ? <span className="error">{errors.checkin}</span> : <span className="error"></span>}
                {errors.checkout ? <span className="error">{errors.checkout}</span> : <span className="error"></span>}
            </div>

            <label
                className="form-field"
                htmlFor="building"
                onClick={() => showList("building-list")}
                onMouseLeave={() => unShowlist("building-list")}
            >
                Bloco
                <span>{buildName}</span>
                <IconDown className="reservation-icon" />

                <ul className="reservation-list-filter building-list">
                    {
                        buildings.map(build => (
                            <li onClick={(e) => {
                                setReservationTemplate({ 
                                    ...reservationTemplate, 
                                    buildingId: build.buildingId, 
                                    buildingName: build.buildingName })
                                setBuildName(build.buildingName)
                                setErrors({ ...errors, building: '' });
                            }}
                            >{build.buildingName}</li>
                        ))
                    }
                </ul>
            </label>
            <div className="error-area">  
                    {errors.building ? <span className="error">{errors.building}</span> : <span className="error"></span>}
            </div>

            <label
                className="form-field"
                htmlFor="facilityType"
                onClick={() => showList("facility-type-list")}
                onMouseLeave={() => unShowlist("facility-type-list")}
            >
                Tipo Espaço
                <IconDown className="reservation-icon" />
                <span>{faciliTypeName}</span>

                <ul className="reservation-list-filter facility-type-list">
                    {
                        facilityTypes.map(facilityType => (
                            <li onClick={(e) => {
                                setReservationTemplate({ ...reservationTemplate, facilityTypeId: facilityType.facilityTypeId })
                                setFaciliTypeName(facilityType.facilityTypeDescription)
                                setErrors({ ...errors, facilityType: '' });

                            }}
                            >{facilityType.facilityTypeDescription}</li>
                        ))
                    }
                </ul>
            </label>
            <div className="error-area">  
                    {errors.facilityType ? <span className="error">{errors.facilityType}</span> : <span className="error"></span>}
            </div>

            <label className="form-field" htmlFor="capacity">
                Capacidade
                <IconPersonFill className="reservation-icon" />

                <input
                    type="number"
                    name=""
                    id="capacity"
                    value={reservationTemplate.capacity}
                    onChange={(e) => {
                        if (e.target.value.length > 4) {
                            e.target.value = e.target.value.slice(0, 4)
                        }
                        setReservationTemplate({ ...reservationTemplate, capacity: e.target.value })
                        setErrors({ ...errors, capacity: '' });
                    }}
                />
            </label>
            <div className="error-area">  
                    {errors.capacity ? <span className="error">{errors.capacity}</span> : <span className="error"></span>}
            </div>

            <div className="btn-area">
                <Link to="/reservations" className="btn-link">
                    <div>
                        Cancelar
                    </div>
                </Link>
                <div onClick={validateFields}>
                    Buscar
                </div>
            </div>
        </div>
    );
}

export default FormCreateReservation;
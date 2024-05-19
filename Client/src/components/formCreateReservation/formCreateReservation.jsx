import "./formCreateReservation.css";
import { useEffect, useState } from "react";
import { getAllFacilityTypes } from "../../services/facility";
import { getAllBuildings } from "../../services/building";
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconPersonFill from "../../imgs/iconPersonFill";
import IconIconClock from "../../imgs/iconIconClock/";
import IconDown from "../../imgs/IconDown";
import { Link } from "react-router-dom";

function FormCreateReservation() {

    const checkin = ["06:15","07:00", "07:50", "08:35", "09:40", "10:25", "11:10", "11:55", "12:40", "13:25", "14:10", "15:15", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:45", "21:30", "22:15", "23:00" ];
    const checkout = [ "07:00", "07:50", "08:35", "09:20", "10:25", "11:10", "11:55", "12:40", "13:25", "14:10", "14:55", "16:00", "16:45", "17:30", "18:15", "19:00", "19:45", "20:30", "21:30", "22:15", "23:00", "23:30"]
    const [minDate, setMinDate] = useState("");

    const [reservationTemplate, setReservationTemplate] = useState({
        reservationDate: "",
        checkin: "--:--",
        checkout: "--:--",
        buildingId: "",
        facilityTypeId: "",
        capacity: ""
    })

    const [buildings, setBuildings] = useState([]);
    const [facilityTypes, setFacilityTypes] = useState([]);

    const [buildName, setBuildName] = useState();
    const [faciliTypeName, setFaciliTypeName] = useState();

    useEffect(() => {
        const dtToday = new Date();
        const year = dtToday.getFullYear().toString();
        var month = dtToday.getMonth() + 1;
        month = month < 10 ? "0" + month.toString() : month.toString();
        var day = dtToday.getDate().toString();
    
        setMinDate(`${year}-${month}-${day}`)
        setReservationTemplate({...reservationTemplate, reservationDate: `${year}-${month}-${day}`})
    }, [])

    useEffect(() => {
        getAllBuildings().then((response) => {
            setBuildings(response)
            setBuildName(response[0].buildingName)
        });
        getAllFacilityTypes().then((response) => {
            setFacilityTypes(response)
            setFaciliTypeName(response[0].facilityTypeDescription)
        });
      }, []);

    function showList(elementClass) {
        document.querySelector(`.${elementClass}`).style.display = "flex";
    }

    function unShowlist(elementClass) {
        document.querySelector(`.${elementClass}`).style.display = "none";
    }

    console.log(reservationTemplate);
    return ( 
        <div className="form-create-reserve">
            <label className="form-field" htmlFor="date">
                Dia
                <IconCalendarDays className="reservation-icon"/>
                
                <input 
                    type="date" 
                    name="" 
                    id="date" 
                    min={minDate}
                    value={reservationTemplate.reservationDate}
                    onChange={(event) => setReservationTemplate({...reservationTemplate, reservationDate: event.target.value})}
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
                    <span>
                        {reservationTemplate.checkin}
                    </span>
                    <IconIconClock className="reservation-icon reservation-icon-clock"/>
                    <ul className="reservation-list checkin-hours-list">
                        {
                            checkin.map(hour => (<li onClick={(e) => {
                                setReservationTemplate({...reservationTemplate, checkin: hour, checkout: "--:--"})
                            }}>{hour}</li>))
                        }
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
                    <IconIconClock className="reservation-icon reservation-icon-clock"/>

                    <ul className="reservation-list checkout-hours-list">
                        {   
                            checkout.map(hour => {
                                if (hour > reservationTemplate.checkin) {
                                    return (<li onClick={(e) => setReservationTemplate({...reservationTemplate, checkout: hour}) 
                                }>{hour}</li>)}
                            })
                        }
                    </ul>
                </label>
            </div>

            <label 
                className="form-field" 
                htmlFor="building" 
                onClick={() => showList("building-list")} 
                onMouseLeave={() => unShowlist("building-list")}
            >
                Bloco
                <span>{buildName}</span>
                <IconDown className="reservation-icon"/>

                <ul className="reservation-list building-list">
                    {
                        buildings.map(build => (
                            <li onClick={(e) => {
                                setReservationTemplate({...reservationTemplate, buildingId: build.buildingId})
                                setBuildName(build.buildingName)
                            }}
                            >{build.buildingName}</li>
                        ))
                    }
                </ul>
            </label>

            <label 
                className="form-field" 
                htmlFor="facilityType"
                onClick={() => showList("facility-type-list")} 
                onMouseLeave={() => unShowlist("facility-type-list")}
            >
                Tipo Espaço
                <IconDown className="reservation-icon"/>
                <span>{faciliTypeName}</span>

                <ul className="reservation-list facility-type-list">
                    {
                        facilityTypes.map(facilityType => (
                            <li onClick={(e) => {
                                setReservationTemplate({...reservationTemplate, facilityTypeId: facilityType.facilityTypeId})
                                setFaciliTypeName(facilityType.facilityTypeDescription)
                            }}
                            >{facilityType.facilityTypeDescription}</li>
                        ))
                    }
                </ul>
            </label>

            <label className="form-field" htmlFor="capacity">
                Capacidade
                <IconPersonFill className="reservation-icon"/>
                            
                <input 
                    type="number" 
                    name="" 
                    id="capacity" 
                    value={reservationTemplate.capacity}
                    onChange={(e) => {
                        if (e.target.value.length > 4) {
                            e.target.value = e.target.value.slice(0, 4)
                        }
                        setReservationTemplate({...reservationTemplate, capacity: e.target.value})
                    }}
                />
            </label>
        
            <div className="btn-area">
                <div className="search-btn">
                    Buscar
                </div>
                <Link to={"/reservations"}>
                    Cancelar
                </Link>
            </div>
        </div>
     );
}

export default FormCreateReservation;
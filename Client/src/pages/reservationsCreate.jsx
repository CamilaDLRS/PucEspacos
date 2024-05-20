import "./pages.css";
import Header from "../components/header/header";
import FormCreateReservation from "../components/formCreateReservation/formCreateReservation";
import CardFacility from "../components/cardFacility/cardFacility"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getAllAvailables } from "../services/facility";
import CardReadFacility from "../components/cardReadFacility/cardReadFacility";
import FormResrvationPurpose from "../components/formReservationPurpose/formReservationPurpose";
import CardReservationReview from "../components/cardReservationReview/cardReservationReview";

function ReservationsCreate() {
    if (!localStorage.getItem("userType")) {
        window.location = "/users";
    }

    useEffect(() => {
        toast(localStorage.getItem("responseMessage"))
        setTimeout(() => {
            localStorage.removeItem("responseMessage")
        }, 100)
    }, [localStorage.getItem("responseMessage")])

    const [facilityById, setFacilityById] = useState();

    const [showReserve, setShowReserve] = useState(false);
    const [showConfirmReserve, setShowConfirmReserve] = useState(false);

    const [showReadFacility, setShowReadFacility] = useState(false);


    const [facilities, setFacilities] = useState([]);
    const [reservationTemplate, setReservationTemplate] = useState({
        reservationDate: "",
        checkin: "--:--",
        checkout: "--:--",
        buildingId: "",
        facilityTypeId: "",
        capacity: ""
    })

    useEffect(() => {
        getAllAvailables(reservationTemplate).then((response) => setFacilities(response));
    }, [])

    function showFacility(facility, event) {
        if (event.target.classList.contains("showReadFacility")) {
            showReadFacility ? setShowReadFacility(false) : setShowReadFacility(true);
            setFacilityById(facility);
        }
    }

    function showFacilityForm(facility, event) {
        if (event.target.classList.contains("show-form")) {
            triggerFacilityForm ? setTriggerFacilityForm(false) : setTriggerFacilityForm(true);
            setFacilityById(facility);
        }
    }

    function showCardReserve(facility, event) {
        if (event.target.classList.contains("showReservationPurpose")) {
            showReserve ? setShowReserve(false) : setShowReserve(true); console.log("Reserva")
        }
        if (event.target.classList.contains("showConfirmReserve")) {
            showConfirmReserve ? setShowConfirmReserve(false) : setShowConfirmReserve(true);
            showReserve && setShowReserve(false);
            console.log("Reserva 2")
        }
    }

    console.log(facilities);

    return (
        <>
            <Header local="reservations" />
            <div className="reservation-create-container">
                <FormCreateReservation
                    reservationTemplate={reservationTemplate}
                    setReservationTemplate={setReservationTemplate}
                />
                <div className="reservation-list">
                    {(localStorage.getItem("userType") === "Docente" ||
                        localStorage.getItem("userType") === "Discente")
                        ? facilities.map((facility) => {
                            return facility.isActive ? (<CardFacility
                                facility={facility}
                                showFacility={showFacility}
                                showFacilityForm={showFacilityForm}
                                showCardReserve={showCardReserve}
                                isReserve={true}
                            />) : <></>
                        })
                        : facilities.map((facility) => {
                            return (<CardFacility
                                facility={facility}
                                showFacility={showFacility}
                                showFacilityForm={showFacilityForm}
                                showCardReserve={showCardReserve}
                                isReserve={true}
                            />)
                        })
                    }
                </div>
            </div>

            {showReadFacility &&
                <CardReadFacility
                    showFacility={showFacility}
                    facility={facilityById}
                />
            }



            {showReserve &&
                <FormResrvationPurpose
                    showCardReserve={showCardReserve}
                />
            }

            {showConfirmReserve &&
                <CardReservationReview
                    showCardReserve={showCardReserve}
                />
            }



            <ToastContainer />
        </>
    );
}

export default ReservationsCreate;
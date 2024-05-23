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
        buildingId: "",
        checkin: "--:--",
        checkout: "--:--",
        reservationDate: "",
        facilityTypeId: "",
        capacity: ""
    })

    const [reservationData, setReservationData] = useState({
        buildingId: "",
        checkinDate: null,
        checkoutDate: null,
        facilityTypeId: "",
        minimumCapacity: null
    })

    function getFacilitiesAvailables(reservationTemplate) {
        console.log(reservationTemplate);
        setReservationData({
            ...reservationData,
            buildingId: reservationTemplate.buildingId,
            checkinDate: new Date(reservationTemplate.reservationDate + " " + reservationTemplate.checkin).getTime(),
            checkoutDate: new Date(reservationTemplate.reservationDate + " " + reservationTemplate.checkout).getTime(),
            facilityTypeId: reservationTemplate.facilityTypeId,
            minimumCapacity: parseInt(reservationTemplate.capacity)
        });
    }

    useEffect(() => {
        if (reservationData.checkinDate != null) {
            getAllAvailables(reservationData).then((response) => {
                setFacilities(response)
            })
        }
    }, [reservationData])

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
            showReserve ? setShowReserve(false) : setShowReserve(true);
        }
        if (event.target.classList.contains("showConfirmReserve")) {
            showConfirmReserve ? setShowConfirmReserve(false) : setShowConfirmReserve(true);
            showReserve && setShowReserve(false);
        }
    }

    return (
        <>
            <Header local="reservations" />
            <div className="reservation-create-container">
                <FormCreateReservation
                    reservationTemplate={reservationTemplate}
                    setReservationTemplate={setReservationTemplate}
                    getFacilitiesAvailables={getFacilitiesAvailables}
                />
                <div className="reservation-list">
                    {facilities?.map((facility) => {
                        return facility.isActive ? (<CardFacility
                            facility={facility}
                            showFacility={showFacility}
                            showFacilityForm={showFacilityForm}
                            showCardReserve={showCardReserve}
                            isReserve={true}
                        />) : <></>
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
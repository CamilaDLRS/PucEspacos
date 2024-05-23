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
import { createReservation } from "../services/reservations";

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

    const [buildingName, setBuildingName] = useState();
    const [facilityName, setfacilityName] = useState();
    const [reservationDate, setReservationDate] = useState();


    const [facilities, setFacilities] = useState([]);
    const [reservationTemplate, setReservationTemplate] = useState({
        buildingName: "",
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

    const [reservationCreateData, setReservationCreateData] = useState({
        responsibleUserId: localStorage.getItem("userId"),
        facilityId: '',
        reservationPurpose: "",
        checkinDate: null,
        checkoutDate: null
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
        setReservationCreateData({
            ...reservationCreateData,
            checkinDate: new Date(reservationTemplate.reservationDate + " " + reservationTemplate.checkin).getTime(),
            checkoutDate: new Date(reservationTemplate.reservationDate + " " + reservationTemplate.checkout).getTime(),
        });
        setBuildingName(reservationTemplate.buildingName)
    }

    useEffect(() => {
        const [year, month, day] = reservationTemplate.reservationDate.split('-');
        setReservationDate(day+'-'+month+'-'+year);
    })

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
            setReservationCreateData({
                ...reservationCreateData,
                facilityId: facility.facilityId
            })
            setfacilityName(facility.facilityName)
        }
        if (event.target.classList.contains("showConfirmReserve") && reservationCreateData.reservationPurpose != '') {
            showConfirmReserve ? setShowConfirmReserve(false) : setShowConfirmReserve(true);
            showReserve && setShowReserve(false);
        }
    }

    function setReservationPurposes(purpose) {
        setReservationCreateData({ ...reservationCreateData, reservationPurpose: purpose })
    }


    console.log(reservationCreateData)

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
                    setReservationPurposesData={setReservationPurposes}
                />
            }

            {showConfirmReserve &&
                <CardReservationReview
                    showCardReserve={showCardReserve}
                    facilityName={facilityName}
                    buildingName={buildingName}
                    reservationDate={reservationDate}
                    reservationTime={reservationTemplate.checkin}
                />
            }
            <ToastContainer />
        </>
    );
}

export default ReservationsCreate;
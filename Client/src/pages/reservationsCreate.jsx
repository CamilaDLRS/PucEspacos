import "./pages.css";
import Header from "../components/header/header";
import FormCreateReservation from "../components/formCreateReservation/formCreateReservation";
import CardFacility from "../components/cardFacility/cardFacility"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

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

    
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {

    }, [])

    return ( 
        <>
            <Header local="reservations" />
            <div className="reservation-create-container">
                <FormCreateReservation />
                <div className="reservation-list">
                    {/* <CardFacility 
                    
                    /> */}
                </div>
            </div>

          <ToastContainer />
        </>
     );
}

export default ReservationsCreate;
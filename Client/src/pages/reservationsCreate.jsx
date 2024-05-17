import Header from "../components/header/header";
import FormCreateReservation from "../components/formCreateReservation/formCreateReservation";

function ReservationsCreate() {
    return ( 
        <>
            <Header local="reservations" />

            <div className="reservation-create-container">
                <FormCreateReservation />
                <div className="reservation-list">

                </div>
            </div>
        </>
     );
}

export default ReservationsCreate;
import { useEffect, useState } from "react";
import "./cardReservation.css";
import IconBxsEdit from "../../imgs/iconBxsEdit";
import IconTrash from "../../imgs/iconTrash";
import CardConfirmation from "../cardConfirmation/cardConfirmation";
import { deleteReservation } from "../../services/reservations";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardReservation({reservation, showFormReservation}) {
    const [reserveInfos, setReserveInfos ] = useState({
        day: "",
        weekDay: "",
        month: "",
        year: "",
        checkin: "",
        checkout: "",
        facilityName: "",
        requestingUserName: "",
        responsibleUserName: "",
        reservationPurpose: "",
        reservationStatus: ""
    })

    const [showCard, setShowCard] = useState(false);
    function showConfirmationCard() {
        showCard ? setShowCard(false) : setShowCard(true);
    }

    useEffect(() => {
        const checkinDate =  new Date(reservation.checkinDate);
        const checkoutDate =  new Date(reservation.checkoutDate);
        const weekDays = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"];
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        const day = checkinDate.getDate() < 10 ? "0" + checkinDate.getDate().toString() : checkinDate.getDate();
        const weekDay = weekDays[checkinDate.getDay()];
        const month = months[checkinDate.getMonth()] 
        const year = checkinDate.getFullYear();

        const checkinHour = checkinDate.getHours() < 10 ? "0" + checkinDate.getHours().toString() : checkinDate.getHours();
        const checkinMinutes = checkinDate.getMinutes() < 10 ? "0" + checkinDate.getMinutes().toString() : checkinDate.getMinutes();
        const checkin = `${checkinHour}:${checkinMinutes}`;  

        const checkoutHour = checkoutDate.getHours() < 10 ? "0" + checkoutDate.getHours().toString() : checkoutDate.getHours();
        const checkoutMinutes = checkoutDate.getMinutes() < 10 ? "0" + checkoutDate.getMinutes().toString() : checkoutDate.getMinutes();
        const checkout = `${checkoutHour}:${checkoutMinutes}`;

        setReserveInfos({
            ...reserveInfos, 
            day: day, 
            weekDay: weekDay, 
            month: month, 
            year: year, 
            checkin: checkin, 
            checkout: checkout,
            facilityName: reservation.facilityName,
            requestingUserName: reservation.requestingUserName,
            responsibleUserName: reservation.responsibleUserName,
            reservationPurpose: reservation.reservationPurpose,
            reservationStatus: reservation.reservationStatus
        });
    }, [reservation])

    return ( 
        <>
            <div className="card-reservation">
                <div className="card-reservation-header">
                    <span>{reserveInfos.day} - {reserveInfos.weekDay}</span>
                    <span>{reserveInfos.month} {reserveInfos.year}</span>
                </div>
                <div  className="card-reservation-body">
                    <table>
                        <tr>
                            <th> Horário Reserva </th>
                            <th> Localização </th>
                            {/* <th> Reservante </th> */}
                            {reserveInfos.responsibleUserName &&
                                <th> Responsavel </th>
                            }
                            <th> Finalidade </th>
                        </tr>
                        <tr>
                            <td> {reserveInfos.checkin} - {reserveInfos.checkout} </td>
                            <td> {reserveInfos.facilityName} </td>
                            {/* <td> {reserveInfos.requestingUserName} </td> */}
                            { reserveInfos.responsibleUserName &&
                                <td> {reserveInfos.responsibleUserName} </td>
                            }
                            <td> {reserveInfos.reservationPurpose} </td>
                        </tr>
                    </table>
                </div>
                <div className="card-reservation-footer">
                    <span> {reserveInfos.reservationStatus} </span>
                    <div className="reservation-icons">
                        {
                            (localStorage.getItem("userId") === reservation.responsibleUserId ||
                            localStorage.getItem("userId") === reservation.requestingUserId ) &&
                            new Date().getTime() < reservation.checkinDate &&
                            <div className="showFormReservation icon" onClick={showFormReservation.bind(event, reservation)}>
                                <IconBxsEdit className="showFormReservation" />
                            </div>
                        }

                        {   (["Administrador", "Secretário"].includes(localStorage.getItem("userType")) ||
                            localStorage.getItem("userId") === reservation.responsibleUserId ||
                            localStorage.getItem("userId") === reservation.requestingUserId) &&
                            new Date().getTime() < reservation.checkinDate &&
                            <IconTrash           
                                onClick={(e) => showConfirmationCard()}
                                className="icon"
                            />
                        }
                    </div>
                </div>

                {
                    showCard &&
                    <CardConfirmation
                        message="Tem certeza que deseja excluir esta reserva?"
                        showConfirmationCard={showConfirmationCard}
                        action={() => deleteReservation(reservation.reservationId)}
                    />
                }
            </div> 
            <ToastContainer />
        </>
    );
}

export default CardReservation;
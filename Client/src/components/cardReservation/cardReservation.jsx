import { useEffect, useState } from "react";
import "./cardReservation.css";
import IconBxsEdit from "../../imgs/iconBxsEdit";

function CardReservation({reservation, showFormReservation}) {

function CardReservation({reserve}) {

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

    useEffect(() => {
        const checkinDate =  new Date(reserve.checkinDate);
        const checkoutDate =  new Date(reserve.checkoutDate);
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
            facilityName: reserve.facilityName,
            requestingUserName: reserve.requestingUserName,
            responsibleUserName: reserve.responsibleUserName,
            reservationPurpose: reserve.reservationPurpose,
            reservationStatus: reserve.reservationStatus
        });
    }, [reserve])

    return ( 
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
                        <th> Reservante </th>
                        {reserveInfos.responsibleUserName &&
                            <th> Responsavel </th>
                        }
                        <th> Finalidade </th>
                    </tr>
                    <tr>
                        <td> {reserveInfos.checkin} - {reserveInfos.checkout} </td>
                        <td> {reserveInfos.facilityName} </td>
                        <td> {reserveInfos.requestingUserName} </td>
                        { reserveInfos.responsibleUserName &&
                            <td> {reserveInfos.responsibleUserName} </td>
                        }
                        <td> {reserveInfos.reservationPurpose} </td>
                    </tr>
                </table>
            </div>
            <div className="card-reservation-footer">
                <span> {reserveInfos.reservationStatus} </span>
                <div>
                    {
                        <div className="edit-icon showFormReservation" onClick={showFormReservation.bind(event, reservation)}>
                            <IconBxsEdit className="showFormReservation" />
                        </div>
                    }
                </div>

            </div>
        </div> 
    );
}

export default CardReservation;
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { convertToTimestamp } from "../utils.js";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};


  
export async function getReservations(data) {
  return await axios
    .post(
      "http://localhost:5001/reservations/query", 
      JSON.stringify(data),
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
      return null;
    });
}

export async function createReservation(data) {
  return await axios.post(
    `http://localhost:5001/reservations/`,
    JSON.stringify(data),
    httpOptions
  )
  .then((response) => {
      window.location = "/reservations";
      localStorage.setItem("responseMessage", response.data.message);
  })
  .catch((e) => {
      toast(e.response.data.error.message);
  })
}

export async function editReservation(id, data) {

  const dataFomated = {
    reservationPurpose: data.reservationPurpose,
    checkinDate: convertToTimestamp(data.date, data.checkin),
    checkoutDate: convertToTimestamp(data.date, data.checkout)
  }

  return await axios.put(
    `http://localhost:5001/reservations/${id}`,
    JSON.stringify(dataFomated),
    httpOptions
  )
  .then((response) => {
    localStorage.setItem("responseMessage", response.data.message)
    window.location = "/reservations"
    toast(response.data.message);

  })
  .catch((e) => {
    toast(e.response.data.error.message);
  })
}

export async function getReservationById(id) {
  return await axios
    .get(
      `http://localhost:5001/reservations/${id}`,
      httpOptions
    )
    .then((response) => {
        return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function deleteReservation(id) {
  return await axios
    .get(
      `http://localhost:5001/reservations/${id}?userId=${localStorage.getItem("userId")}`,
      httpOptions
    )
    .then((response) => {
        return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function getAllReservationPurposes() {
  return await axios
    .get(
      "http://localhost:5001/reservations/purposes",
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}
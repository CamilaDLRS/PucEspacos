import axios from "axios";
import { toast } from 'react-toastify';

const httpOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
};

export async function getAllReservations(data) {
  console.log(data)
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
      return null
    });
}
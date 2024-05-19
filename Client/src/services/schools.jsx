import axios from "axios";
import { toast } from 'react-toastify';


const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export async function getAllSchools() {
  return await axios
    .get(
      "http://localhost:5001/schools",
      httpOptions
    )
    .then((response) => {
        return response.data.data;
    })
    .catch((e) => {
        toast(e.response.data.error.message);
    });
}
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export async function getAllAvailables(data) {
  return await axios
    .post(
      `http://localhost:5001/facilities/availables`,
      JSON.stringify(data),
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      const mensagens = e.response.data.error.message.split(",");
      
      mensagens.forEach(element => {
        toast(element)
      });
    })
};

export async function getAllFacilities() {
  return await axios
    .get(
      "http://localhost:5001/facilities",
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function getAllFacilityTypes() {
  return await axios
    .get(
      "http://localhost:5001/facilities/types",
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function createFacility(data) {
  return await axios.post(
    `http://localhost:5001/facilities/`,
    JSON.stringify(data),
    httpOptions
  )
    .then((response) => {
      window.location = "/facilities";
      localStorage.setItem("responseMessage", response.data.message)
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    })
}

export async function updateFacility(id, data) {

  console.log(data);

  return await axios.put(
    `http://localhost:5001/facilities/${id}`,
    JSON.stringify(data),
    httpOptions
  )
    .then((response) => {
      localStorage.setItem("responseMessage", response.data.message)
      window.location = "/facilities"
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    })
}

export async function updateFacilityStatus(id, isActive) {

  return await axios.patch(
    `http://localhost:5001/facilities/${id}`,
    JSON.stringify({ isActive: isActive }),
    httpOptions
  )
    .then((response) => {
      localStorage.setItem("responseMessage", response.data.message)
      window.location = "/facilities"
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    })
}

export async function getFacilityById(id) {
  return await axios
    .get(
      `http://localhost:5001/facilities/${id}`,
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}
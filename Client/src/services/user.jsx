import axios from "axios";
import { toast } from 'react-toastify';
import sha256 from 'crypto-js/sha256'


const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export async function signUp(data) {

  const dataCopy = { ...data }
  dataCopy.password = sha256(dataCopy.password).toString();
  dataCopy.passwordConfirmation = sha256(dataCopy.passwordConfirmation).toString();

  return await axios
    .post(
      "http://localhost:5001/users",
      JSON.stringify(dataCopy),
      httpOptions
    )
    .then((response) => {
      localStorage.setItem("responseMessage", response.data.message)
      window.location = "/";
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function login(data) {

  const password = sha256(data.password).toString();
  const email = data.email;

  return await axios
    .get(
      `http://localhost:5001/users/signin?password=${password}&email=${email}`,
      httpOptions
    )
    .then((response) => {
      const data = response.data.data;
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userType", data.userType);
      window.location = "/reservations";
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function getAllUser() {
  return await axios
    .get(
      "http://localhost:5001/users",
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function getAllUserTypes() {
  return await axios
    .get(
      "http://localhost:5001/users/types",
      httpOptions
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    });
}

export async function editUser(id, data) {
  if (data.userType !== "Secretário") {
    data.schoolId = null;
  }

  return await axios.patch(
    `http://localhost:5001/users/${id}`,
    JSON.stringify(data),
    httpOptions
  )
    .then((response) => {
      localStorage.setItem("responseMessage", response.data.message)
      window.location = "/users"
    })
    .catch((e) => {
      toast(e.response.data.error.message);
    })
}

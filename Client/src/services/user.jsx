import axios from "axios";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export async function signUp(data) {
  return await axios
    .post(
      "http://localhost:5001/users",
      JSON.stringify(data),
      httpOptions
    )
    .then((response) => {
      alert(response.data.message);
      window.location = "/";
    })
    .catch((e) => {
      alert(e.response.data.error.message);
    });
}

export async function login(data) {
  
  const password = data.password;
  const email = data.email;

  return await axios
    .get(
      `http://localhost:5001/users/signin?password=${password}&email=${email}`, 
      httpOptions
    )
    .then((response) => {
      const data = response.data.data;
      localStorage.setItem("userType", data.userType);
      window.location = "/users";
    })
    .catch((e) => {
      alert(e.response.data.error.message);
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
        alert(e.response.data.error.message);
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
      alert(e.response.data.error.message);
  });
}

import axios from "axios";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export async function getAllBuildings() {
  return await axios
    .get(
      "http://localhost:5001/buildings",
      httpOptions
    )
    .then((response) => {
        return response.data.data;
    })
    .catch((e) => {
        alert(e.response.data.error.message);
    });
}
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
        toast(e.response.data.error.message);
    });
}

export async function getAllBuildById(id, facilities) {
  return await axios
    .get(
      `http://localhost:5001/buildings/${id}?facilities=${facilities}`,
      httpOptions
    )
    .then((response) => {
        return response.data.data;
    })
    .catch((e) => {
        toast(e.response.data.error.message);
    });
}
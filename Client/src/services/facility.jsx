import axios from "axios";

const httpOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
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
      alert(e.response.data.error.message);
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
    alert(e.response.data.error.message);
  });
}

export async function editFacility(id, data) {

  return await axios.put(
    `http://localhost:5001/facilities/${id}`,
    JSON.stringify(data),
    httpOptions
  )
  .then((response) => {
      alert(response.data.message)
      window.location = "/facilities"
  })
  .catch((e) => {
      alert(e.response.data.error.message);
  })
}

export async function editFacilityStatus(id, isActive) {

  return await axios.patch(
    `http://localhost:5001/facilities/${id}`,
    JSON.stringify(isActive),
    httpOptions
  )
  .then((response) => {
      alert(response.data.message)
      window.location = "/facilities"
  })
  .catch((e) => {
      alert(e.response.data.error.message);
  })
}

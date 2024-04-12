import axios from "axios";

export async function getAllFacilities() {
    return await axios.get("http://localhost:5001/facilities")
        .then((response) => {
            return response.data.data;
        })
        .catch((e) => {
            alert(e.response.data.error.message);
        });
}

export async function getAllFacilityTypes() {
    return await axios.get("http://localhost:5001/facilities/types")
        .then((response) => {
            return response.data.data;
        })
        .catch((e) => {
            alert(e.response.data.error.message);
        });
}
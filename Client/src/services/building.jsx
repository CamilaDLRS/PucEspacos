import axios from "axios";

export async function getAllBuildings() {
    return await axios.get("http://localhost:5001/buildings")
        .then((response) => {
            return response.data.data;
        })
        .catch((e) => {
            alert(e.response.data.error.message);
        });
}
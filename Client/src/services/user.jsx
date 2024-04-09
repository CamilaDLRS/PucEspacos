import axios from 'axios';

export async function signUp(data) {
    const httpOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    };

    return await axios
        .post("http://localhost:5001/users",
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
    const httpOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    };
    const password = data.password;
    const email = data.email;
    
    return await axios
        .get(`http://localhost:5001/users/signin?password=${password}&email=${email}`,
        httpOptions
        )
        .then((response) => {
            const data = response.data.data;
            localStorage.setItem("userType", data.userType);
            window.location = '/users';
        })
        .catch((e) => {
            alert(e.response.data.error.message);
        });
}
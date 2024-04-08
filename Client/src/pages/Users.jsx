import "./pages.css"
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import axios from 'axios';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect( () => {
        const fecth = async () => {
            const httpOptions = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            };
    
            await axios
            .get(`http://localhost:5001/users`,
            httpOptions)
            .then((response) => {
                console.log(response.data.data)
            })
            .catch((e) => {
                alert(e.response.data.error.message);
            }); 
        }

        fecth();
        
    }, [])

    return ( 
        <>  
            <Header local="users"/>
            
            {users.map((user) => {
                <div> {user.userName} </div>
            })}
        </>
        
     );
}

export default Users
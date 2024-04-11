import "./pages.css"
import Header from "../components/header/Header";
import axios from 'axios';
import CardUser from "../components/cardUser/CardUser";
import { getAllUser } from "../services/user";
import { useEffect, useState } from "react";
import FilterUser from "../components/filterUser/FilterUser";

function Users() {
    if (!localStorage.getItem("userType")) {
        window.location = "/";
    }
    const [users, setUser] = useState([]);

    useEffect(() => {

        async function fetchUsers () {
            setUser(await getAllUser())
        }

        fetchUsers()
    }, []);

    return ( 
        <div>  
            <Header local="users"/>

            <FilterUser />

            { users.map(user => {
                return (
                    <CardUser 
                        userName={user.userName}
                        userType={user.userType}
                        email = {user.email}
                        isActive = {user.isActive}
                    />
                )
            }) }
        </div>

     );
}

export default Users
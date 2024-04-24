import "./pages.css";
import Header from "../components/header/header";
import CardUser from "../components/cardUser/cardUser";
import { getAllUser, getAllUserTypes } from "../services/user";
import { useEffect, useState } from "react";
import Filters from "../components/filters/filters";
import FormEditUser from "../components/formEditUser/formEditUser";

function Users() {
  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      window.location = "/";
    } else if (localStorage.getItem("userType") !== "Administrador" && localStorage.getItem("userType") !== "Docente") {
      window.location = "/reservations";
    }
  })



  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  const [userById, setUserById] = useState();

  const [typeFilter, setTypeFilter] = useState("");
  const [typeFilterOptions, setTypeFilterOptions] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [statusFilterOptions, setStatusFilterOptions] = useState([]);

  const [showFormEditUser, setShowFormEditUser] = useState(false);

  useEffect(() => {
    getAllUser().then((response) => setUsers(response));
    getAllUserTypes().then((response) => setUserTypes(response));
  }, []);

  useEffect(() => {
    const typeFilterOptions = [{ key: 0, value: "", label: "Todos" }];

    typeFilterOptions.push(
      ...userTypes.map((userType) => {
        return { key: userType, value: userType, label: userType };
      })
    );
    setTypeFilterOptions(typeFilterOptions);
  }, [userTypes]);

  useEffect(() => {
    const statusFilterOptions = [
      { key: 0, value: "", label: "Todos" },
      { key: 1, value: "Ativo", label: "Ativo" },
      { key: 2, value: "Desativado", label: "Desativado" },
    ];
    setStatusFilterOptions(statusFilterOptions);
  }, []);

  const filteredUsers = users.filter((user) => {
    const typeMatches = !typeFilter || user.userType === typeFilter;
    const statusMatches =
      !statusFilter || 
      (user.isActive && statusFilter == "Ativo") || 
      (!user.isActive && statusFilter == "Desativado");

    return typeMatches && statusMatches;
  });

  function showFormUser(user, event) {
    if (event.target.classList.contains("showFormUser")) {
      showFormEditUser ? setShowFormEditUser(false) : setShowFormEditUser(true)
      setUserById(user)
    }
  }

  return (
    <div>
      <Header local="users" />

      <Filters
        filters={[
          {
            title: "Tipo",
            label: false,
            onChange: (value) => setTypeFilter(value),
            options: typeFilterOptions,
          },
          {
            title: "Status",
            label: false,
            onChange: (value) => setStatusFilter(value),
            options: statusFilterOptions,
          },
        ]}
      />

      {filteredUsers.map((user) => {
        return (
          <CardUser 
            user = {user}
            showFormUser = {showFormUser}
          />
        );
      })}

    { showFormEditUser && 
      <FormEditUser 
        showFormUser={showFormUser} 
        user={userById}
        userTypes={userTypes}
      />
    }    

    </div>
  );
}

export default Users;

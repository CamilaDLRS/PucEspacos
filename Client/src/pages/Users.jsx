import "./pages.css";
import Header from "../components/header/Header";
import CardUser from "../components/cardUser/CardUser";
import { getAllUser, getAllUserTypes } from "../services/user";
import { useEffect, useState } from "react";
import Filters from "../components/filters/filters";

function Users() {
  if (!localStorage.getItem("userType")) {
    window.location = "/";
  }

  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);

  const [typeFilter, setTypeFilter] = useState("");
  const [typeFilterOptions, setTypeFilterOptions] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [statusFilterOptions, setStatusFilterOptions] = useState([]);

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
          <CardUser userName={user.userName} userType={user.userType} email={user.email} isActive={user.isActive} />
        );
      })}
    </div>
  );
}

export default Users;

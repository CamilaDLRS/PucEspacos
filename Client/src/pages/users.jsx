import "./pages.css";
import Header from "../components/header/header";
import CardUser from "../components/cardUser/cardUser";
import { getAllUser, getAllUserTypes } from "../services/user";
import { useEffect, useState } from "react";
import Filters from "../components/filters/filters";
import FormEditUser from "../components/formEditUser/formEditUser";
import { ToastContainer, toast } from 'react-toastify';

function Users() {
  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      window.location = "/";
    } else if (localStorage.getItem("userType") !== "Administrador") {
      window.location = "/reservations";
    }
  })

  useEffect(() => {
    setTimeout(() => {
        toast(localStorage.getItem("responseMessage"))
        localStorage.removeItem("responseMessage")
      }, 100)
  }, [localStorage.getItem("responseMessage")])

  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [userById, setUserById] = useState();
  const [loggedUser, setLoggedUser] = useState();

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
    setLoggedUser(users.find(u => u.userId === localStorage.getItem("userId")));
  }, [users])

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

  const [itensPerPage, setItensPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  let pages = 0;
  let currentUsers = [];
  if (filteredUsers) {
    pages = Math.ceil(filteredUsers.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    currentUsers = filteredUsers.slice(startIndex, endIndex);
  }

  return (
    <>
      {localStorage.getItem("userType") === "Administrador" &&
        <>
          <Header local="users" />
          <div className="page-container">
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
    
            <div className="pages-filter-area"> 
                <div className="pages-filter">
                  {Array.from(Array(pages), (item, index) => {
                    return (
                      <button 
                        value={index} 
                        onClick={(e) => setCurrentPage(Number(e.target.value))}
                        style={index === currentPage ? {background: "rgb(177, 173, 173)"} : null}
                      > {index + 1} </button >
                    )
                  })} 
                </div>
                
                {filteredUsers && filteredUsers.length > 5 
                  ? <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                  </select>
                  : <></>
                }
            </div>
    
            {loggedUser &&
              <div className="user-profile">
                <CardUser 
                    user = {loggedUser}
                    showFormUser = {showFormUser}
                    myProfile="my-profile"
                />
              </div>
            }
    
            {currentUsers.map((user) => {
              return user.userId != localStorage.getItem("userId") ? (
                <CardUser 
                  user = {user}
                  showFormUser = {showFormUser}
                />
              ) : <div></div>;
            })}
    
            { showFormEditUser && 
              <FormEditUser 
                showFormUser={showFormUser} 
                user={userById}
                userTypes={userTypes}
              />
            }    
          </div>
          <ToastContainer />
        </>
      }
    </>
  );
}

export default Users;

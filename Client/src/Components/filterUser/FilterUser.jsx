import { useEffect, useState } from "react";
import { getAllUser } from "../../services/user";

function FilterUser () {
  const [users, setUsers] = useState([]);
  const [userTypes, setUserTypes] = useState([])
  
  useEffect (() => {
    async function fetchUsers() {
      setUsers(await getAllUser())
      setUserTypes( [...new Set(users.map((user) => user.userType))] );
    }

    fetchUsers()
  }, [])

  console.log(userTypes)
  return (
    <div>
      <label htmlFor="select-user">Tipo</label>
      <select name="select-user" id="select-user">
        <option value=""> SELECIONE </option>
        { userTypes.map( type => {
          return (
            <option value={type}> {type} </option>
          )
        }) }
      </select>
    </div>
  )

}

export default FilterUser;
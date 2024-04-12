import IconBxsEdit from "../../imgs/IconBxsEdit";
import "./carduser.css"

function CardUser(prop) {
  
  return (
    <div className="card-user">
      <div className="card-user-header">
        <p> { prop.userName } </p>

        <div className="card-header-user-type">
          <p> { prop.userType } </p>
          <IconBxsEdit />
        </div>
      </div>

      <div className="card-user-body">
        <p> {prop.email} </p>
        { prop.isActive
          ? <p> Ativo </p>
          : <p> Desativado </p>
        }
      </div>
    </div>
  )
}

export default CardUser;
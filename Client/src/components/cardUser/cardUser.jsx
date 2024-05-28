import IconBxsEdit from "../../imgs/iconBxsEdit";
import "./carduser.css"

function CardUser({user, showFormUser, myProfile}) {
  
  return (
    <div className={"card-user " + myProfile }>
      <div className="card-user-header">
        <p> { myProfile ?  <h3>Meu Perfil</h3> :user.userName } </p>

        <div className="card-header-user-type">
          <p> { user.userType } </p>
          {localStorage.getItem("userId") !== user.userId &&
            <div className="edit-icon showFormUser" onClick={showFormUser.bind(event, user)}>
              <IconBxsEdit className="showFormUser" />
            </div>
          }
        </div>
      </div>

      <div className="card-user-body">
        <p> {user.email} </p>
        { user.isActive
          ? <p> Ativo </p>
          : <p> Desativado </p>
        }
      </div>
    </div>
  )
}

export default CardUser;
import "./formedituser.css"
import { getAllSchools } from "../../services/schools";
import Filters from "../filters/filters";
import { useEffect, useState } from "react";
import CardConfirmation from "../cardConfirmation/cardConfirmation";
import { editUser } from "../../services/user";

function FormEditUser({user, showFormUser, userTypes}) {
    const [allSchools, setAllSchools] = useState([]);

    const [statusFilterOptions, setStatusFilterOptions] = useState([]);
    const [schoolsFilterOptions, setSchoolFilterOptions] = useState([]);
    const [typesFilterOptions, setTypesFilterOptions] = useState([]);

    const [dataEditUser, setDataEditUser] = useState({schoolId: user.schoolId, userType: user.userType, isActive: user.isActive});

    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        getAllSchools().then((response) => setAllSchools(response))
    }, []);

    useEffect(() => {
        const statusFilterOptions = [
            { key: 1, value: 1, label: "Ativo" },
            { key: 2, value: 0, label: "Desativado" },
        ];

        setStatusFilterOptions(statusFilterOptions);
    }, [])

    useEffect(() => {
        const typesFilterOptions = []; 

        typesFilterOptions.push(
            ...userTypes.map((userType) => {
                return {key: userType, value: userType, label: userType };
            })
        )

        setTypesFilterOptions(typesFilterOptions);
    }, [userTypes])

    useEffect(() => {
        const schoolsFilterOptions = [];

        schoolsFilterOptions.push(
            ...allSchools.map((school) => {
                return {key: school.schoolId, value: school.schoolId, label: school.nameSchool };
            })
        )

        setSchoolFilterOptions(schoolsFilterOptions);

    }, [allSchools])

    const statusUser = user.isActive ? "Ativo" : "Desativado";

    const filters = [
        {
            title : statusUser,
            label: "Status",
            onChange: (value) => setDataEditUser({...dataEditUser,isActive : value}),
            options: statusFilterOptions,
        },
        {
            title : user.userType,
            label: "Tipo",
            onChange: (value) => setDataEditUser({...dataEditUser,userType : value}),
            options: typesFilterOptions,
        }
    ];

    if (dataEditUser.userType === "Secretário") {
        filters.push({
            title : user.schoolName || "Belas Artes",
            label: "Escola",
            onChange: (value) => setDataEditUser({...dataEditUser,schoolId : value}),
            options: schoolsFilterOptions,
        })
    }


    function showConfirmationCard() {
        showCard ? setShowCard(false) : setShowCard(true);
    }

    return ( 
        <div className="container-absolute showFormUser" onClick={showFormUser.bind(event, "")}>
            <div className="form-edit-user">
                <div className="form-edit-infos">
                    <div className="left-side">
                        <h1> {user.userName} </h1>
                        <h3> {user.email} </h3>
                    </div>

                    <div className="right-side">
                        <Filters filters={filters}/>
                    </div>
                </div>
                
                <div className="btn-area">
                    <div className="showFormUser" onClick={showFormUser.bind(event, "")}>Cancelar</div>
                    <div onClick={(e) => showConfirmationCard()}>Editar</div>
                </div>
            </div>

            { 
                showCard &&
                <CardConfirmation  
                    message={ 
                        (user.isActive === 1 && dataEditUser.isActive === "0") ?
                        <div>
                            Tem certeza que deseja editar este usuário? Você esta desativando ele, caso este tenha alguma reserva com situação 'Ativa' ou 'Solicitada', estas serão canceladas.
                        </div>
                        :
                        <div>
                            Tem certeza que deseja editar este usuário?
                        </div>
                    }
                    showConfirmationCard={showConfirmationCard}
                    action={() => editUser(user.userId, dataEditUser)} 
                />
            }
        </div>
     );
}

export default FormEditUser;
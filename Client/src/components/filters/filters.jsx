import "./filters.css"
import IconPlusCircle from "../../imgs/iconPlusCircle"

function Filters({ filters, showAddButton, triggerFunction, addSomething }) {
  
  return (
    <>
      <div className="filter-container">
        <div className="select-area">
          {filters.map((filter) => (
            <div>
              {filter.label && (
                <label>{filter.label}</label>
              )}
              <select className="filter-select" name={filter.name} onChange={(e) => filter.onChange(e.target.value)}>
                <option hidden="true" className="filter-option">
                  {filter.title}
                </option>
                {filter.options.map((option) => (
                  <option className="filter-option" key={option.key} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        {(localStorage.getItem("userType") === "Administrador") && 
            showAddButton &&
            <div className="add-something icon show-form"  onClick={triggerFunction.bind(event, null)}>
              <p className="show-form"> {addSomething} </p>
              <IconPlusCircle className="icon-add show-form"/>
            </div>
        }
      </div>
    </>
  );
}

export default Filters;

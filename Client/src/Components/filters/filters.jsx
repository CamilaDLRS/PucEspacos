import "./filters.css"
import IconPlusCircle from "../../imgs/IconPlusCircle"

function Filters({ filters, showAddButton, triggerFunction }) {
  
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
          <IconPlusCircle className="icon-add show-create-form" onClick={triggerFunction}/>
        }
      </div>
    </>
  );
}

export default Filters;

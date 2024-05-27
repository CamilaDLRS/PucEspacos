import "./input.css"
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconThreeDots from "../../imgs/IconThreeDots";
import IconBxSearchAlt from "../../imgs/iconBxSearchAlt";

function Inputs({inputTemplate, setInputTemplate, inputs, triggerFunction, setSearch, search}) {

    return ( 
        <div className="options-area">
            {inputs.map(input => ( 
                <div className="filter">
                    { input.label &&
                      input.label !== "Espaços" && 
                        <label htmlFor={input.id}> {input.label} </label>
                    }
                    {input.type === "checkbox" &&
                      <input 
                        checked={inputTemplate.onlyByResponsibleUserId ? true : false}
                        type={input.type} 
                        id={input.id} 
                        onChange={(e) => {
                          input.onChange(e.target.checked)
                        }}
                      />
                    }
                    {input.type  === "button" &&
                     inputTemplate.buildingId !== null &&
                      <div className="show-facility-list" onClick={triggerFunction}>
                        <label className="show-facility-list" htmlFor={input.id}> {input.label} </label>
                        <IconThreeDots id={input.id} className="show-facility-list icon"/>
                      </div>
                    }
                    {input.type === "date" &&
                     <span className="datepicker-toggle" >
                        <IconCalendarDays className="datepicker-toggle-button icon" />
                        <input 
                          className="date-input" 
                          type={input.type} min={input.min} 
                          id={input.id} 
                          value={input.value}
                          onChange={(e) => {
                            return input.onChange((e.target.valueAsNumber + (3 * 60 * 60 * 1000)))}
                          }
                        />   
                     </span>   
                    }
                    {input.type === "select" &&
                      <select className="" id={input.id} onChange={(e) => {
                        if (e.target.value == "null") {
                          setInputTemplate({...inputTemplate, buildingId: null, facilityIds: []})
                        } else {
                          setInputTemplate({...inputTemplate, buildingId: e.target.value, facilityIds: []})
                        }
                      }}>
                        <option hidden="true" className="" value={"null"}>
                          {input.title}
                        </option>
                        {input.options.map((option) => (
                          <option className="" key={option.key} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    }
                </div>
            ))}

            <label 
              htmlFor="icon-search" 
              className="filter" 
              onClick={() => {search ? setSearch(false) : setSearch(true)}}>
                Buscar
                <IconBxSearchAlt className="icon" id="icon-search" height="20px" width="20px"/>
            </label>
        </div>
     );
}

export default Inputs;
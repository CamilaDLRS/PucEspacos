import "./input.css"
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconThreeDots from "../../imgs/IconThreeDots";
import IconBxSearchAlt from "../../imgs/iconBxSearchAlt";

function Inputs({inputTemplate, setInputTemplate, inputs, triggerFunction}) {

    return ( 
        <div className="options-area">
            {inputs.map(input => ( 
                <div className="filter">
                    {input.label !== "Espaços" && 
                        <label htmlFor={input.id}> {input.label} </label>
                    }
                    {input.type === "checkbox" &&
                      <input type={input.type} id={input.id} />
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
                          onChange={(e) => input.onChange(new Date(e.target.value).getTime())}
                        />   
                     </span>   
                    }
                    {input.type === "select" &&
                      <select className="" id={input.id} onChange={(e) => {
                        if (e.target.value == "null") {
                          setInputTemplate({...inputTemplate, buildingId: null})
                        } else {
                          setInputTemplate({...inputTemplate, buildingId: e.target.value})
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
            <div className="icon-search">
              <IconBxSearchAlt height="1.7rem" width="1.7rem" className="icon"/>
            </div>
        </div>
     );
}

export default Inputs;
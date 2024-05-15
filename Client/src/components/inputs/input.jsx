import "./input.css"
import Filters from "../filters/filters";
import IconCalendarDays from "../../imgs/iconCalendarDays";

function Inputs({inputs}) {

    return ( 
        <div className="options-area">
            {inputs.map(input => ( 
                <div>
                    {input.label && 
                        <label htmlFor={input.id}> {input.label} </label>
                    }
                    {input.type === "date" 
                    ? <span className="datepicker-toggle" >
                        <IconCalendarDays className="datepicker-toggle-button" />
                        <input className="date-input" type={input.type} id={input.id}/>   
                     </span>
                    : <input type={input.type} id={input.id}/>   
                    }
                </div>
            ))}
            
        <Filters
          filters={[
            {
              title: "Status",
              onChange: (value) => "",
              options: [],
            },
            {
              title: "Bloco",
              label: false,
              onChange: (value) => "",
              options: [],
            },
          ]}
          
        />
        </div>
     );
}

export default Inputs;
import "./input.css"
import IconCalendarDays from "../../imgs/iconCalendarDays";
import IconThreeDots from "../../imgs/IconThreeDots";
import IconBxSearchAlt from "../../imgs/iconBxSearchAlt";

function Inputs({inputs}) {
    // const dtToday = new Date();
    // const year = dtToday.getFullYear().toString();
    // var month = dtToday.getMonth() + 1;
    // month = month < 10 ? "0" + month.toString() : month.toString();
    // var day = dtToday.getDate().toString();
    // const minDate = `${year}-${month}-${day}`
    // console.log(minDate)

    return ( 
        <div className="options-area">
            {inputs.map(input => ( 
                <div className="filter">
                    {input.label && 
                        <label htmlFor={input.id}> {input.label} </label>
                    }
                    {input.type === "checkbox" &&
                      <input type={input.type} id={input.id}/>
                    }
                    {input.type === "button" &&
                      <IconThreeDots id={input.id}/>
                    }
                    {input.type === "date" &&
                     <span className="datepicker-toggle  " >
                        <IconCalendarDays className="datepicker-toggle-button" />
                        <input className="date-input" type={input.type} id={input.id} />   
                     </span>   
                    }
                    {input.type === "select" &&
                      <select className="" id={input.id} onChange={(e) => input.onChange(e.target.value)}>
                      <option hidden="true" className="">
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
import React, { useState, useEffect, Fragment} from "react";

const FormMultiSelectDropdown = ({label, name, values,onChange}) => {
    
    const [errorMsg, setErrorMsg] = useState("");
   
    const handleInput = (event) => {
        var options = event.target.options;
        var value = [];
        for(var i=0,l=options.length;i<l;i++){
            if(options[i].selected){
                value.push(options[i].value);
            }
        }
        onChange(event.target.name, value, event.target.type);
    }

    return(
        <div className = "form-group row">
        <label className="col-sm-3 col-form-label">{label}</label>
        <select name={name} className="form-control col-sm-8" onChange={handleInput}  multiple data-live-search="true">
          {values.map((val, index) => (
            <option key={index} value={val} name={val}>
              {val}
            </option>
          ))}
        </select>
      </div>    
    );
}

export default FormMultiSelectDropdown;

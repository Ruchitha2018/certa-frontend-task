import React, { useState, useEffect, Fragment} from "react";

const FormDropDownField = ({label, name, values,onChange, regex, error_validate, valid}) => {
    
    const [errorMsg, setErrorMsg] = useState("");
   
    const handleInput = (event) => {
        
        if(event.target.value === "0"){
           setErrorMsg("Required Field");
        }else if(regex){
             var pattern = new RegExp(regex);
             if(!pattern.test(event.target.value)){
             setErrorMsg(error_validate);       
            }else{
               setErrorMsg("");
               onChange(event.target.name, event.target.value);
        }
       }else{
           setErrorMsg("");
           onChange(event.target.name, event.target.value);
       }
    }
   
    useEffect(() => {
      InputError();
      console.log(valid);    
    }, [errorMsg]);
    
    const InputError = () => {
        return (
          <Fragment>
           <p className="offset-md-3 col-md-9 error-message">{errorMsg}</p>
          </Fragment>    
        )
    }
    return(
        <div className = "form-group row"> 
           <label className="col-sm-3 col-form-label">{label}</label>
           <select name = {name} className = "form-control col-sm-8" onChange={handleInput}>
              <option value = "0">Please Select</option>
              {values.map(val => <option value={val} key={val}>{val}</option>)}
           </select>
        {InputError()}
        </div>
    );
}

export default FormDropDownField;

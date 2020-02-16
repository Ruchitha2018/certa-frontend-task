import React, { useState, useEffect, Fragment} from "react";

const FormRadioField = ({label, name, values,onChange, regex, error_validate}) => {
    
    const [errorMsg, setErrorMsg] = useState("");
   
    const handleInput = (event) => {
        
        if(event.target.value === ""){
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
           <label className="col-sm-3 col-form-label radio-inline">{label}</label>
              {values.map(val => {
               return <label><input type="radio" value={val} name={label} onChange={handleInput}/>{val}</label>
               })}
            {InputError()}
        </div>
    );
}

export default FormRadioField;
 
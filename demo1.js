import React, { useState, useEffect} from "react";

const FormInputTextField = ({label, name, validate, error_validate}) => {
    
    const [errorMsg, setErrorMsg] = useState("");
    
   const handleInput = (event) => {
       if(event.target.value === ""){
           setErrorMsg("Required Field");
       }else if(event.target.value){
             var pattern = new RegExp(validate);
                if(!pattern.test(event.target.value)){
                     setErrorMsg(error_validate);
                    
              }else{
                   setErrorMsg("");
                  return true;
              }
       }
    }
    
    useEffect(() => {
      InputError();
    }, [errorMsg]);
    
    const InputError = () => {
        return (
          <div>
           {errorMsg}
          </div>    
        )
    }
    
    return(
        <div className = "form-group row"> 
           <label className="col-sm-2 col-form-label">{label}</label>
           <input type = "text" name={name} className="form-control col-sm-9" onChange = {handleInput}  />
           {InputError()}
        </div>
    );
}

export default FormInputTextField;

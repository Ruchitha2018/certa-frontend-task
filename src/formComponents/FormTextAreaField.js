import React, { useState, useEffect, Fragment} from "react";

const FormTextAreaField = ({label, name, regex,onChange, error_validate}) => {
    
    const [errorMsg, setErrorMsg] = useState("");
   
    const handleInput = (event) => {
        console.log(event.target.value);
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
           <label className="col-sm-3 col-form-label">{label}</label>
           <textarea name = {name}  className = "form-control col-sm-8" onChange={handleInput}></textarea>
           {InputError()}
        </div>
    );
}

export default FormTextAreaField;

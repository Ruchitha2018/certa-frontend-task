import React, { useState, useEffect} from "react";
import { getFormData, getStatesData } from "./apiCore";
import InputTextField from "../formComponents/FormInputTextField";
import TextAreaField from "../formComponents/FormTextAreaField";
import DropDownField from "../formComponents/FormDropDownField";
import RadioField from "../formComponents/FormRadioField";
import DependantDropdown from "../formComponents/FormDependantDropDown";
import MultiSelectDropdown from "../formComponents/FormMultiSelectDropdown";
import RestCountriesComponent from "./RestCountriesComponent";


 const Home = () => {

    const [formData, setformData] = useState([]);
    const [formValues, setformValues] = useState([]);
     
    useEffect(() => {
            loadFormData();
    }, []);
     
    const loadFormData = () => {
              getFormData().then(data => {
            if(data.error){
                console.log("error");
            }else{
                setformData(data);
            }
        }); 
     };
  
    const handleSubmit = event => {
          if(formValues.length == 0){
              console.log("hello");
          }            
     }
    
    const handleInput = (name, value) => {
        setformValues({...formValues, [name]:value});
        console.log(value);
    }
    
    const displayFormValues = () => {
          if(formValues && formValues.length == 0){
            return "";
          }else{
              return <div className = "certa-form-values">
                    <h4>Registration Form Values</h4><hr />
                    <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                    </div>;
          }
    }
        
    const displayFormData = () => {
        return(
           <div className="certa-form">
             {formData.map(form => {
                 if(form.input_type === "text"){
                   return <InputTextField name={form.name} label={form.label}  onChange={handleInput} regex={form.regex} error_validate={form.error_validate} />;
                 }else if(form.input_type === "textarea"){
                   return <TextAreaField name = {form.name} label={form.label} onChange={handleInput} regex={form.regex} error_validate={form.error_validate} />;
                 }else if(form.input_type === "dropdown"){
                     return <DropDownField  name = {form.name} values = {form.values} label={form.label} onChange={handleInput} regex={form.validate} error_validate={form.error_validate}/>
                 }else if(form.input_type === "radio"){
                     return <RadioField  name = {form.name} values = {form.values} label={form.label} onChange={handleInput} regex={form.validate} error_validate={form.error_validate}/>
                 }else if(form.input_type === "multiselect"){
                     return <MultiSelectDropdown name={form.name} values = {form.values}
                     onChange={handleInput} label={form.label} />
                 }
            })}
              <DependantDropdown onChange={handleInput}/>
             <button className="btn btn-primary" onClick={handleSubmit}>Submit Your Form</button>
        </div>
        );
    }
    
    return(
      <div className = "container">
        <div className = "row">
        <div className="col-md-7 certa-form">
          <h4>Registration Form</h4>
         {displayFormData()}
        </div> 
        <div className = "col-md-5">
            {displayFormValues()}
            <h4>Rest Countries Api</h4><hr />
            <RestCountriesComponent />
        </div>    
        {displayFormValues()}
        </div>
      </div>    
    );
}

export default Home;
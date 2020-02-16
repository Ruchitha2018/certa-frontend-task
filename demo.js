import React, { useState, useEffect} from "react";
import { getFormData, getRegionsApi, getRegionCountriesApi } from "./apiCore";
import InputTextField from "../formComponents/FormInputTextField";
import TextAreaField from "../formComponents/FormTextAreaField";
import DropDownField from "../formComponents/FormDropDownField";


const Home = () => {

    const [formData, setformData] = useState([]);
    const [formValues, setformValues] = useState([]);
    const [regions, setRegions] = useState([]);
    const [regionCountries, setRegionCountries] = useState([]);
 
    useEffect(() => {
            loadFormData();
            loadRegions();
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
    
    const loadRegions = () => {
        var regionsArray = [];
        var i = 0;
         getRegionsApi().then(data => {
             if(data.error){
                 console.log("error");
             }else {
                 data.map(info => {
                     if(info.region){
                         regionsArray[i] = info.region;
                         i++;
                     }
                 });
             }
            regionsArray = [...new Set(regionsArray)]; 
            setRegions(regionsArray);
         }); 
     }
    const handleSubmit = event => {
            event.preventDefault();
     }
   
   const handleInput = event => {
       var label = [];
       var name = [];
       var i = 0;
       if(event.target.name === "regions" && event.target.value != "0"){
              getRegionCountriesApi(event.target.value).then(data => {
               if(data.error){
                console.log("error");
               }else{
                data.map(info => {
                   label[i] = info.name;
                    name[i] = info.name;
                 });   
                setRegionCountries(data);  
            }
        }); 
       }
       setformValues({...formValues, [event.target.name]:event.target.value});
   }
    
    const displayFormData = () => {
        return(
           <form className = "col-md-8 offset-md-2">
             {formData.map(form => {
                 if(form.input_type === "text"){
                   return <InputTextField name={form.name} label={form.label} handleChange={handleInput} />;
                 }else if(form.input_type === "textarea"){
                   return <TextAreaField name = {form.name} label={form.label} />;
                 }else if(form.input_type === "dropdown"){
                     return <DropDownField  name = {form.name} values = {form.values} label={form.label}/>
                 }
            })}
             <div className="form-group row">
                <label className="col-sm-2 col-form-label">Regions</label>
                <select className="form-control col-sm-9" name = "regions" onChange={handleInput}>
                 <option value = "0">Please Select</option>              
                    {regions &&
                        regions.map((r, i) => (
                            <option key={i} value={r}>
                                {r}
                            </option>
                        ))}
                </select>                                                      
            </div>
             {regionCountries != "" && 
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Countries</label>
                <select className="form-control col-sm-9" name = "countries" onChange={handleInput}>
                 <option value = "0">Please Select</option>              
                    {regionCountries &&
                        regionCountries.map((r, i) => (
                            <option key={i} value={r.name}>
                                {r.name}
                            </option>
                        ))}
                </select>                                                      
            </div>
             }
             <button className="btn btn-primary" onClick={handleSubmit}>Submit Your Form</button>
        </form>
        );
    }
    
    return(
      <div className = "container">
        <div className = "row">
         {displayFormData()}
        </div>
      </div>    
    );
}

export default Home;
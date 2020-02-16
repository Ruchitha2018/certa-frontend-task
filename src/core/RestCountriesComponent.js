import React, { useState, useEffect} from "react";
import { getRegionsApi, getRegionCountriesApi } from "./apiCore";

const RestCountriesComponent = () => {

    const [regions, setRegions] = useState([]);
    const [regionCountries, setRegionCountries] = useState([]);
 
    useEffect(() => {
            loadRegions();
    }, []);   
 

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
   }
    
    const displayFormData = () => {
        return(
           <form className="col-md-12">
             <div className="form-group row">
                <label className="col-sm-3 col-form-label">Regions</label>
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
                <label className="col-sm-3 col-form-label">Countries</label>
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
        </form>
        );
    }
    
    return(
        <div className = "row">
         {displayFormData()}
        </div>
    );
}

export default RestCountriesComponent;
import React, { useState, useEffect} from "react";
import { getStatesData } from "../core/apiCore";

const FormDependantDropDown = ({onChange}) => {
    
    const [values, setValues] = useState([]);
    const [parent, setParent] = useState([]);
    const [child, setChild] = useState([]);
    
    const loadValueData = () => {
        var parentArray = [];
        var i=0;
        getStatesData().then(data => {
            if(data.error){
                console.log("error");
            }else{
                setValues(data);
               data.values.map(info => {
                   if(info.parent_state == 0){
                       parentArray[i] = info;
                         i++;
                   }
               });
            }
        });
        setParent(parentArray);
    };

    const handleParentInput = (event) => {
        var childArray = [];
        var i=0;
        values.values.map(val => {
            if(val.parent_state == event.target.value){
               childArray[i] = val; 
                i++;
            }
        });
        onChange(event.target.name, event.target.value);
        setChild(childArray);
    }
    const handleChildInput = (event) => {
        onChange(event.target.name, event.target.value);
    }
    useEffect(() => {
            loadValueData();
    }, []);   
    
    return(
        <div>
        <div className = "form-group row"> 
           <label className="col-sm-3 col-form-label">{values.parent_dropdown_label}</label>
              <select  className = "form-control col-sm-8" onChange={handleParentInput} name={values.parent_name}>
                <option value = "">Please Select</option>
                {parent.map(val => <option value={val.id} key={val}>{val.name}</option>)}
             </select>
        </div>
        <div className = "form-group row"> 
           <label className="col-sm-3 col-form-label">{values.child_dropdown_label}</label>
              <select  className = "form-control col-sm-8" name={values.child_name} onChange={handleChildInput}>
                <option value = "">Please Select</option>
                {child.map(val => <option value={val.id} key={val}>{val.name}</option>)}
             </select>
        </div>
        </div>
    );
}

export default FormDependantDropDown;

export const getFormData = () => {
 
    return fetch(`./formjsondata.json`, {
        method: "GET",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((response) => response.json())
    .then((data) => {return data;})};

export const getStatesData = () => {
 
    return fetch(`./statesjsondata.json`, {
        method: "GET",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((response) => response.json())
    .then((data) => {return data;})};


export const getRegionsApi = () => {
    
    return fetch("https://restcountries.eu/rest/v2/all", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {return data;})
};

export const getRegionCountriesApi = regionName => {
 
    return fetch(`https://restcountries.eu/rest/v2/region/${regionName}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {return data;})
};


 
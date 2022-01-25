import React,{useEffect, useState} from 'react';
import axios from 'axios'
import './style.css'

function States() {

    const [selected_country,setSelectedCountry] = useState([])
    const [country_name,setCountryName] = useState("")

    useEffect(()=>{

        axios.post('http://localhost:8000/api',{country:country_name})
        .then(res=>{
            if(res.data.status){
                setSelectedCountry([res.data.data])
            }
        })

    },[country_name])

    const handleSelect = (e)=>{
        setCountryName(e.target.value)
    }

  return <div>

        <h1>covid information</h1>
    
        <div>
            <select id="select" name="country" onChange={handleSelect}>
                    <option>Select Country</option>
                    <option>India</option>
                    <option>Chaina</option>
                    <option>U.S.A</option>
                    <option>Brazil</option>
            </select>
        </div>

       <h3>select country to get covid information</h3>

        {selected_country.length?selected_country.map((country)=>{ 

            return(

            <div key={country.COUNTRY_NAME} id="form">
                <div style={{marginLeft:"25px"}}><label>Country name:</label>{country.COUNTRY_NAME}</div>
                <div><label>Totel conformed:</label>{country.TOTEL_CASES}</div>
                <div><label>Totel recovered:</label>{country.TOTEL_RECOVERED}</div>
                <div><label>Totel deaths:</label>{country.TOTEL_DEATHS}</div>
                <div><label>Totel vaccine available:</label>{country.TOTEL_VACCINE_AVAILABLE}</div>
                <div><label>Totel beds available:</label>{country.TOTEL_BEDS_AVAILABLE}</div>
                <div><label>Totel oxigen available:</label>{country.TOTEL_OXIGEN_AVAILABLE}</div>
                <div><label>Today tests done:</label>{country.TODAY_TESTS_DONE}</div>
                <div><label>Today conformed:</label>{country.TODAY_CASES}</div>
                <div><label>Today recovered:</label>{country.TODAT_RECOVERIES}</div>
                <div><label>Today deaths:</label>{country.TODAT_DEATHS}</div>
            </div>
            )

        }):""}
            
  </div>
}

export default States;

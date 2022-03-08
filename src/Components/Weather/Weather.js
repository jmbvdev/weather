import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../Weather/weather.css"

const Weather = () => {

    const [weather, setWeather]= useState({})
    const [isFahrenheit, setIsFahrenheit]= useState(true)
    const [temperature, setTemperature]= useState(0)
    const [isLoading, setIsLoading]= useState(true)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(success)

    },[])


    const success =pos=>{
        const latitude = pos.coords.latitude
        const longitude = pos.coords.longitude
        
     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a5a87624955220e76576e95ee858d367`)
     .then(res=>{
         setWeather(res.data)
        setTemperature(Math.round(res.data.main.temp))
        setIsLoading(false)
       
        })
    }

    const convertTemp =()=>{
        if(isFahrenheit){
            setTemperature( Math.round((temperature-273.15)) )
            setIsFahrenheit(false)
        }
        else{
            setTemperature(Math.round((temperature+273.15)))
            setIsFahrenheit(true)
        }
    }



    return (
        <div className='weather'>
            {
                isLoading ? (
                    <div class="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <h2>Loading....</h2>
                    </div>
                ):(
                    <>
                    <div className='weather-titles'>
                        <h1>Weather App</h1>
                        <h2>{weather.name}, {weather.sys?.country} </h2>
                    </div>
                    <div className='weather-container'>
                        <div className='weather-grades'>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt="" />
                            <h4>{temperature} {isFahrenheit? "F°": "C°"}</h4>
                        </div>
                        <div className='weather-specs'>
                            <h4>{weather.weather?.[0].description}</h4>
                            <ul>
                                <li><b>Wind Speed: </b>{weather.wind?.speed} m/s</li>
                                <li><b>Clouds: </b>{weather.clouds?.all} %</li>
                                <li><b>Pressure: </b>{weather.main?.pressure} mb</li>
                            </ul>
                        </div>
                    </div>
                    <div className='weather-btn'>
                        <button onClick={convertTemp}>Convert to {isFahrenheit? "C°": "F°"}</button>

                    </div>
                    </>
                )
                    }
                </div>
    );
};

export default Weather;
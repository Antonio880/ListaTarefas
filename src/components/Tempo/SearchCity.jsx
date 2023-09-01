import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
//import { useWeatherDataContext } from "./ContextWeather";

export default function SearchCity( setWeatherData ) {
    
    const { register, handleSubmit, watch } = useForm();
    // const { setWeatherData } = useWeatherDataContext({});

    const apiKey = "808651ceffd008adc9d955bc796ea8c1";
    const handleLogin = async () => {
        let cityName = watch("cityName");
        
        try {
            const resNameCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}&lang=pt_br`); 
            const response = resNameCity.data[0];     

            const lat = response.lat;
            const lon = response.lon;
            const iconCity = response.country;
            const cityNameReq = response.name;

            const resWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const weatherData = resWeather.data;
            
            let deg = parseFloat(weatherData.main.temp);
            let celsius = (deg - 32) / 1.8;
            
            const weather = weatherData.weather[0].main;
            const weatherIcon = weatherData.weather[0].icon;
            const precipitation = weatherData.minutely ? weatherData.minutely[0].precipitation : 0; // Verifique se minutely está disponível
            const windSpeed = weatherData.wind.speed * 100;

            let weatherObject = {
                "name": cityNameReq,
                "iconCity": iconCity,
                "temp": celsius,
                "weather": weather,
                "weatherIcon": weatherIcon,
                "precipitation": precipitation,
                "windSpeed": windSpeed,
            };

            console.log(weatherObject);
            setWeatherData(prevWeatherData => [...prevWeatherData, weatherObject]);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    return(
        <form onSubmit={handleSubmit(handleLogin)} style={{display: "flex",marginBottom: "1rem", padding: "0.8rem", border: "none", flex: 1, borderRadius: "4"}}>
            <input 
             className="form-control me-2" 
             type="search"
             placeholder="Search" 
             {...register("cityName", { required: true })}
             />
            <button class="btn btn-outline-sucess">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useWeatherDataContext } from "./ContextWeather";

export default function SearchCity(){
    
    const { register, handleSubmit, watch } = useForm();
    const [ nameCity, setNameCity ] = useState("");
    const { setWeatherData } = useWeatherDataContext({});

    const apiKey = "808651ceffd008adc9d955bc796ea8c1";
    const handleLogin = () => {
        let cityName = watch("cityName");
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
         .then(response => {
            if (response.data.length > 0) {
                const cityData = response.data[0];
                setNameCity(cityData.name);

                const lat = cityData.lat;
                const lon = cityData.lon;

                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                 .then(response => {
                    const deg = parseFloat(response.data.current.temp);
                    const celsius = (deg - 32) / 1.8;
                    const weather = response.data.current.weather[0].main;
                    const weatherIcon = response.data.current.weather[0].icon;
                    const precipitation = response.data.minutely[0].precipitation;
                    const windSpeed = response.data.current.wind_speed;

                    const weatherObject = {
                        name: nameCity,
                        temp: celsius,
                        weather: weather,
                        weatherIcon: weatherIcon,
                        precipitation: precipitation,
                        windSpeed: windSpeed,
                    };

                    console.log(weatherObject);
                    // setWeatherData([...weatherData, weatherObject]);
                 })
                 .catch(err => console.log(err));
            } else {
                console.log("City not found");
            }
        })
        .catch(err => console.log(err));
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
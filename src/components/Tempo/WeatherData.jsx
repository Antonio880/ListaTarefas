import { useWeatherDataContext } from "./ContextWeather";

export default function WeatherData( weatherData ) {
    
    // const { weatherData } = useWeatherDataContext();
    console.log(weatherData);
    return(
        <div style={{borderTop: "1px solid #fff", marginTop: "1.5rem", paddingTop: "1.5rem", textAlign: "center", marginBottom: "9.6px"}}>
            <h2 style={{display: "flex", justifyContent: "center", }}>
                <i style={{fontSize: "1.4rem"}} className="fa-solid fa-location-dot"></i>
                <span style={{margin: ".6rem"}} id="city">{weatherData.name}</span>
                <img style={{height: "30px"}} src={`https://flagsapi.com/${weatherData.weatherIcon}/flat/64.png`} alt="Bandeira do País" />
            </h2>
            <p><span>{weatherData.temp}</span>&deg;C</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: ".6rem 0"}}>
                <p>{weatherData.weather}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}.png`} alt="Condições Climáticas" />
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p style={{borderRight: "1px solid #fff", padding: ".6rem"}}>
                    <i className="fa-solid fa-droplet"></i>
                    <span>{weatherData.precipitation}</span>
                </p>
                <p style={{marginLeft: ".6rem"}}>
                    <i className="fa-solid fa-wind"></i>
                    <span>{weatherData.windSpeed}</span>
                </p>
            </div>
        </div>
    );
}
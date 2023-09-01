import SearchCity from "../components/Tempo/SearchCity";
import WeatherData from "../components/Tempo/WeatherData";
import Header from "../components/Header";
import { useUserContext } from "../components/mercado/ContextUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Tempo(){
    
    const [ weatherData, setWeatherData ] = useState({});
    const { user } = useUserContext();
    const navigate = useNavigate();
    const apiKey = "808651ceffd008adc9d955bc796ea8c1";
    

    return(
        <div>
            {/* <Header user={user} navigate={navigate}/> */}
            <div style={{padding: 0, margin: 0,display: "flex", justifyContent: "center", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                <div style={{background: "#a04cea", padding: "2rem", color: "#FDFDFD", borderRadius: "1rem"}} className="shadow-2xl ... ">
                    <h4>Confira o clima de uma cidade:</h4>
                    <SearchCity setWeatherData={setWeatherData}/>
                    <WeatherData weatherData={weatherData}/>
                </div>
            </div>
        </div>
    );
}
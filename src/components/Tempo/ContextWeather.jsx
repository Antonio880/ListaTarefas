import { createContext, useContext, useState } from "react";

const WeatherDataContext = createContext();

export function useWeatherDataContext(){
    return useContext(WeatherDataContext);
}

export function WeatherDataContextProvider({ children }){
    const [weatherData, setWeatherData] = useState({});

    return(
        <WeatherDataContext.Provider value= {{ weatherData, setWeatherData }}>
            {children}
        </WeatherDataContext.Provider>
    );
}
export default function WeatherData( imgApiFlag ){
    


    return(
        <div style={{borderTop: "1px solid #fff", marginTop: "1.5rem", paddingTop: "1.5rem", textAlign: "center", marginBottom: "9.6px"}}>
            <h2 style={{display: "flex", justifyContent: "center", }}>
                <i style={{fontSize: "1.4rem"}} className="fa-solid fa-location-dot"></i>
                <span style={{margin: ".6rem"}} id="city">Brasil</span>
                <img style={{height: "30px"}} src={imgApiFlag} alt="Bandeira do País" />
            </h2>
            <p><span >63</span>&deg;C</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: ".6rem 0"}}>
                <p>Nublado</p>
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="Condições Climáticas" />
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p style={{borderRight: "1px solid #fff", padding: ".6rem"}}>
                    <i className="fa-solid fa-droplet"></i>
                    <span>40%</span>
                </p>
                <p style={{marginLeft: ".6rem"}}>
                    <i className="fa-solid fa-wind"></i>
                    <span>3km/h</span>
                </p>
            </div>
        </div>
    );
}
import React, { useState }  from "react";
const api={
    key: "d1845658f92b31c64bd94f06f7188c9c",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App(){

    const [query , setquery] = useState("");
    const [weather , setweather] = useState({});

    const search = evt => {
        if(evt.key === "Enter"){
              fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
             .then(res => res.json()).then(result =>{
                setweather(result)
                setquery("");
                console.log(result);
            });
        }
    }

    const ShowDate = (d)=>{
        let months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} , ${date} ${month} ${year}`;
    }

    function setbackground(wtype){
             switch(wtype){
                case 'Haze': 
                     return "warm";
                case 'Clouds': 
                     return "cloudy";
                case 'Rain': 
                     return "rain";
                case 'Mist':
                     return "mist"
                default:
                    console.log(weather.weather[0].main);
                    return "app";
             }
    }
    const check = weather ;
    
    return (
        <div className={check.main !== undefined ? setbackground(check.weather[0].main) : "app"}>
         <main>
            <div className="search-box justify-between">
              <input 
               type = "text"
               placeholder="city Name"
               className="search-bar"
               onChange={event=>{setquery(event.target.value)}}
               value={query}
               onKeyDown={search}
              />
            </div>
            {(typeof(weather.main) !== 'undefined') ? (
             <div>
                <div className="location-box">
                     <div className="location">{weather.name},{weather.sys.country}</div>
                     <div className="date">{ShowDate(new Date())}</div>
                </div>
                <div className="weather-box">
                     <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
                     <div className="weather">{weather.weather[0].main}</div>
                </div>
            </div> 
            ) : (
                <div className="home-box">
                   <div className="home">
                       <div id="symbol">
                            <div>
                                <span class="material-symbols-outlined">cloudy</span>
                                <h5>Cloudy</h5>
                            </div>
                            <div>
                                <span class="material-symbols-outlined">mist</span>
                                <h5>Mist</h5>
                            </div>
                            <div>
                                <span class="material-symbols-outlined">rainy</span>
                                <h5>Rainy</h5>
                            </div>
                        </div>
                        <p>WeatherWise</p>
                   </div>
                </div>
            )}
         </main>
        </div>
    )
}

export default App ;
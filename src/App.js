import './App.css';
import { useState, useEffect } from 'react';
import WeatherInfoStat from './WeatherInfoStat';


function App() {

  const [inputValue, setInputValue] = useState("");
  
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDecription] = useState("");
  const [tempHigh, setTempHigh] = useState("");
  const [tempLow, setTempLow] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");

  
  
  // Days of week
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  //Months of year
  const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];

  // Get current date
  const month = new Date().getMonth()
  const dayNumber = new Date().getDate()
  const day = new Date().getDay()
  

  const apiKey = "8ef829496749a0cb12fdc0d6a0f461c2"

  // Coverts epochTime to readable time
  const convertEpochToTime = (epochTime)=>{
    let utcSeconds = epochTime
    var date = new Date(0);
    date.setUTCSeconds(utcSeconds);
    let hours = date.getHours()
    if (hours >12) {
      hours = hours % 12
    }
    if (hours === 0) {
      hours = 12
    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
      minutes = "0"+minutes
    }
    return `${hours}:${minutes}`
  }

  // Gets data from api and sets values to that data
  const getData = async(cityValue)=>{
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=imperial`)
    const json = await data.json();
  
  // Checks if there is a error to api
  if (json.cod === "400" || json.cod === "404") {
    alert("No City Found")
  }
  else{
    setCity(json.name)
    setCountry(json.sys.country)
    setIcon(json.weather[0].icon)
    setTemperature(String(json.main.temp).substring(0, 2))
    setDecription(json.weather[0].description)
    setTempHigh(json.main.temp_max)
    setWind(json.wind.speed)
    setSunrise(convertEpochToTime(json.sys.sunrise))
    setTempLow(json.main.temp_min)
    setHumidity(json.main.humidity)
    setSunset(convertEpochToTime(json.sys.sunset))
    }
  }

  // Sets data to bostons data onload
  useEffect(() => {
    getData("Boston")
  }, []);

  return (
    <div className="App">
      <h1 className = "title">WEATHER APP</h1>
      <div className = "inputContainer">
        <input className = "locationInput" placeholder = "Enter city" value = {inputValue} onChange = {(event)=>setInputValue(event.target.value)}></input>
        <button className="locationButton" onClick={() => {getData(inputValue)
        setInputValue("")}}>Search</button>
      </div>
      <div className = "areaAndDateDiv">
        <h2 className = "locationText">{city}, {country}</h2>
        <p className = "dateText">{days[day]} {dayNumber} {months[month]}</p>
      </div>
      <div className = "curretTempAndStats">
        <div className = "iconAndTemp">
          <img className = "weatherIcon" src={`http://openweathermap.org/img/wn/${icon}@4x.png`}></img>
          <h1 className= "weatherTemp">{temperature}°</h1>
          <p className= "weatherDescription">{description}</p>
        </div>
        <div className = "weatherInfo">
          <WeatherInfoStat name="High" value={tempHigh} type= "°"></WeatherInfoStat>
          <WeatherInfoStat name="Wind" value={wind} type="mph"></WeatherInfoStat>
          <WeatherInfoStat name="Sunrise" value={sunrise} type = ":"></WeatherInfoStat>
          <WeatherInfoStat name="Low" value={tempLow} type= "°" ></WeatherInfoStat>
          <WeatherInfoStat name = "Humidity" value = {humidity} type = "%"></WeatherInfoStat>
          <WeatherInfoStat name = "Sunset" value = {sunset} type = ":"></WeatherInfoStat>
        </div>
      </div>
      
    </div>
  );
}

export default App;

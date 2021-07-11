import "./../scss/main.scss"
require('dotenv').config()

/*
 * This app shows the weather of the city you input
 *
*/
const api_key = process.env.API_KEY;
let cityName = document.getElementById("name");
let weatherDescription = document.getElementById("desc");
let tempIcon = document.getElementById("tempIcon")
let temperature = document.getElementById("temp");

/*  
 * The getWeather function gets the current weather data.
 * Uses openweathermap api
 * Gives the info to the displayWeather function from the api
*/ 


function getWeather(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
    + city 
    +"&units=metric&appid="+api_key+"")
    .then( (response) => response.json())
    .then((data) => displayWeather(data)); 
    
}
/*  
 * The displayWeather function gets the needed info from the api.
 * Inserts the wanted data into dom
*/ 
function displayWeather(data) {
    const { name } = data;
    const { temp } = data.main;
    const { icon, description } = data.weather[0];
    
    cityName.innerText = name;
    temperature.innerText = Math.round(temp) + "°C";
    weatherDescription.innerText = description;
    tempIcon.src ="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
    tempIcon.style.display = "inline-block";
}
/* 
 * Eventlisteners to input and button(button is hidden in app for now)
*/
document.getElementById("submitButton")
.addEventListener("click", () => {
    getWeather(document.getElementById("inputValue").value)
});
document.getElementById("inputValue").addEventListener("keypress", (event)=> {
    if (event.key == "Enter") {
        document.getElementById("submitButton").click();
    }
    
});


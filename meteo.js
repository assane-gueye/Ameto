var button = document.querySelector(' .btn-lg');
var inputValue = document.querySelector('.input_text');
var name = document.querySelector('.loc');
var desc = document.querySelector('.desc')
var temp = document.querySelector('.temp')
function myFunction() {
    var x = document.getElementById("text").value;
    document.getElementById("loc").innerHTML = x;
    var res = toUpperCase();
    document.getElementById("text").innerHTML = res;
}
var input = document.getElementById("text");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});


button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=fbbd7cd45f909f026054832ea41260f8&lang=it')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['loc'];
            var tempValue = data['main']['temp'];
            var descValue = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.country = data.sys.country;
            weather.city = data.name;
            

            name.innerHTML = nameValue;
            temp.innerHTML = Math.floor(tempValue - 273) + '° C' ;
            desc.innerHTML = descValue;
            iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
            locationElement.innerHTML = `${weather.city}, ${weather.country}`;


            


            
            
        })


        .catch(err => alert('Indicare il  nome completo della città (almeno 3 caratteri)'))
})

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit : "celsius"
}


const KELVIN = 273;

const key = "fbbd7cd45f909f026054832ea41260f8";

//  GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Il Browser non supporta la Geolocalizzazione :-(</p>";
}

// POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}


function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=it`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}


function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}


function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}


tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#cityname');
const apiKey = '89533c964936bfc40813a2cb34645564';

// DOM reference variables
const cityInfo = document.querySelector('#namedate');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const windspeed = document.querySelector('#windspeed');
const weatherDesc = document.querySelector('#description');
const weatherIcon = document.querySelector('#weathericon');

// variables from object response

let mainName;
let mainDate;
let mainTemp;
let mainHumid;
let mainWindSpeed;
let mainDesc;
let mainIcon;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = nameInputEl.value.trim();

  if (cityName) {
    getWeatherInfo(cityName);

    nameInputEl.value = '';
  } else {
    alert('Please enter a city name');
  }
};


var getWeatherInfo = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=minutely,hourly&appid=' + apiKey;

  fetch(apiUrl)
    .then(function (response) {
      console.log(apiUrl, "API fired")
      console.log(response)
      return response.json();
    })
    .then (function (response){
    mainName = response.name;
    mainDate = moment().format("MM/DD/YYYY");
    mainTemp = response.main.temp;
    mainHumid = response.main.humidity;
    mainWindSpeed = response.wind.speed;
    mainDesc = response.weather[0].description;
    mainIcon = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;

    cityInfo.textContent = mainName + ' ' + mainDate;
    temp.textContent = 'Temperature: ' + mainTemp + 'F';
    humidity.textContent = 'Humidity: ' + mainHumid + '%';
    windspeed.textContent = 'Windspeed: ' + mainWindSpeed + 'MPH';
    weatherDesc.textContent = 'Description: ' + mainDesc;
    weatherIcon.setAttribute('src', mainIcon);

    })
    .catch(function (err) {
      console.error(err);
    });

};



userFormEl.addEventListener('submit', formSubmitHandler);


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


var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = nameInputEl.value.trim();

  if (cityName) {
    getWeatherInfo(cityName);
    getForecastInfo(cityName);

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
    .then(function (response) {

      let mainName = response.name;
      let mainDate = moment().format("MM/DD/YYYY");
      let mainTemp = response.main.temp;
      let mainHumid = response.main.humidity;
      let mainWindSpeed = response.wind.speed;
      let mainDesc = response.weather[0].description;
      let mainIcon = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;

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

var getForecastInfo = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey;
  

  fetch(apiUrl)
    .then(function (response) {
      console.log(apiUrl, "API fired")
      // console.log(response)
      return response.json();
    })
    .then(function (response) {

      const forecastApiCall = response.list

      for (let i = 0; i < forecastApiCall.length; i++) {
        let forecastArr = forecastApiCall[i];
        console.log("FIVE DAY ARRAY: ", forecastArr)

      let forecastDate = forecastArr.dt_txt;
      let forecastTemp = 'Temperature' + forecastArr.main.temp + ' F';
      let forecastHumidity = 'Humidity: ' + forecastArr.main.humidity + '%';
      let forecastWind ='Windspeed: ' + forecastArr.wind.speed + ' MPH';
      let forecastDescr = 'Description: ' + forecastArr.weather[0].description;

      let cardFormat = document.createElement('div');
      cardFormat.classList.add('col-md');
      let card = document.createElement('div');
      card.classList.add('card');
      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      let cardDate = document.createElement('h4');
      let cardTemp = document.createElement('li');
      let cardHumidity = document.createElement('li');
      let cardWindSpeed = document.createElement('li');
      let cardDescr = document.createElement('li');

      cardDate.textContent = forecastDate;
      cardTemp.textContent = forecastTemp;
      cardHumidity.textContent = forecastHumidity;
      cardWindSpeed.textContent = forecastWind;
      cardDescr.textContent = forecastDescr;

      const forecastContainer = document.querySelector('#forecastcontainer');
      cardFormat.append(card);
      card.append(cardBody);
      cardBody.append(cardDate, cardTemp, cardHumidity, cardWindSpeed, cardDescr)
      forecastContainer.append(cardFormat);

      }
    })
    .catch(function (err) {
      console.error(err);
    });

};


userFormEl.addEventListener('submit', formSubmitHandler);


function displayDayOfWeekAndTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}:${minutes}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${time}`;
}

function showWeatherConditions(response) {
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let humidity = Math.round(response.data.main.humidity);
  let temperatureElement = document.querySelector("#currentTemperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let displayedCity = document.querySelector("#displayedCity");
  temperatureElement.innerHTML = temperature;
  windElement.innerHTML = wind;
  displayedCity.innerHTML = city;
  humidityElement.innerHTML = humidity;
  console.log(response.data);
}

function findCurrentPosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function recieveCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentPosition);
}

function findCityBySearch(event) {
  event.preventDefault();
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let units = "metric";
  let searchedCity = document.querySelector("#searchedCity");
  let city = searchedCity.value;
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${url}?q=${city}&&units=${units}&&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

let currentDayAndTime = document.querySelector("#date-and-time");
let currentTime = new Date();
currentDayAndTime.innerHTML = displayDayOfWeekAndTime(currentTime);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", recieveCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCityBySearch);

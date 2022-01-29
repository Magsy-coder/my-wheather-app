function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = now.getDate();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let year = now.getFullYear();
  let month = months[now.getMonth()];

  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${date}/${month}/${year}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${day} ${hours}.${minutes}`;
}
formatDate();

function showTemperature(response) {
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWheather = document.querySelector("#current-temp");
  currentWheather.innerHTML = `Currently ${currentTemperature}°C`;
  let currentWind = Math.round(response.data.wind.speed);
  let localWind = document.querySelector("#local-wind");
  localWind.innerHTML = `Wind speed: ${currentWind}km/h`;
  let currentDescription = response.data.weather[0].description;
  let localDescription = document.querySelector("#local-description");
  localDescription.innerHTML = `${currentDescription}`;
}

function showWeather(yourLocation) {
  let apiKey = "01c069a1dd0ad5193fff058ba13e03c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${yourLocation}`;
  axios.get(`${apiUrl}&units=metric&appid=${apiKey}`).then(showTemperature);
}
function returnLocation(event) {
  event.preventDefault();
  let yourLocation = document.querySelector("#your-location").value;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${yourLocation}`;
  showWeather(yourLocation);
}
let choosingLocation = document.querySelector("#location-form");
choosingLocation.addEventListener("submit", returnLocation);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "01c069a1dd0ad5193fff058ba13e03c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function findGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findGeolocation);

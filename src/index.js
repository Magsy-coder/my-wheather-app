function formatDate(datestamp) {
  let now = new Date(datestamp);
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
  return `${day} ${hours}.${minutes}`;
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let currentLocation = document.querySelector("#current-location");

  celsiusTemperature = response.data.main.temp;
  let currentTemperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#current-temp");
  let currentWind = Math.round(response.data.wind.speed);
  let localWind = document.querySelector("#local-wind");
  let currentDescription = response.data.weather[0].description;
  let localDescription = document.querySelector("#local-description");
  let currentTime = document.querySelector("#current-time");
  let iconElement = document.querySelector("#weather-icon");
  currentLocation.innerHTML = response.data.name;
  localDescription.innerHTML = `${currentDescription}`;
  temperatureElement.innerHTML = `Currently ${currentTemperature}`;
  localWind.innerHTML = `Wind speed: ${currentWind}km/h`;
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("passive");
  let temperatureFahrenheitValue = Math.round(fahrenheitTemperature);
  temperatureElement.innerHTML = `Currently ${temperatureFahrenheitValue}`;
}
function showCelsiusTemp(event) {
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("passive");
  let temperatureCelsiusValue = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = `Currently ${temperatureCelsiusValue}`;
}

celsiusTemperature = null;

showForecast();

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findGeolocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

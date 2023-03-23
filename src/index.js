function weekWeather() {
  let currentTime = new Date();
  let day = currentTime.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let date = currentTime.getDate();
  let month = currentTime.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weatherData = `${date} ${months[month]} ${days[day]}  ${hour}:${minutes}`;
  let currentDate = document.querySelector("#data");
  currentDate.innerHTML = weatherData;
}
weekWeather();

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#putCity");
  searchForCity(cityName.value);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchCity);

function searchForCity(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherCity);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function weatherCity(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function searchForLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCity);
}
function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForLocation);
}
let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getMyLocation);

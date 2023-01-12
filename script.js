const city = document.getElementById('city-input');
const flag = document.getElementById('flag');

const myLocation = {
  city1: undefined
};

showWeatherData = (weatherData) => {
    document.getElementById("city-name").innerText = weatherData.name
    document.getElementById("weather-type").innerText = (weatherData.weather[0].main)
    document.getElementById("temp").innerText = (weatherData.main.temp)
    document.getElementById("feels-like").innerText = (weatherData.main.feels_like)
    document.getElementById("windD").innerText = (getDirection(weatherData.wind.deg))
    document.getElementById("windS").innerText = (weatherData.wind.speed)
    console.log(weatherData)
  }
  
const searchCity=async()=>{
     let response=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=71f6779186cc32448b4c412eea65b982&units=metric`)
     let data=await response.json()
     showWeatherData(data)
}

var directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]

function getDirection(angle) {
  var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
   return directions[index]
}

const getMyLocation = document.querySelector('#getLocation');

getMyLocation.onclick = () => {
  navigator.geolocation.getCurrentPosition((loc) => {
      const geoApiUrl = `https://eu1.locationiq.com/v1/reverse?key=pk.b514ee4a7594901b03dc91116e436a98&lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&format=json`;
      fetch( geoApiUrl ).then( res => res.json() ).then( data => {
          console.log(data.address.city);
          myLocation.city1 = data.address.city;
          city.value=data.address.city;
          searchCity();
          window.localStorage.setItem('myLocation', JSON.stringify(myLocation));
      });
  });
}


const createTempDetail = (detail)=>{
  const currentWeather = document.getElementById("current-weather")
  currentWeather.innerText = detail
}

const displayWeather = async () =>{
  // Below is the code to run the call to the Open Weather API.
  // const options = {params:{q: "Ottawa", "units": "metric"},headers: {'x-rapidapi-key': '<insert api key here>'}}
  
  // const response = await axios("https://community-open-weather-map.p.rapidapi.com/weather",options);
  // console.log(response.data.main.temp)
  // const currentTemp = response.data.main.temp
  // const humidity = response.data.main.humidity
  // Below hard coded for now.
  const currentTemp = "20"
  const humidity = "10"
  const currentTempString = `The current temp is ${currentTemp} with humidity of ${humidity}`
  createTempDetail(currentTempString);
}

window.onload = displayWeather();





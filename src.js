let dateValue= new Date();
let daysOfweek=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let date=dateValue.getDate();
let day=daysOfweek[dateValue.getDay()];
let month=months[dateValue.getMonth()];
let formatDate=`${day} ${date}.${month}`;
let htmldate=document.querySelector("#date");
htmldate.innerHTML=formatDate;

function processApiResponse(response){
  console.log(response);
  
  let responseHumidity=Math.round(response.data.temperature.humidity);
  let responseWind=Math.round(response.data.wind.speed);
  let responseTemperature=Math.round(response.data.temperature.current)
  celciusTemp=responseTemperature;
  let temperature=document.querySelector(".currentTemp");
  temperature.innerHTML=responseTemperature;
  let humidity=document.querySelector(".hValue");
  humidity.innerHTML=`${responseHumidity}%`;
  let wind=document.querySelector(".wValue");
  wind.innerHTML=`${responseWind}km/h`;
  let htmlPlace=document.querySelector(".place");
  htmlPlace.innerHTML=response.data.city;
  let htmlDescription=document.querySelector(".description");
  htmlDescription.innerHTML=response.data.condition.description;
  console.log(response.data.condition.icon_url);
  let htmlWeatherIcon=document.querySelector("#main-icon");
  htmlWeatherIcon.src=response.data.condition.icon_url;
  
};


UpdateDefaultCity("Berlin") ;

 function handleSubmit(event)
 {
  event.preventDefault();
  let placeInput =document.querySelector("#search-area");
  console.log(placeInput.value) ;
  if(placeInput.value){
  let apiKey="b9ffd1od861e4efaf039d5a0c6fbtecd";
  let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${placeInput.value}&key=${apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(processApiResponse)}else{
  alert("Please enter the City")
  }

 }

 function  UpdateDefaultCity(city){
  let apiKey="b9ffd1od861e4efaf039d5a0c6fbtecd";
  let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(processApiResponse);
 };

 let search=document.querySelector("#search-form");
 search.addEventListener("submit",handleSubmit);

 //****temperature conversion****//

 function handleCelciusClick()
 {
  let temperature=document.querySelector(".currentTemp");
  temperature.innerHTML=celciusTemp;
  celcius.classList.add("active");
  farenheit.classList.remove("active");

 };

 function handleFarenheitClick(event)
 {
  event.preventDefault();
  let temperature=document.querySelector(".currentTemp");
  temperature.innerHTML= Math.round(celciusTemp * 9/5 + 32);
  farenheit.classList.add("active");
  celcius.classList.remove("active");
};

  let unit=document.querySelector(".temp");
  let celcius=document.querySelector(".celcius");
  celcius.addEventListener("click",handleCelciusClick);
  let farenheit=document.querySelector(".farenheit");
  farenheit.addEventListener("click",handleFarenheitClick);

 function currentLocationTemperature(response)
 {
  console.log(response);
  let htmlPlace=document.querySelector(".place");
  htmlPlace.innerHTML=response.data.city;
  let responseHumidity=Math.round(response.data.temperature.humidity);
  let responseWind=Math.round(response.data.wind.speed);
  let responseTemperature=Math.round(response.data.temperature.current)
  celciusTemp=responseTemperature;
  let temperature=document.querySelector(".currentTemp");
  temperature.innerHTML=responseTemperature;
  let humidity=document.querySelector(".hValue");
  humidity.innerHTML=`${responseHumidity}%`;
  let wind=document.querySelector(".wValue");
  wind.innerHTML=`${responseWind}km/h`;
  let htmlDescription=document.querySelector(".description");
  htmlDescription.innerHTML=response.data.condition.description;
  console.log(response.data.condition.icon_url);
  let htmlWeatherIcon=document.querySelector("#main-icon");
  htmlWeatherIcon.src=response.data.condition.icon_url;
};

 function showTemperature(position)
 {
  let lat=position.coords.latitude;
  let lon=position.coords.longitude;
  let apiKey="b9ffd1od861e4efaf039d5a0c6fbtecd";
  let currentApiUrl=`https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  console.log(currentApiUrl)
  axios.get(currentApiUrl).then(currentLocationTemperature);
  
}

let celciusTemp=null;

function handleClick(event)
{ 
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showTemperature);
};

let currentTempButton=document.querySelector(".current-temp-btn");
currentTempButton.addEventListener("click",handleClick);





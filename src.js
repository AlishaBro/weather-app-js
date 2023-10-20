let dateValue= new Date();
let daysOfweek=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let date=dateValue.getDate();
// console.log(date);
let day=daysOfweek[dateValue.getDay()];
// console.log(day);
let month=months[dateValue.getMonth()];

let formatDate=`${day} ${date}.${month}`;
// console.log(formatDate);

let htmldate=document.querySelector("#date");
htmldate.innerHTML=formatDate;

function processApiResponse(response){
  console.log(response);
  
  let responseHumidity=Math.round(response.data.main.humidity);

  let responseWind=Math.round(response.data.wind.speed);

  let responseTemperature=Math.round(response.data.main.temp)
  console.log(responseTemperature);
  let temperature=document.querySelector(".currentTemp");
  console.log(temperature);
  temperature.innerHTML=responseTemperature;

  let humidity=document.querySelector(".hValue");
  humidity.innerHTML=`${responseHumidity}%`;
  let wind=document.querySelector(".wValue");
  wind.innerHTML=`${responseWind}km/h`;
};
 


 function handleSubmit(event)
 {
  event.preventDefault();
  let placeInput =document.querySelector("#search-area");
  console.log(placeInput.value) ;
  let htmlPlace=document.querySelector(".place");
  htmlPlace.innerHTML=placeInput.value;

  let apiKey="5863935ee9cca4c02ed68203f807c65b";
  let currentApiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=lat&lon=lon&appid=${apiKey}&&units=metric`;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${placeInput.value}&appid=${apiKey}&&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(processApiResponse);

 }

 let search=document.querySelector("#search-form");
 console.log(search);
 search.addEventListener("submit",handleSubmit);

 //****temperature conversion****//

 function handleCelciusClick()
 {
  let temperature=document.querySelector(".currentTemp");
  console.log(temperature);
  temperature.innerHTML=21;

 };

 function handleFarenheitClick()
 {
  let temperature=document.querySelector(".currentTemp");
  console.log(temperature);
  temperature.innerHTML=66;
};

  let unit=document.querySelector(".temp");
  let celcius=document.querySelector(".celcius");
  celcius.addEventListener("click",handleCelciusClick);
  let farenheit=document.querySelector(".farenheit");
  farenheit.addEventListener("click",handleFarenheitClick);

 function currentLocationTemperature(response)
 {
  console.log(response);
  console.log(response.data.name);
  let htmlPlace=document.querySelector(".place");
  htmlPlace.innerHTML=response.data.name;
  let responseHumidity=Math.round(response.data.main.humidity);
  let responseWind=Math.round(response.data.wind.speed);
  let responseTemperature=Math.round(response.data.main.temp)
  let temperature=document.querySelector(".currentTemp");
  temperature.innerHTML=responseTemperature;
  let humidity=document.querySelector(".hValue");
  humidity.innerHTML=`${responseHumidity}%`;
  let wind=document.querySelector(".wValue");
  wind.innerHTML=`${responseWind}km/h`;
};

 function showTemperature(position)
 {
  let lat=position.coords.latitude;
  let lon=position.coords.longitude;
  let apiKey="5863935ee9cca4c02ed68203f807c65b";
  let currentApiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
  console.log(currentApiUrl)
  axios.get(currentApiUrl).then(currentLocationTemperature);
  
}

 navigator.geolocation.getCurrentPosition(showTemperature);

 function handleClick()
 { 
  console.log("hey")
  navigator.geolocation.getCurrentPosition(showTemperature);
};

 let currentTempButton=document.querySelector(".current-temp-btn")
 currentTempButton.addEventListener("click",handleClick)




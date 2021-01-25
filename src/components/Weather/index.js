import React from 'react';
import $ from "jquery"

var apikey = "2d3fc2e3e0711ca594c4d9d5c7d37e7f"
var searchList = JSON.parse(localStorage.getItem("userCitiesSearched")) || [];

// this function will use 3 ajax calls,
// to get information for the current weather, uv index, and the forecast.
function userCity(citySearch) {
    $(".5days-container").empty()
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + apikey;
    
    if (citySearch !== "" || citySearch !== undefined) {
        citySearch.trim();
        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (burrito) {

            var cityTheUserSelected = burrito.name;
            var theTemp = burrito.main.temp;
            var theHumidity = burrito.main.humidity
            var theWindSpeed = burrito.wind.speed
            var latt = burrito.coord.lat
            var long = burrito.coord.lon
            var weatherIcon = burrito.weather[0].icon

            var uvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latt + "&lon=" + long + "&appid=" + apikey;
            $.ajax({
                method: "GET",
                url: uvIndex,
            }).then(function (uv) {

                var cityUv = uv.value;
                var d = new Date();
                var dd = d.getDate();
                var mm = d.getMonth() + 1;
                var yyyy = d.getFullYear();
                var newHtml = $(`
                <h3 className="cardBody currentWeather" id="cityName">${cityTheUserSelected} (${mm}/${dd}/${yyyy})</h3>
                <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
                <p className="cardBody currentWeather">Temperature: ${theTemp.toFixed(1)} \u00B0 F</p>
                <p className="cardBody currentWeather">Humidity: ${theHumidity}%</p>
                <p className="cardBody currentWeather">Wind Speed: ${theWindSpeed} MPH</p>
                <p className="cardBody currentWeather">UV Index: ${cityUv}</p>
                `);
                

                // inserts the current weather into the html 
                $("#currentWeather").html(newHtml);
            });

            var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + apikey;

            $.ajax({
                method: "GET",
                url: queryURLForecast,
            }).then(function (forecast) {
                var listOfDays = forecast.list

                // this will iterate over all the days at noon to display for the 5 day forecast
                for (let i = 5; i < listOfDays.length; i += 8) {
                    var dayAtNoon = listOfDays[i].dt_txt.split(' ')
                    dayAtNoon = dayAtNoon[0].split("-");
                    dayAtNoon = "(" + dayAtNoon[1] + "/" + dayAtNoon[2] + "/" + dayAtNoon[0] + ")";
                    var newTheTemp = listOfDays[i].main.temp.toFixed(1);
                    var newTheHumidity = listOfDays[i].main.humidity;
                    var newWeatherIcon = listOfDays[i].weather[0].icon

                    var new5day = $(`<div class="dayBlock"> 
                    <h3 className="cardBody" id="cityName">${dayAtNoon}</h3>
                    <img src="https://openweathermap.org/img/wn/${newWeatherIcon}@2x.png">
                    <p class="cardBody">Temp: ${newTheTemp} \u00B0F</p>
                    <p class="cardBody">Humidity: ${newTheHumidity} %</p> </div>`)

                    $("#5days").append(new5day)
                }
            });
        })
    }
}

$('#searchBtn').on('click', function () {

    if ($("#city").val() === "") {
        alert("Please enter a valid city to search")
    } else {
        var city = $('#city').val();
        userCity(city);
        searchList.push(city);
        localStorage.setItem("userCitiesSearched", JSON.stringify(searchList));
        var ul = $("#myUL");
        var li = $(`<li class="searchTerm"> ${city} </li>`);
        ul.append(li);
        
        if($(".searchTerm").length > 10){
            alert("If you're travelling this much please give me some of your money")
        }
       
    }
});

$(document).on("click", ".searchTerm", function (event) {
    var city = event.target.textContent;
    userCity(city);
    
})

function pastSearchList() {
    for (let i = 0; i < searchList.length; i++) {
        const city = searchList[i];
        var ul = $("#myUL");
        var li = $(`<li className="searchTerm"> ${city} </li>`);
        ul.append(li);
       
    }
          
}

pastSearchList();


class Weather extends React.Component {
    render(){
        return(
            <>
             <div id="5dayContainer">
    <div id="forecasts" className="row-12">
      <h4 className="card-header has-text-centered">5 Day Forecast</h4>
    </div>
      <div className="5days-container center" id="5days">
       
        
        

     
    </div>
  </div>
            </>

        )
    }
    
}

export default Weather;
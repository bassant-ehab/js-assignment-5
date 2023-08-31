//today

let todayName = document.getElementById("week_day")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_icon")
let todayConditionText = document.getElementById("condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")


// tomorrow data 
let nextDay = document.getElementsByClassName("tomorrow")
let nextMaxTemp = document.getElementsByClassName("tom_max_temp")
let nextMinTemp = document.getElementsByClassName("tom_min_temp")
let nextConditionImg = document.getElementsByClassName("tomorrow_icon")
let nextConditionText = document.getElementsByClassName("tom_text")

//after tomorrow data
let afterNextDay = document.getElementsByClassName("aftertomorrow")
let afterNextMaxTemp = document.getElementsByClassName("aftertom_max_temp")
let afterNextMinTemp = document.getElementsByClassName("aftertom_min_temp")
let afterNextConditionImg = document.getElementsByClassName("aftertomorrow_icon")
let afterNextConditionText = document.getElementsByClassName("aftertom_text")

let searchInput = document.getElementById("search")



// Event listener for search input field
searchInput.addEventListener("input", function() {
    const cityName = searchInput.value;
    getWeatherInfo(cityName);
  });


/******  Fetching Data ******/
async function getWeatherInfo(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3006364a437149c4b67131132232308&days=3&q=${cityName}`)
    let weatherData = await weatherResponse.json()
    bindDataInsideHtml(weatherData)
}

/******  DOMContentLoaded ******/
document.addEventListener("DOMContentLoaded", () => {
    getWeatherInfo("Cairo")
});

// Data Binding

function bindDataInsideHtml(response) {
    // Dates (For three cards)
    const date1Text = response.forecast.forecastday[0].date
    const date2Text = response.forecast.forecastday[1].date
    const date3Text = response.forecast.forecastday[2].date

    const weekDay1 = parseDateToDayOfWeek(date1Text)
    const dayMonth1 = parseDateToDayAndMonth(date1Text)
    const weekDay2 = parseDateToDayOfWeek(date2Text)
    const weekDay3 = parseDateToDayOfWeek(date3Text)
    todayName.innerHTML = weekDay1
    todayMonth.innerHTML = dayMonth1
    nextDay.innerHTML = weekDay2
    afterNextDay.innerHTML = weekDay3

    // City name
    const cityName = response.location.name
    todayLocation.innerHTML = cityName

    // Current Weather
    const currentTemp = Math.floor(response.current.temp_c) + "°C"
    todayTemp.innerHTML = currentTemp

    // Min & Max (For tomorrow & after)
    const tomMin = response.forecast.forecastday[1].day.mintemp_c + "°C"
    const tomMax = response.forecast.forecastday[1].day.maxtemp_c + "°"
    const afterTomMin = response.forecast.forecastday[2].day.mintemp_c + "°C"
    const afterTomMax = response.forecast.forecastday[2].day.maxtemp_c + "°"
    nextMinTemp.innerHTML = tomMin
    nextMaxTemp.innerHTML = tomMax
    afterNextMinTemp.innerHTML = afterTomMin
    afterNextMaxTemp.innerHTML = afterTomMax

    // Condition (For three cards)
    const day1CondText = response.forecast.forecastday[0].day.condition.text
    const day1CondIcon = response.forecast.forecastday[0].day.condition.icon
    todayConditionText.innerHTML = day1CondText
    todayConditionImg.src = day1CondIcon


    const day2CondText = response.forecast.forecastday[1].day.condition.text
    const day2CondIcon = response.forecast.forecastday[1].day.condition.icon
    nextConditionText.innerHTML = day2CondText
    nextConditionImg.src = day2CondIcon

    const day3CondText = response.forecast.forecastday[2].day.condition.text
    const day3CondIcon = response.forecast.forecastday[2].day.condition.icon
    afterNextConditionText.innerHTML = day3CondText
    afterNextConditionImg.src = day3CondIcon
}

function parseDateToDayOfWeek(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
    return dayOfWeek;
}

function parseDateToDayAndMonth(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
    return dayOfWeek;
}
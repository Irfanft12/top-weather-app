document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    const weatherDisplay = document.querySelector(".weather-display");
    const tempText = weatherDisplay.querySelector(".temp-text");
    const icon = weatherDisplay.querySelector(".icon");
    const location = weatherDisplay.querySelector(".location");
    const condition = weatherDisplay.querySelector(".condition");
    const searchError = document.querySelector(".search-error");
    const feelsLike = weatherDisplay.querySelector(".feels-like");
    const description = weatherDisplay.querySelector(".description");
    
    

    async function getWeather(location) {
        searchError.innerHTML = ``;
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=WHB4ULD6X9GXRXXTWZ3SR3C9M&contentType=json`);
            if (!response.ok) {
                searchError.innerHTML = `We can't find a match for ${location}`;
                console.log("bad response ", response.status);
                throw new Error("Something went wrong!");
                
            }
            const result = await response.json();
            processData(result);
        } catch (err) {
            console.error(err)
        }  

    }

    function capitalizeFistLetter(word) {
        if (!word) return;
        const capitalized = word.split(" ").map(piece => piece[0].toUpperCase() + piece.slice(1)).join(" ");
        return capitalized;
    }

    const iconClass = {
        "clear-day": "fa-sun",
        "clear-night": "fa-moon",
        "partly-cloudy-day": "fa-cloud-sun",
        "partly-cloudy-night": "fa-cloud-moon",
        "rainy": "fa-cloud-rain",
        "rain": "fa-cloud-showers-heavy",
        "snow": "fa-snowflake",
        "cloudy": "fa-cloud",
        "fog": "fa-smog",
        "wind": "fa-wind",
        "sleet": "fa-cloud-rain"
    }

    function getWeatherIcon(icon) {
        return iconClass[icon];
    }

    function processData(data) {
        console.log(data)
        const text = data.currentConditions.temp
        location.innerHTML = capitalizeFistLetter(data.address);
        tempText.innerHTML = text + "°C";
        const weatherIcon = getWeatherIcon(data.currentConditions.icon);
        icon.className = `icon fa-solid ${weatherIcon}`;
        condition.innerHTML = data.currentConditions.conditions;
        feelsLike.innerHTML =  `Feels like ${data.currentConditions.feelslike}°C`;
        description.innerHTML = data.description;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const value = input.value.trim();
        if (value) {
            getWeather(value);
            input.value = "";
        }
    
    });

    getWeather("mumbai");


})



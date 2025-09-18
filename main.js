document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    const weatherDisplay = document.querySelector(".weather-display");
    const tempText = weatherDisplay.querySelector(".temp-text");
    const location = weatherDisplay.querySelector(".location");
    const condition = weatherDisplay.querySelector(".condition");
    const searchError = document.querySelector(".search-error");
    const feelsLike = weatherDisplay.querySelector(".feels-like");
    const description = weatherDisplay.querySelector(".description");
    const iconImage = weatherDisplay.querySelector(".icon-image");
    
    
    

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

    function processData(data) {
        console.log(data.days[0].icon)
        const text = data.currentConditions.temp
        location.innerHTML = capitalizeFistLetter(data.address);
        tempText.innerHTML = text + "°C";
        condition.innerHTML = data.currentConditions.conditions;
        feelsLike.innerHTML =  `Feels like ${data.currentConditions.feelslike}°C`;
        description.innerHTML = data.description;
        iconImage.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${data.days[0].icon}.png`;
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



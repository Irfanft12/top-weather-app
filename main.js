document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    const weatherDisplay = document.querySelector(".weather-display");
    
    const searchError = document.querySelector(".search-error");
    
    
    

    async function getWeather(location) {
        searchError.innerHTML = ``;
        weatherDisplay.innerHTML = "Loading...";
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
        const html = `
            <div class="row">
                <div class="column">
                    <h2 class="location">${capitalizeFistLetter(data.address)}</h2>
                    <h4 class="temp">
                        <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${data.days[0].icon}.png" alt="${data.days[0].icon}" class="icon-image">
                        <span class="temp-text">${data.currentConditions.temp}°C </span>
                        <p class="feels-like">Feels like ${data.currentConditions.feelslike}°C</p>
                    </h4>
                    <p class="condition">${data.currentConditions.conditions}</p>
                </div>
                <div class="column">
                    <p class="description">${data.description}</p>
                </div>
            </div>
        `;

        weatherDisplay.innerHTML = html;
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



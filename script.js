const apiKey = "fc151c36de4c8be5f5c6642b1f01933e";
// stores the API key needed to authenticate requests to the API

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
// sets the base URL for the weather map API endpoint

const locationInput = document.getElementById("locationInput");
// selects the HTML input element where the user can input the location

const searchButton = document.getElementById("searchButton");
// selects the HTML button element where the user can click to search

const locationElement = document.getElementById("city");
// selects the HTML element where the location will be displayed

const temperatureElement = document.getElementById("temperature");
// selects the HTML element where the temperature will be displayed

const windElement = document.getElementById("wind");
// selects the HTML element where the wind speed will be displayed

const iconElement = document.getElementById("icon");
// selects the HTML element where the weather icon will be displayed

const humidityElement = document.getElementById("humidity");
// selects the HTML element where the humidity will be displayed

const cityWeatherElement = document.getElementById("cityWeather");
// selects the HTML element to display weather details

const noCityFoundElement = document.getElementById("noCityFound");
// selects the HTML element to display when no city is found

// Add event listeners to the search button and input field
searchButton.addEventListener("click", updateWeatherData);
locationInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        updateWeatherData();
    }
});

async function updateWeatherData() {
    try {
        // Check if the input is empty
        if (!locationInput.value.trim()) {
            alert("Please enter a city name");
            return;
        }
        // Fetch the weather data
        const weatherData = await getWeatherData(locationInput.value);
        
        // Update the UI with the weather data
        noCityFoundElement.classList.add("hidden");
        cityWeatherElement.classList.remove("hidden");

        locationElement.textContent = weatherData.cityWeatherElement;
        temperatureElement.textContent = weatherData.temperatureElement + "°C";
        humidityElement.textContent = weatherData.humidityElement + "%";
        windElement.textContent = weatherData.windElement + " Km/h";
        iconElement.src = weatherData.iconElement; 
    } catch (error) {
        // Handle the error
        if (error.code === "404") {
            cityWeatherElement.classList.add("hidden");
            noCityFoundElement.classList.remove("hidden");
            console.error(error.message);
        } else {
            alert("Unknown error: " + error);
        }
    }
}

function getIconUrl(iconElement) {
    return `./assets/icons/${iconElement.toLowerCase()}.png`;
}

async function getWeatherData(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Check if the city was not found
    if (data.cod === "404") {
        throw { code: "404", message: "City not found" };
    }

    // Return the relevant weather data
    return {
        cityWeatherElement: data.name,
        temperatureElement: data.main.temp,
        humidityElement: data.main.humidity,
        windElement: data.wind.speed,
        iconElement: getIconUrl(data.weather[0].icon)
    };
}

const apiKey = "";
// stores the api key needed to  autheenticate requests to the API

const apiUrl = "";
// sets the base url for the weather map api account endpoint

const locationInput = document.getElementById("locationInput");
//selects HTML input element where the user can select the location

const searchButton = document.getElementById("searchButton");
//selects HTML input element where the user can select the search

const locationElement = document.getElementById("location");
//selects HTML input element where the location will be displayed

const temperatureElement = document.getElementById("temperature");
//selects HTML input element where the  temperature will be displayed

const descriptionElement = document.getElementById("description");


searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    // retrieves the user's input location
    if (location) {
        fetchweather(location);
    }
});

function fetchweather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
       .then((response) => {
        if (!response.ok) {
            throw new Error("Weather dataa not available for the entered location");
        }
        return response.json();
})
//

.then((data) => {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
})
// Updates the HTML elements with the location name, temperature,
// and weather description from thee Api response

.catch((error) => {
    console.error("error fetching weather data:", error);
    locatioonElement.textContent = "Error fetching data";
    temperatureElement.textContent = "";
    descriptionElement.textContent = "";
});
//Handles any error that occurs during the API request by logging the error
// and updating the HTML element to indicate the error
}
// API Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Get from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Handle Search
async function handleSearch() {
    const city = searchInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your API key to script.js');
        return;
    }

    showLoading();
    try {
        const coordinates = await getCoordinates(city);
        if (coordinates) {
            await fetchWeatherData(coordinates.lat, coordinates.lon, city);
        }
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        console.error(error);
    } finally {
        hideLoading();
    }
}

// Get Coordinates from City Name
async function getCoordinates(city) {
    try {
        const response = await fetch(
            `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.length === 0) {
            showError('City not found');
            return null;
        }

        return {
            lat: data[0].lat,
            lon: data[0].lon,
            name: data[0].name,
            country: data[0].country
        };
    } catch (error) {
        throw error;
    }
}

// Fetch Weather Data
async function fetchWeatherData(lat, lon, city) {
    try {
        const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        hideError();
        weatherContainer.classList.remove('hidden');
    } catch (error) {
        throw error;
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const current = data.main;
    const weather = data.weather[0];
    const wind = data.wind;
    const clouds = data.clouds;
    const visibility = data.visibility;

    // Update DOM
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('temperature').textContent = Math.round(current.temp) + '°C';
    document.getElementById('weatherDescription').textContent = weather.main;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
    document.getElementById('feelsLike').textContent = Math.round(current.feels_like) + '°C';
    document.getElementById('humidity').textContent = current.humidity + '%';
    document.getElementById('windSpeed').textContent = wind.speed + ' m/s';
    document.getElementById('pressure').textContent = current.pressure + ' hPa';
    document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1) + ' km';
    document.getElementById('uvIndex').textContent = 'N/A';
}

// Display Forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Get forecast for next 5 days (one forecast per day at noon)
    const forecasts = {};

    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dateKey = date.toLocaleDateString();

        // Only add if we don't have this day yet and the time is around noon
        if (!forecasts[dateKey] && date.getHours() >= 10 && date.getHours() <= 14) {
            forecasts[dateKey] = forecast;
        }
    });

    // Display up to 5 days
    Object.values(forecasts).slice(0, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const weather = forecast.weather[0];
        const temp = forecast.main;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Weather icon" class="icon">
            <div class="temp">${Math.round(temp.max)}°C / ${Math.round(temp.min)}°C</div>
            <div class="description">${weather.main}</div>
        `;
        forecastContainer.appendChild(card);
    });
}

// UI Helpers
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    weatherContainer.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Initialize - Get user's location on load (optional)
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.log('Geolocation permission denied. Please search for a city.');
            }
        );
    }
});

// Fetch weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    if (API_KEY === 'YOUR_API_KEY_HERE') return;

    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        searchInput.value = data.name;
        await handleSearch();
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

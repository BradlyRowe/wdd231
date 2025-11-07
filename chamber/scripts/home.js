// Roy City Chamber Home Page JavaScript

// API key for OpenWeatherMap - Replace with your actual API key
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Get from https://openweathermap.org/api
const ROY_CITY_COORDS = {
    lat: 41.1616,
    lon: -112.0263
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hamburger menu (reuse from directory.js)
    initializeHamburgerMenu();
    
    // Load weather data
    loadWeatherData();
    
    // Load member spotlights
    loadMemberSpotlights();
});

// Hamburger menu functionality
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navigation = document.getElementById('navigation');
    
    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navigation.classList.toggle('open');
        });
    }
}

// Weather functionality with real API integration
async function loadWeatherData() {
    // Check if API key is set
    if (WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Weather API key not set. Using placeholder data.');
        displayPlaceholderWeather();
        return;
    }

    try {
        // Get current weather
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${ROY_CITY_COORDS.lat}&lon=${ROY_CITY_COORDS.lon}&appid=${WEATHER_API_KEY}&units=imperial`;
        const currentResponse = await fetch(currentWeatherUrl);
        
        if (!currentResponse.ok) {
            throw new Error(`Current weather API error: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        
        // Get 5-day forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${ROY_CITY_COORDS.lat}&lon=${ROY_CITY_COORDS.lon}&appid=${WEATHER_API_KEY}&units=imperial`;
        const forecastResponse = await fetch(forecastUrl);
        
        if (!forecastResponse.ok) {
            throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        
        // Process and display weather data
        updateWeatherDisplay(currentData, forecastData);
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        displayWeatherError();
    }
}

function updateWeatherDisplay(currentData, forecastData) {
    // Update current weather
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconContainer = document.getElementById('weather-icon-container');
    
    if (tempElement) tempElement.textContent = `${Math.round(currentData.main.temp)}°F`;
    if (descElement) descElement.textContent = currentData.weather[0].description;
    if (iconContainer) {
        const iconImg = document.createElement('img');
        iconImg.src = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
        iconImg.alt = currentData.weather[0].description;
        iconImg.className = 'weather-icon';
        iconContainer.innerHTML = '';
        iconContainer.appendChild(iconImg);
    }
    
    // Update 3-day forecast (skip today, get next 3 days at noon)
    const dailyForecasts = getForecastDays(forecastData.list);
    
    dailyForecasts.forEach((forecast, index) => {
        const forecastElement = document.getElementById(`forecast-${index + 1}`);
        if (forecastElement && forecast) {
            forecastElement.textContent = `${Math.round(forecast.main.temp)}°F`;
        }
    });
}

function getForecastDays(forecastList) {
    // Get forecasts for the next 3 days at approximately noon (12:00)
    const dailyForecasts = [];
    const today = new Date().getDate();
    
    for (let i = 0; i < forecastList.length && dailyForecasts.length < 3; i++) {
        const forecast = forecastList[i];
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastHour = forecastDate.getHours();
        const forecastDay = forecastDate.getDate();
        
        // Get forecast around noon for days after today
        if (forecastDay !== today && forecastHour >= 11 && forecastHour <= 13) {
            dailyForecasts.push(forecast);
        }
    }
    
    return dailyForecasts;
}

function displayPlaceholderWeather() {
    // Placeholder weather data for demonstration when API key is not set
    const placeholderData = {
        current: {
            temp: 42,
            description: "partly cloudy",
            icon: "02d"
        },
        forecast: [
            { temp: 38 },
            { temp: 45 },
            { temp: 41 }
        ]
    };
    
    updatePlaceholderWeather(placeholderData);
}

function updatePlaceholderWeather(data) {
    // Update current weather with placeholder
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconContainer = document.getElementById('weather-icon-container');
    
    if (tempElement) tempElement.textContent = `${data.current.temp}°F`;
    if (descElement) descElement.textContent = `${data.current.description} (demo)`;
    if (iconContainer) {
        const iconImg = document.createElement('img');
        iconImg.src = `https://openweathermap.org/img/w/${data.current.icon}.png`;
        iconImg.alt = data.current.description;
        iconImg.className = 'weather-icon';
        iconContainer.innerHTML = '';
        iconContainer.appendChild(iconImg);
    }
    
    // Update forecast with placeholder
    data.forecast.forEach((day, index) => {
        const forecastElement = document.getElementById(`forecast-${index + 1}`);
        if (forecastElement) {
            forecastElement.textContent = `${day.temp}°F`;
        }
    });
}

function displayWeatherError() {
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconContainer = document.getElementById('weather-icon-container');
    
    if (tempElement) tempElement.textContent = 'N/A';
    if (descElement) descElement.textContent = 'Weather data unavailable';
    if (iconContainer) {
        iconContainer.innerHTML = '<span>N/A</span>';
    }
    
    // Clear forecast
    for (let i = 1; i <= 3; i++) {
        const forecastElement = document.getElementById(`forecast-${i}`);
        if (forecastElement) forecastElement.textContent = '--°F';
    }
}

// Member spotlight functionality
async function loadMemberSpotlights() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const members = await response.json();
        
        // Filter for gold and silver members
        const premiumMembers = members.filter(member => 
            member.membershipLevel && 
            (member.membershipLevel.toLowerCase() === 'gold' || member.membershipLevel.toLowerCase() === 'silver')
        );
        
        if (premiumMembers.length === 0) {
            throw new Error('No premium members found');
        }
        
        // Randomly select 2-3 members
        const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selectedMembers = getRandomMembers(premiumMembers, spotlightCount);
        
        displaySpotlights(selectedMembers);
        
    } catch (error) {
        console.error('Error loading member data:', error);
        displaySpotlightError();
    }
}

function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlights-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    members.forEach(member => {
        const spotlightCard = createSpotlightCard(member);
        container.appendChild(spotlightCard);
    });
}

function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';
    
    card.innerHTML = `
        <div class="spotlight-logo">
            <span style="font-size: 2rem; color: #1e3a8a;">${member.name.charAt(0)}</span>
        </div>
        <h4>${member.name}</h4>
        <span class="spotlight-level">${member.membershipLevel} Member</span>
        <div class="spotlight-info">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" class="spotlight-website" target="_blank" rel="noopener">Visit Website</a>
        </div>
    `;
    
    return card;
}

function displaySpotlightError() {
    const container = document.getElementById('spotlights-container');
    if (container) {
        container.innerHTML = '<div class="loading">Unable to load member spotlights</div>';
    }
}

// Utility function for API calls with error handling
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
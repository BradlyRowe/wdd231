// Roy City Chamber Home Page JavaScript

// API key for OpenWeatherMap - Replace with your actual API key
const WEATHER_API_KEY = 'YOUR_WORKING_API_KEY_HERE'; // Get from https://openweathermap.org/api
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
    console.log('Loading weather data...');
    console.log('API Key:', WEATHER_API_KEY ? 'Set (length: ' + WEATHER_API_KEY.length + ')' : 'Not set');
    
    // Check if API key is set
    if (WEATHER_API_KEY === 'PASTE_YOUR_API_KEY_HERE' || WEATHER_API_KEY === 'YOUR_API_KEY_HERE' || WEATHER_API_KEY === 'YOUR_WORKING_API_KEY_HERE') {
        console.warn('Weather API key not set. Using placeholder data.');
        displayPlaceholderWeather();
        return;
    }

    try {
        // Get current weather
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${ROY_CITY_COORDS.lat}&lon=${ROY_CITY_COORDS.lon}&appid=${WEATHER_API_KEY}&units=imperial`;
        console.log('Fetching current weather from:', currentWeatherUrl.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'));
        const currentResponse = await fetch(currentWeatherUrl);
        
        console.log('Current weather response status:', currentResponse.status);
        if (!currentResponse.ok) {
            throw new Error(`Current weather API error: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        console.log('Current weather data received:', currentData.name, currentData.main.temp + '°F');
        
        // Get 5-day forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${ROY_CITY_COORDS.lat}&lon=${ROY_CITY_COORDS.lon}&appid=${WEATHER_API_KEY}&units=imperial`;
        console.log('Fetching forecast from:', forecastUrl.replace(WEATHER_API_KEY, 'API_KEY_HIDDEN'));
        const forecastResponse = await fetch(forecastUrl);
        
        console.log('Forecast response status:', forecastResponse.status);
        if (!forecastResponse.ok) {
            throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        console.log('Forecast data received:', forecastData.list.length, 'forecast items');
        
        // Process and display weather data
        updateWeatherDisplay(currentData, forecastData);
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        console.error('Error details:', error.message);
        if (error.message.includes('401')) {
            console.error('API key is invalid or not activated yet. It can take up to 2 hours for new keys to become active.');
        } else if (error.message.includes('429')) {
            console.error('Too many API requests. Please wait a moment and try again.');
        } else if (error.message.includes('404')) {
            console.error('Weather API endpoint not found. Check the coordinates or API URL.');
        }
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
        
        const data = await response.json();
        console.log('Member data loaded:', data);
        console.log('Data type:', typeof data);
        console.log('Is array:', Array.isArray(data));
        
        // Handle different JSON structures
        let members;
        if (Array.isArray(data)) {
            members = data;
        } else if (data.members && Array.isArray(data.members)) {
            members = data.members;
        } else {
            throw new Error('Invalid member data format - expected array or object with members property');
        }
        
        console.log('Members array:', members.length, 'members found');
        
        // Filter for gold and silver members (levels 2 and 3)
        // Level 1 = Bronze, Level 2 = Silver, Level 3 = Gold
        const premiumMembers = members.filter(member => 
            member.membershipLevel && 
            (member.membershipLevel === 2 || member.membershipLevel === 3)
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
    
    // Convert membership level number to text
    const membershipText = member.membershipLevel === 3 ? 'Gold' : 
                          member.membershipLevel === 2 ? 'Silver' : 'Bronze';
    
    card.innerHTML = `
        <div class="spotlight-logo">
            <span style="font-size: 2rem; color: #1e3a8a;">${member.name.charAt(0)}</span>
        </div>
        <h4>${member.name}</h4>
        <span class="spotlight-level">${membershipText} Member</span>
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
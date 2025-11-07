// Roy City Chamber Home Page JavaScript

// API key for OpenWeatherMap (you'll need to get your own API key)
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
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

// Weather functionality
async function loadWeatherData() {
    try {
        // Note: For demonstration, using placeholder data
        // In production, you would use: 
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ROY_CITY_COORDS.lat}&lon=${ROY_CITY_COORDS.lon}&appid=${WEATHER_API_KEY}&units=imperial`);
        
        // Placeholder weather data for demonstration
        const weatherData = {
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
        
        updateWeatherDisplay(weatherData);
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        displayWeatherError();
    }
}

function updateWeatherDisplay(data) {
    // Update current weather
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconElement = document.getElementById('weather-icon');
    
    if (tempElement) tempElement.textContent = `${data.current.temp}°F`;
    if (descElement) descElement.textContent = data.current.description;
    if (iconElement) {
        iconElement.src = `https://openweathermap.org/img/w/${data.current.icon}.png`;
        iconElement.alt = data.current.description;
    }
    
    // Update forecast
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
    
    if (tempElement) tempElement.textContent = 'N/A';
    if (descElement) descElement.textContent = 'Weather data unavailable';
}

// Member spotlight functionality
async function loadMemberSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // Filter for gold and silver members
        const premiumMembers = members.filter(member => 
            member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );
        
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
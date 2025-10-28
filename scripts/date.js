// Date functionality for footer

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.innerHTML = `Last updated: ${lastModified}`;
    }
    
    // Weather simulation (since we don't have a real API key)
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    
    if (temperatureElement && conditionsElement) {
        // Simulate weather data
        const simulatedTemperature = Math.floor(Math.random() * 40) + 20; // 20-60°F
        const conditions = [
            'Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear', 'Overcast'
        ];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        // Add a small delay to simulate API call
        setTimeout(() => {
            temperatureElement.textContent = `${simulatedTemperature}°F`;
            conditionsElement.textContent = randomCondition;
        }, 500);
    }
    
    // Format dates utility function
    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    
    // Add formatted current date to page (if needed elsewhere)
    window.getCurrentFormattedDate = function() {
        return formatDate(new Date());
    };
    
    // Add utility for getting week number (useful for course activities)
    window.getWeekNumber = function(date = new Date()) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };
});
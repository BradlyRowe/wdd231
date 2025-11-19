// Roy City Chamber Thank You Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hamburger menu
    initializeHamburgerMenu();
    
    // Display form data from URL parameters
    displayFormData();
    
    // Update footer dates
    updateFooterDates();
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

// Display form data from URL parameters
function displayFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get form values from URL parameters
    const firstName = urlParams.get('firstName') || '';
    const lastName = urlParams.get('lastName') || '';
    const email = urlParams.get('email') || '';
    const phone = urlParams.get('phone') || '';
    const businessName = urlParams.get('businessName') || '';
    const timestamp = urlParams.get('timestamp') || '';
    
    // Display name
    const nameElement = document.getElementById('display-name');
    if (nameElement) {
        nameElement.textContent = `${firstName} ${lastName}`;
    }
    
    // Display email
    const emailElement = document.getElementById('display-email');
    if (emailElement) {
        emailElement.textContent = email;
    }
    
    // Display phone
    const phoneElement = document.getElementById('display-phone');
    if (phoneElement) {
        phoneElement.textContent = phone;
    }
    
    // Display business name
    const businessElement = document.getElementById('display-business');
    if (businessElement) {
        businessElement.textContent = businessName;
    }
    
    // Display formatted timestamp
    const timestampElement = document.getElementById('display-timestamp');
    if (timestampElement && timestamp) {
        const date = new Date(timestamp);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        timestampElement.textContent = date.toLocaleDateString('en-US', options);
    }
}

// Update footer with current year and last modified date
function updateFooterDates() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', options);
    }
}

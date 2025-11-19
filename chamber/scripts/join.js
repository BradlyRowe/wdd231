// Roy City Chamber Join Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hamburger menu
    initializeHamburgerMenu();
    
    // Set timestamp when form loads
    setTimestamp();
    
    // Update footer dates
    updateFooterDates();
    
    // Initialize modal event listeners
    initializeModalListeners();
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

// Set timestamp in hidden field
function setTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Close on outside click
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        };
        
        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(event) {
            if (event.key === 'Escape') {
                closeModal(modalId);
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
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

// Initialize modal button event listeners
function initializeModalListeners() {
    // Learn More buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
}

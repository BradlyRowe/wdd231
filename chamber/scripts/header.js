// Load header HTML and set active navigation
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
});

async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error('Failed to load header');
        }
        
        const headerHTML = await response.text();
        
        // Insert header HTML at the beginning of the body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Set active navigation based on current page
        setActiveNavigation();
        
        // Initialize hamburger menu
        initializeHamburgerMenu();
        
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

function setActiveNavigation() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove any existing active classes
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // Set active class based on current page
    let activeId = '';
    switch(currentPage) {
        case 'index.html':
        case '':
            activeId = 'home-link';
            break;
        case 'directory.html':
            activeId = 'directory-link';
            break;
        case 'join.html':
            activeId = 'join-link';
            break;
        case 'discover.html':
            activeId = 'discover-link';
            break;
    }
    
    // Set active state for both desktop and mobile navigation
    if (activeId) {
        const desktopLink = document.getElementById(activeId);
        const mobileLink = document.getElementById('mobile-' + activeId.replace('-link', '-link'));
        
        if (desktopLink) {
            desktopLink.classList.add('active');
            desktopLink.setAttribute('aria-current', 'page');
        }
        if (mobileLink) {
            mobileLink.classList.add('active');
            mobileLink.setAttribute('aria-current', 'page');
        }
    }
}

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
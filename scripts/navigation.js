// Navigation functionality for responsive menu

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navigation = document.getElementById('navigation');
    
    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            hamburger.classList.toggle('active');
            
            // Toggle navigation visibility
            navigation.classList.toggle('show');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navigation.classList.contains('show');
            hamburger.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open on mobile
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside of it
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navigation.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navigation.classList.contains('show')) {
                hamburger.classList.remove('active');
                navigation.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navigation.classList.contains('show')) {
                hamburger.classList.remove('active');
                navigation.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                hamburger.focus(); // Return focus to hamburger button
            }
        });
        
        // Close menu when window is resized to larger screen
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && navigation.classList.contains('show')) {
                hamburger.classList.remove('active');
                navigation.classList.remove('show');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Set initial ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'navigation');
        navigation.setAttribute('aria-hidden', 'true');
        
        // Update aria-hidden based on navigation state
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isVisible = navigation.classList.contains('show');
                    navigation.setAttribute('aria-hidden', !isVisible);
                }
            });
        });
        
        observer.observe(navigation, { attributes: true });
    }
    
    // Wayfinding - highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || 
            (currentPage === '' && linkPath === 'index.html') ||
            (currentPage === 'index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
});
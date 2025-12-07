// Update copyright year and last modified date
export function updateFooter() {
    const yearElement = document.getElementById('currentYear');
    const modifiedElement = document.getElementById('lastModified');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    if (modifiedElement) {
        modifiedElement.textContent = document.lastModified;
    }
}

// Auto-run on load
updateFooter();

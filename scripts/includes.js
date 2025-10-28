// Include loader utility for header and footer components
// This script dynamically loads header and footer HTML from separate files

class IncludeLoader {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Load an HTML file and return its content
     * @param {string} url - The URL of the HTML file to load
     * @returns {Promise<string>} - Promise that resolves to the HTML content
     */
    async loadHTML(url) {
        // Check cache first
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
            }
            const html = await response.text();
            
            // Cache the result
            this.cache.set(url, html);
            return html;
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            throw error;
        }
    }

    /**
     * Load and insert header HTML
     * @param {string} targetSelector - CSS selector for the target element
     * @param {string} basePath - Base path for relative URLs (default: '')
     */
    async loadHeader(targetSelector = 'header-placeholder', basePath = '') {
        try {
            let headerHTML = await this.loadHTML(`${basePath}includes/header.html`);
            
            // Update relative paths in the header content
            headerHTML = this.updateRelativePaths(headerHTML, basePath);
            
            const targetElement = document.getElementById(targetSelector) || document.querySelector(`[data-include="header"]`);
            
            if (targetElement) {
                targetElement.outerHTML = headerHTML;
                
                // Update navigation active state
                this.updateNavigationActiveState();
                
                // Trigger custom event
                document.dispatchEvent(new CustomEvent('headerLoaded'));
            } else {
                console.warn(`Header target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error('Failed to load header:', error);
        }
    }

    /**
     * Load and insert footer HTML
     * @param {string} targetSelector - CSS selector for the target element
     * @param {string} basePath - Base path for relative URLs (default: '')
     */
    async loadFooter(targetSelector = 'footer-placeholder', basePath = '') {
        try {
            let footerHTML = await this.loadHTML(`${basePath}includes/footer.html`);
            
            // Update relative paths in the footer content
            footerHTML = this.updateRelativePaths(footerHTML, basePath);
            
            const targetElement = document.getElementById(targetSelector) || document.querySelector(`[data-include="footer"]`);
            
            if (targetElement) {
                targetElement.outerHTML = footerHTML;
                
                // Trigger custom event
                document.dispatchEvent(new CustomEvent('footerLoaded'));
            } else {
                console.warn(`Footer target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error('Failed to load footer:', error);
        }
    }

    /**
     * Load both header and footer
     * @param {string} basePath - Base path for relative URLs (default: '')
     */
    async loadAll(basePath = '') {
        await Promise.all([
            this.loadHeader('header-placeholder', basePath),
            this.loadFooter('footer-placeholder', basePath)
        ]);
    }

    /**
     * Update navigation active state based on current page
     */
    updateNavigationActiveState() {
        // Wait a bit for DOM to update
        setTimeout(() => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.navigation a');
            
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
                link.classList.remove('active');
                link.removeAttribute('aria-current');
                
                if (linkPath === currentPage || 
                    (currentPage === '' && linkPath === 'index.html') ||
                    (currentPage === 'index.html' && linkPath === 'index.html')) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        }, 50);
    }

    /**
     * Update relative paths for different directory levels
     * @param {string} content - HTML content
     * @param {string} basePath - Base path to prepend to relative URLs
     */
    updateRelativePaths(content, basePath) {
        if (!basePath) return content;
        
        // Update common relative paths
        return content
            .replace(/src="images\//g, `src="${basePath}images/`)
            .replace(/href="styles\//g, `href="${basePath}styles/`)
            .replace(/src="scripts\//g, `src="${basePath}scripts/`)
            .replace(/href="index\.html"/g, `href="${basePath}index.html"`);
    }
}

// Create global instance
const includeLoader = new IncludeLoader();

// Auto-load includes when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Determine base path based on current location
    const pathDepth = (window.location.pathname.split('/').length - 2);
    const basePath = pathDepth > 0 ? '../'.repeat(pathDepth) : '';
    
    // Load header and footer
    await includeLoader.loadAll(basePath);
});

// Export for manual use
window.includeLoader = includeLoader;
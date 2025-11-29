// Initialize hamburger menu toggle
const nav = document.getElementById('navigation');
const btn = document.getElementById('hamburger');
if (btn) btn.addEventListener('click', () => nav.classList.toggle('open'));

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('last-modified').textContent = document.lastModified;

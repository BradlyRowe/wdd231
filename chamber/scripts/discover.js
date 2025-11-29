import { points } from '../data/points.mjs';

// Last visit message using localStorage
const visitKey = 'chamber-last-visit';
const visitEl = document.getElementById('visitMessage');

(function renderVisitMessage() {
  const now = Date.now();
  const last = Number(localStorage.getItem(visitKey) || 0);
  let msg = 'Welcome! Let us know if you have any questions.';
  
  if (last) {
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      msg = 'Back so soon! Awesome!';
    } else {
      msg = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
    }
  }
  
  visitEl.textContent = msg;
  localStorage.setItem(visitKey, String(now));
})();

// Build POI cards
const grid = document.getElementById('poiGrid');

function createCard(p) {
  const card = document.createElement('article');
  card.className = `poi-card ${p.id}`;
  card.innerHTML = `
    <h2>${p.title}</h2>
    <figure>
      <img src="${p.image}" alt="${p.title}" width="300" height="200" loading="lazy">
    </figure>
    <address>${p.address}</address>
    <p>${p.description}</p>
    <button type="button" aria-label="Learn more about ${p.title}">Learn more</button>
  `;
  return card;
}

points.forEach(p => grid.appendChild(createCard(p)));

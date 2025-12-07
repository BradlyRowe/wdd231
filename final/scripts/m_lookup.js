// Async API functionality for D&D 5e Monster Lookup
async function fetchMonsterData(monsterName) {
    const resultsDiv = document.getElementById('api-results');
    const loadingDiv = document.getElementById('api-loading');
    
    if (!resultsDiv || !loadingDiv) return;
    
    // Show loading, hide results
    loadingDiv.classList.remove('hidden');
    resultsDiv.innerHTML = '';
    
    try {
        const url = `https://www.dnd5eapi.co/api/2014/monsters/${monsterName.toLowerCase().replace(/\s+/g, '-')}`;
        console.log('Fetching monster from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Monster not found (Status: ${response.status})`);
        }
        
        const data = await response.json();
        
        // Display the monster data
        resultsDiv.innerHTML = `
            <div class="monster-card">
                <h3>${data.name}</h3>
                <p><strong>Type:</strong> ${data.type}${data.subtype ? ` (${data.subtype})` : ''}</p>
                <p><strong>Size:</strong> ${data.size}</p>
                <p><strong>Alignment:</strong> ${data.alignment}</p>
                <p><strong>Armor Class:</strong> ${data.armor_class[0].value}</p>
                <p><strong>Hit Points:</strong> ${data.hit_points} (${data.hit_dice})</p>
                <p><strong>Speed:</strong> ${Object.entries(data.speed).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
                <p><strong>Challenge Rating:</strong> ${data.challenge_rating} (${data.xp ? data.xp.toLocaleString() + ' XP' : 'N/A'})</p>
                ${data.special_abilities ? `<p><strong>Special Abilities:</strong> ${data.special_abilities.length}</p>` : ''}
            </div>
        `;
        
    } catch (error) {
        // Handle errors gracefully
        resultsDiv.innerHTML = `
            <div class="error-card">
                <p class="error-text">Error: ${error.message}</p>
                <p>Please try another monster name or check your spelling.</p>
                <p class="suggestion-text">Try: "goblin", "orc", "skeleton", "troll", "owlbear", "kobold", "zombie"</p>
            </div>
        `;
        console.error('API fetch error:', error);
        
    } finally {
        // Hide loading indicator
        loadingDiv.classList.add('hidden');
    }
}

// Initialize API lookup functionality
function initAPILookup() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('monster-search');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const monsterName = searchInput.value.trim();
            if (monsterName) {
                fetchMonsterData(monsterName);
            }
        });
        
        // Allow Enter key to trigger search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// Initialize on page load
initAPILookup();

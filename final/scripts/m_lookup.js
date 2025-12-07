// Fetch list of all monsters from API
async function fetchMonsterList() {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/2014/monsters');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch monster list (Status: ${response.status})`);
        }
        
        const data = await response.json();
        return data.results; // Returns array of {index, name, url}
        
    } catch (error) {
        console.error('Error fetching monster list:', error);
        throw error;
    }
}

// Fetch detailed data for a single monster
async function fetchMonsterDetails(monsterIndex) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monsterIndex}`);
        
        if (!response.ok) {
            throw new Error(`Monster not found (Status: ${response.status})`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error(`Error fetching ${monsterIndex}:`, error);
        return null;
    }
}

// Load and display 15 random monsters
async function loadRandomMonsters() {
    const resultsDiv = document.getElementById('api-results');
    const loadingDiv = document.getElementById('api-loading');
    
    if (!resultsDiv || !loadingDiv) return;
    
    // Show loading, clear results
    loadingDiv.classList.remove('hidden');
    resultsDiv.innerHTML = '';
    
    try {
        // Fetch the list of all monsters
        const monsterList = await fetchMonsterList();
        
        // Use filter to remove any invalid entries, then use slice to get random selection
        const validMonsters = monsterList.filter(monster => monster.index && monster.name);
        
        // Shuffle array and take first 15 using array methods
        const shuffled = validMonsters.sort(() => 0.5 - Math.random());
        const selectedMonsters = shuffled.slice(0, 15);
        
        // Fetch detailed data for each selected monster using map
        const monsterPromises = selectedMonsters.map(monster => fetchMonsterDetails(monster.index));
        const monsterDetails = await Promise.all(monsterPromises);
        
        // Filter out any failed fetches
        const successfulMonsters = monsterDetails.filter(monster => monster !== null);
        
        if (successfulMonsters.length === 0) {
            throw new Error('No monsters could be loaded');
        }
        
        // Display monsters using forEach
        resultsDiv.innerHTML = '<div class="monster-grid"></div>';
        const gridContainer = resultsDiv.querySelector('.monster-grid');
        
        successfulMonsters.forEach(monster => {
            const monsterCard = createMonsterCard(monster);
            gridContainer.innerHTML += monsterCard;
        });
        
        // Log successful load
        console.log(`Successfully loaded ${successfulMonsters.length} monsters`);
        
    } catch (error) {
        // Handle errors gracefully
        resultsDiv.innerHTML = `
            <div class="error-card">
                <p class="error-text">Error: ${error.message}</p>
                <p>Unable to load monsters. Please try again.</p>
            </div>
        `;
        console.error('API fetch error:', error);
        
    } finally {
        // Hide loading indicator
        loadingDiv.classList.add('hidden');
    }
}

// Create HTML for a monster card using template literals
function createMonsterCard(monster) {
    return `
        <div class="monster-card">
            <h3>${monster.name}</h3>
            <p><strong>Type:</strong> ${monster.type}${monster.subtype ? ` (${monster.subtype})` : ''}</p>
            <p><strong>Size:</strong> ${monster.size}</p>
            <p><strong>Alignment:</strong> ${monster.alignment}</p>
            <p><strong>Armor Class:</strong> ${monster.armor_class[0]?.value || 'N/A'}</p>
            <p><strong>Hit Points:</strong> ${monster.hit_points} (${monster.hit_dice})</p>
            <p><strong>Speed:</strong> ${Object.entries(monster.speed).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
            <p><strong>Challenge Rating:</strong> ${monster.challenge_rating}</p>
        </div>
    `;
}

// Search for a specific monster
async function searchMonster(monsterName) {
    const resultsDiv = document.getElementById('api-results');
    const loadingDiv = document.getElementById('api-loading');
    
    if (!resultsDiv || !loadingDiv) return;
    
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
        resultsDiv.innerHTML = `<div class="monster-grid">${createMonsterCard(data)}</div>`;
        
    } catch (error) {
        resultsDiv.innerHTML = `
            <div class="error-card">
                <p class="error-text">Error: ${error.message}</p>
                <p>Please try another monster name or check your spelling.</p>
                <p class="suggestion-text">Try: "goblin", "orc", "skeleton", "troll", "owlbear", "kobold", "zombie"</p>
            </div>
        `;
        console.error('API fetch error:', error);
        
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Initialize page functionality
function initAPILookup() {
    const loadMonstersBtn = document.getElementById('load-monsters-btn');
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('monster-search');
    const searchSection = document.getElementById('search-section');
    
    // Load random monsters on button click
    if (loadMonstersBtn) {
        loadMonstersBtn.addEventListener('click', () => {
            loadRandomMonsters();
        });
    }
    
    // Toggle search section
    if (searchToggleBtn && searchSection) {
        searchToggleBtn.addEventListener('click', () => {
            searchSection.classList.toggle('hidden');
        });
    }
    
    // Search specific monster
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const monsterName = searchInput.value.trim();
            if (monsterName) {
                searchMonster(monsterName);
            }
        });
        
        // Allow Enter key to trigger search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Auto-load monsters on page load
    loadRandomMonsters();
}

// Initialize on page load
initAPILookup();

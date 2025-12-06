const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
let selectedTile = null;
let gridData = {};
let zoomLevel = 1;

// Load tiles into the tile library
function loadTiles() {
    const tileOptionsContainer = document.getElementById('tile-options');
    const clearButton = tileOptionsContainer.querySelector('button.clear');
    
    tiles.forEach(tile => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'tile-option';
        tileDiv.setAttribute('data-tile', tile.id);
        tileDiv.setAttribute('title', tile.title);
        tileDiv.innerHTML = tile.svg;
        
        if (tile.id === 'eraser') {
            tileDiv.onclick = () => selectEraser();
        } else {
            tileDiv.onclick = () => selectSampleTile(tile.id);
        }
        
        // Insert before the clear button
        tileOptionsContainer.insertBefore(tileDiv, clearButton);
    });
}

// Initialize grid
function initGrid() {
    const grid = document.getElementById('grid');
    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('role', 'button');
            cell.setAttribute('aria-label', `Grid cell ${col}, ${row}`);
            
            const coords = document.createElement('div');
            coords.className = 'coordinates';
            coords.textContent = `${col},${row}`;
            cell.appendChild(coords);
            
            cell.addEventListener('click', () => handleCellClick(row, col));
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCellClick(row, col);
                }
            });
            grid.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(row, col) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (selectedTile) {
        // Remove existing SVG if any
        const existingSvg = cell.querySelector('svg');
        if (existingSvg && existingSvg !== cell.querySelector('.coordinates')) {
            cell.removeChild(existingSvg);
        }
        
        // If eraser is selected, just clear the cell
        if (selectedTile === 'ERASER') {
            delete gridData[`${col},${row}`];
        } else {
            // Add new tile
            const svgClone = selectedTile.cloneNode(true);
            cell.insertBefore(svgClone, cell.firstChild);
            
            // Store in grid data
            gridData[`${col},${row}`] = selectedTile.outerHTML;
        }
        
        cell.classList.add('selected');
        setTimeout(() => cell.classList.remove('selected'), 200);
        
        // Save grid state to localStorage
        saveGridState();
    }
}

// Save grid state to localStorage
function saveGridState() {
    localStorage.setItem('dungeonGridData', JSON.stringify(gridData));
}

// Load grid state from localStorage
function loadGridState() {
    const saved = localStorage.getItem('dungeonGridData');
    if (saved) {
        gridData = JSON.parse(saved);
        // Restore grid tiles
        for (const [coords, svgHtml] of Object.entries(gridData)) {
            const [col, row] = coords.split(',').map(Number);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgHtml, 'image/svg+xml');
                const svg = doc.querySelector('svg');
                if (svg) {
                    cell.insertBefore(svg, cell.firstChild);
                }
            }
        }
    }
}

// Load tile from URL
function loadTile() {
    const url = document.getElementById('tileUrl').value.trim();
    if (!url) {
        alert('Please enter a valid SVG file path or URL');
        return;
    }

    fetch(url)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            
            if (svgElement) {
                svgElement.setAttribute('viewBox', '0 0 100 100');
                selectedTile = svgElement;
                alert('Tile loaded! Click on grid cells to place it.');
                
                // Remove active class from all tile options
                document.querySelectorAll('.tile-option').forEach(opt => 
                    opt.classList.remove('active')
                );
            } else {
                alert('Invalid SVG file');
            }
        })
        .catch(error => {
            alert('Error loading tile: ' + error.message);
        });
}

// Select sample tile
function selectSampleTile(tileType) {
    const tileOption = document.querySelector(`[data-tile="${tileType}"]`);
    const svg = tileOption.querySelector('svg');
    selectedTile = svg.cloneNode(true);
    
    // Update active state
    document.querySelectorAll('.tile-option').forEach(opt => 
        opt.classList.remove('active')
    );
    tileOption.classList.add('active');
}

// Select eraser to clear single cells
function selectEraser() {
    selectedTile = 'ERASER';
    
    // Update active state
    document.querySelectorAll('.tile-option').forEach(opt => 
        opt.classList.remove('active')
    );
    document.querySelector('[data-tile="eraser"]').classList.add('active');
}

// Clear selection
function clearSelection() {
    selectedTile = null;
    document.querySelectorAll('.tile-option').forEach(opt => 
        opt.classList.remove('active')
    );
}

// Clear entire grid
function clearGrid() {
    if (confirm('Are you sure you want to clear the entire grid?')) {
        document.querySelectorAll('.grid-cell').forEach(cell => {
            const svg = cell.querySelector('svg');
            if (svg) {
                cell.removeChild(svg);
            }
        });
        gridData = {};
        saveGridState();
    }
}

// Export grid data
function exportGrid() {
    const data = JSON.stringify(gridData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dnd-map-grid.json';
    a.click();
}

// Load character data from localStorage
function loadCharacterData() {
    for (let i = 1; i <= 4; i++) {
        const saved = localStorage.getItem(`character${i}`);
        if (saved) {
            const character = JSON.parse(saved);
            const cards = document.querySelectorAll('.character-card');
            if (cards[i - 1]) {
                const card = cards[i - 1];
                card.querySelector('.character-name').value = character.name || '';
                card.querySelector('.class-input').value = character.class || '';
                const inputs = card.querySelectorAll('.stat-input');
                inputs[0].value = character.level || '';
                inputs[1].value = character.hp || '';
                inputs[2].value = character.maxhp || '';
            }
        }
    }
}

// Refresh character data every 2 seconds to sync with character management page
function startCharacterSync() {
    setInterval(loadCharacterData, 2000);
}

// Toggle API lookup panel
function toggleAPILookup() {
    const panel = document.getElementById('api-lookup');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        if (panel.style.display === 'block') {
            populateReferenceList();
        }
    }
}

// Populate the datalist with monsters and spells
async function populateReferenceList() {
    const datalist = document.getElementById('reference-list');
    if (!datalist || datalist.children.length > 0) return;
    
    // Try to get cached lists first
    let monsters = [];
    let spells = [];
    
    const cachedMonsters = localStorage.getItem('monsterList');
    const cachedSpells = localStorage.getItem('spellList');
    
    if (cachedMonsters) {
        monsters = JSON.parse(cachedMonsters);
    }
    if (cachedSpells) {
        spells = JSON.parse(cachedSpells);
    }
    
    // If no cached data, fetch from API
    if (monsters.length === 0 || spells.length === 0) {
        try {
            const [monsterResponse, spellResponse] = await Promise.all([
                fetch('https://www.dnd5eapi.co/api/monsters'),
                fetch('https://www.dnd5eapi.co/api/spells')
            ]);
            
            if (monsterResponse.ok) {
                const monsterData = await monsterResponse.json();
                monsters = monsterData.results;
                localStorage.setItem('monsterList', JSON.stringify(monsters));
            }
            
            if (spellResponse.ok) {
                const spellData = await spellResponse.json();
                spells = spellData.results;
                localStorage.setItem('spellList', JSON.stringify(spells));
            }
        } catch (error) {
            console.error('Error fetching reference lists:', error);
        }
    }
    
    // Populate datalist
    monsters.forEach(monster => {
        const option = document.createElement('option');
        option.value = `${monster.name} (Monster)`;
        datalist.appendChild(option);
    });
    
    spells.forEach(spell => {
        const option = document.createElement('option');
        option.value = `${spell.name} (Spell)`;
        datalist.appendChild(option);
    });
}

// Lookup reference (monster or spell)
async function lookupReference() {
    const searchInput = document.getElementById('lookup-search');
    const resultsDiv = document.getElementById('api-results');
    const searchValue = searchInput.value.trim();
    
    if (!searchValue) {
        resultsDiv.innerHTML = '<p class="error">Please enter a search term</p>';
        return;
    }
    
    resultsDiv.innerHTML = '<p>Loading...</p>';
    
    // Determine if it's a monster or spell
    const isMonster = searchValue.includes('(Monster)');
    const isSpell = searchValue.includes('(Spell)');
    const cleanName = searchValue.replace(/\s*\((Monster|Spell)\)\s*/, '').toLowerCase().replace(/\s+/g, '-');
    
    try {
        let data = null;
        let displayHtml = '';
        
        if (isMonster || !isSpell) {
            // Try monster first
            const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${cleanName}`);
            if (response.ok) {
                data = await response.json();
                displayHtml = displayMonsterInfo(data);
            }
        }
        
        if (!data && (isSpell || !isMonster)) {
            // Try spell
            const response = await fetch(`https://www.dnd5eapi.co/api/spells/${cleanName}`);
            if (response.ok) {
                data = await response.json();
                displayHtml = displaySpellInfo(data);
            }
        }
        
        if (displayHtml) {
            resultsDiv.innerHTML = displayHtml;
        } else {
            resultsDiv.innerHTML = '<p class="error">Not found. Try selecting from the dropdown or check spelling.</p>';
        }
    } catch (error) {
        console.error('Error looking up reference:', error);
        resultsDiv.innerHTML = '<p class="error">Error fetching data. Please try again.</p>';
    }
}

// Display monster information
function displayMonsterInfo(monster) {
    let info = `<div class="reference-card">
        <h3>${monster.name}</h3>
        <p><strong>Type:</strong> ${monster.size} ${monster.type}</p>
        <p><strong>Armor Class:</strong> ${monster.armor_class[0]?.value || 'N/A'}</p>
        <p><strong>Hit Points:</strong> ${monster.hit_points} (${monster.hit_dice})</p>
        <p><strong>Speed:</strong> ${Object.entries(monster.speed).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
        <p><strong>Challenge Rating:</strong> ${monster.challenge_rating} (${monster.xp || 0} XP)</p>
    `;
    
    if (monster.special_abilities && monster.special_abilities.length > 0) {
        info += '<h4>Special Abilities:</h4><ul>';
        monster.special_abilities.slice(0, 3).forEach(ability => {
            info += `<li><strong>${ability.name}:</strong> ${ability.desc}</li>`;
        });
        info += '</ul>';
    }
    
    info += '</div>';
    return info;
}

// Display spell information
function displaySpellInfo(spell) {
    let info = `<div class="reference-card">
        <h3>${spell.name}</h3>
        <p><strong>Level:</strong> ${spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}</p>
        <p><strong>School:</strong> ${spell.school.name}</p>
        <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
        <p><strong>Range:</strong> ${spell.range}</p>
        <p><strong>Components:</strong> ${spell.components.join(', ')}</p>
        <p><strong>Duration:</strong> ${spell.duration}</p>
        <p><strong>Description:</strong> ${spell.desc.join(' ')}</p>
    `;
    
    if (spell.higher_level && spell.higher_level.length > 0) {
        info += `<p><strong>At Higher Levels:</strong> ${spell.higher_level.join(' ')}</p>`;
    }
    
    info += '</div>';
    return info;
}

// Initialize on page load
loadTiles();
initGrid();
loadGridState();
loadCharacterData();
startCharacterSync();

// D&D 5e API Integration
const DND_API_BASE = 'https://www.dnd5eapi.co/api';

// Fetch monster data from D&D 5e API
async function fetchMonster(monsterName) {
    try {
        const response = await fetch(`${DND_API_BASE}/monsters/${monsterName.toLowerCase().replace(/\s+/g, '-')}`);
        if (!response.ok) throw new Error('Monster not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching monster:', error);
        return null;
    }
}

// Fetch spell data from D&D 5e API
async function fetchSpell(spellName) {
    try {
        const response = await fetch(`${DND_API_BASE}/spells/${spellName.toLowerCase().replace(/\s+/g, '-')}`);
        if (!response.ok) throw new Error('Spell not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching spell:', error);
        return null;
    }
}

// Fetch list of monsters
async function fetchMonsterList() {
    try {
        const response = await fetch(`${DND_API_BASE}/monsters`);
        if (!response.ok) throw new Error('Failed to fetch monster list');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching monster list:', error);
        return [];
    }
}

// Fetch list of spells
async function fetchSpellList() {
    try {
        const response = await fetch(`${DND_API_BASE}/spells`);
        if (!response.ok) throw new Error('Failed to fetch spell list');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching spell list:', error);
        return [];
    }
}

// Display monster information
function displayMonsterInfo(monster) {
    if (!monster) {
        return 'Monster not found';
    }
    
    let info = `<div class="api-result">
        <h3>${monster.name}</h3>
        <p><strong>Size:</strong> ${monster.size} ${monster.type}</p>
        <p><strong>Armor Class:</strong> ${monster.armor_class[0]?.value || 'N/A'}</p>
        <p><strong>Hit Points:</strong> ${monster.hit_points} (${monster.hit_dice})</p>
        <p><strong>Speed:</strong> ${Object.entries(monster.speed).map(([k, v]) => `${k}: ${v}`).join(', ')}</p>
        <p><strong>Challenge Rating:</strong> ${monster.challenge_rating}</p>
    `;
    
    if (monster.special_abilities && monster.special_abilities.length > 0) {
        info += '<h4>Special Abilities:</h4><ul>';
        monster.special_abilities.forEach(ability => {
            info += `<li><strong>${ability.name}:</strong> ${ability.desc}</li>`;
        });
        info += '</ul>';
    }
    
    info += '</div>';
    return info;
}

// Display spell information
function displaySpellInfo(spell) {
    if (!spell) {
        return 'Spell not found';
    }
    
    let info = `<div class="api-result">
        <h3>${spell.name}</h3>
        <p><strong>Level:</strong> ${spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}</p>
        <p><strong>School:</strong> ${spell.school.name}</p>
        <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
        <p><strong>Range:</strong> ${spell.range}</p>
        <p><strong>Components:</strong> ${spell.components.join(', ')}</p>
        <p><strong>Duration:</strong> ${spell.duration}</p>
        <p><strong>Description:</strong></p>
        <p>${spell.desc.join(' ')}</p>
    `;
    
    if (spell.higher_level && spell.higher_level.length > 0) {
        info += `<p><strong>At Higher Levels:</strong> ${spell.higher_level.join(' ')}</p>`;
    }
    
    info += '</div>';
    return info;
}

// Initialize API features
async function initAPI() {
    // Load monster and spell lists for autocomplete
    const monsters = await fetchMonsterList();
    const spells = await fetchSpellList();
    
    // Store in localStorage for offline access
    if (monsters.length > 0) {
        localStorage.setItem('monsterList', JSON.stringify(monsters));
    }
    if (spells.length > 0) {
        localStorage.setItem('spellList', JSON.stringify(spells));
    }
}

// Get cached lists
function getCachedMonsterList() {
    const cached = localStorage.getItem('monsterList');
    return cached ? JSON.parse(cached) : [];
}

function getCachedSpellList() {
    const cached = localStorage.getItem('spellList');
    return cached ? JSON.parse(cached) : [];
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchMonster,
        fetchSpell,
        fetchMonsterList,
        fetchSpellList,
        displayMonsterInfo,
        displaySpellInfo,
        initAPI,
        getCachedMonsterList,
        getCachedSpellList
    };
}

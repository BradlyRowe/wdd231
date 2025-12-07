// Display character data from URL parameters on thank you page
export function displayCharacterSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryDiv = document.getElementById('character-summary');

    if (!summaryDiv) return;
    
    let charactersHTML = '';
    let characterCount = 0;
    
    // Loop through all 4 possible characters
    for (let i = 1; i <= 4; i++) {
        const charName = urlParams.get(`char${i}name`);
        const charClass = urlParams.get(`char${i}class`);
        
        // Only display if character has at least a name or class
        if (charName || charClass) {
            const charLevel = urlParams.get(`char${i}level`) || '1';
            const charHP = urlParams.get(`char${i}hp`) || '0';
            const charMaxHP = urlParams.get(`char${i}maxhp`) || '0';
            const charArmor = urlParams.get(`char${i}armor`) || 'N/A';
            const charNotes = urlParams.get(`char${i}notes`) || 'No notes';
            
            characterCount++;
            charactersHTML += `
                <div class="char-detail">
                    <h3>${charName || 'Unknown Hero'} <span class="char-number">(Character ${i})</span></h3>
                    <p><strong>Class:</strong> ${charClass || 'Adventurer'}</p>
                    <p><strong>Level:</strong> ${charLevel}</p>
                    <p><strong>Hit Points:</strong> ${charHP} / ${charMaxHP}</p>
                    <p><strong>Armor Class:</strong> ${charArmor}</p>
                    <p><strong>Notes:</strong> ${charNotes}</p>
                </div>
            `;
        }
    }
    
    // If no characters found, show a message
    if (characterCount === 0) {
        charactersHTML = `
            <div class="char-detail">
                <h3>No Characters Submitted</h3>
                <p>It looks like no character data was provided. Please go back and fill in at least one character.</p>
            </div>
        `;
    }
    
    summaryDiv.innerHTML = `
        <h2>Your Party (${characterCount} Character${characterCount !== 1 ? 's' : ''})</h2>
        <div class="characters-grid">
            ${charactersHTML}
        </div>
    `;
}

// Auto-initialize
displayCharacterSummary();

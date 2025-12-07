// Display character data from URL parameters on thank you page
export function displayCharacterSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryDiv = document.getElementById('character-summary');

    if (!summaryDiv) return;
    
    // Extract parameters
    const charName = urlParams.get('charname') || 'Unknown Hero';
    const charClass = urlParams.get('charclass') || 'Adventurer';
    const charLevel = urlParams.get('charlevel') || '1';
    const charHP = urlParams.get('charhp') || '0';
    const charMaxHP = urlParams.get('charmaxhp') || '0';
    const charArmor = urlParams.get('chararmor') || 'N/A';
    const charNotes = urlParams.get('charnotes') || 'No notes provided';
    
    summaryDiv.innerHTML = `
        <div class="char-detail">
            <h3>${charName}</h3>
            <p><strong>Class:</strong> ${charClass}</p>
            <p><strong>Level:</strong> ${charLevel}</p>
            <p><strong>Hit Points:</strong> ${charHP} / ${charMaxHP}</p>
            <p><strong>Armor Class:</strong> ${charArmor}</p>
            <p><strong>Notes:</strong> ${charNotes}</p>
        </div>
    `;
}

// Auto-initialize
displayCharacterSummary();

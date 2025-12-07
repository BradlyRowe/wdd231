// Character data management using localStorage

// Validate character field
function validateField(charNum, fieldName, value) {
    const errorElement = document.getElementById(`char${charNum}-${fieldName}-error`);
    if (!errorElement) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    if (fieldName === 'name' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
    } else if (fieldName === 'class' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Class must be at least 2 characters';
    } else if (fieldName === 'level' && value) {
        const level = parseInt(value);
        if (level < 1 || level > 20) {
            isValid = false;
            errorMessage = 'Level must be between 1 and 20';
        }
    } else if (fieldName === 'hp') {
        const hp = parseInt(value);
        const maxhp = parseInt(document.getElementById(`char${charNum}-maxhp`).value);
        if (value && maxhp && hp > maxhp) {
            isValid = false;
            errorMessage = 'Current HP cannot exceed Max HP';
        }
    }
    
    errorElement.textContent = errorMessage;
    return isValid;
}

// Save character data to localStorage
function saveCharacter(charNum) {
    const character = {
        name: document.getElementById(`char${charNum}-name`).value,
        class: document.getElementById(`char${charNum}-class`).value,
        level: document.getElementById(`char${charNum}-level`).value,
        hp: document.getElementById(`char${charNum}-hp`).value,
        maxhp: document.getElementById(`char${charNum}-maxhp`).value,
        armor: document.getElementById(`char${charNum}-armor`).value,
        notes: document.getElementById(`char${charNum}-notes`).value
    };
    
    localStorage.setItem(`character${charNum}`, JSON.stringify(character));
}

// Load character data from localStorage
function loadCharacter(charNum) {
    const saved = localStorage.getItem(`character${charNum}`);
    if (saved) {
        const character = JSON.parse(saved);
        document.getElementById(`char${charNum}-name`).value = character.name || '';
        document.getElementById(`char${charNum}-class`).value = character.class || '';
        document.getElementById(`char${charNum}-level`).value = character.level || '';
        document.getElementById(`char${charNum}-hp`).value = character.hp || '';
        document.getElementById(`char${charNum}-maxhp`).value = character.maxhp || '';
        document.getElementById(`char${charNum}-armor`).value = character.armor || '';
        document.getElementById(`char${charNum}-notes`).value = character.notes || '';
    }
}

// Add event listeners to auto-save on input change
function initAutoSave() {
    for (let i = 1; i <= 4; i++) {
        const fields = ['name', 'class', 'level', 'hp', 'maxhp', 'armor', 'notes'];
        fields.forEach(field => {
            const element = document.getElementById(`char${i}-${field}`);
            if (element) {
                element.addEventListener('input', (e) => {
                    validateField(i, field, e.target.value);
                    saveCharacter(i);
                });
                element.addEventListener('blur', (e) => {
                    validateField(i, field, e.target.value);
                });
            }
        });
    }
}

// Load all characters on page load
function init() {
    for (let i = 1; i <= 4; i++) {
        loadCharacter(i);
    }
    initAutoSave();
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('character-modal');
    const showModalBtn = document.getElementById('show-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalOkBtn = document.getElementById('modal-ok-btn');
    
    if (showModalBtn && modal) {
        showModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
        });
    }
    
    const closeModal = () => {
        if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
        }
    };
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Initialize on page load
init();
initModal();

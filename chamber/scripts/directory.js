// Roy City Chamber of Commerce - Directory JavaScript
// WDD 231 - Chamber Directory Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');
    const navigation = document.getElementById('navigation');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const membersContainer = document.getElementById('members-container');
    
    // Initialize the page
    initializePage();
    
    // Hamburger menu toggle
    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navigation.classList.toggle('open');
        });
    }
    
    // View toggle functionality
    if (gridViewBtn && listViewBtn) {
        console.log('View buttons found, adding event listeners');
        gridViewBtn.addEventListener('click', () => {
            console.log('Grid view button clicked');
            setView('grid');
        });
        listViewBtn.addEventListener('click', () => {
            console.log('List view button clicked');
            setView('list');
        });
    } else {
        console.error('View buttons not found:', { gridViewBtn, listViewBtn });
    }
    
    // Fetch and display member data
    fetchMembers();
    
    // Set copyright year and last modified date
    updateFooterDates();
});

// Initialize page functionality
function initializePage() {
    console.log('Roy City Chamber Directory initialized');
}

// Fetch member data from JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.table(data.members); // Display data in console table format
        
        // Store member data globally for view switching
        window.currentMemberData = data.members;
        
        displayMembers(data.members);
        
    } catch (error) {
        console.error('Error fetching member data:', error);
        displayError('Unable to load member directory. Please try again later.');
    }
}

// Display members in the current view
function displayMembers(members) {
    const container = document.getElementById('members-container');
    
    if (!container) {
        console.error('Members container not found');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Determine current view type
    const isListView = container.classList.contains('members-list');
    
    // Create member elements based on view type
    members.forEach((member) => {
        const memberElement = isListView ? createMemberListItem(member) : createMemberCard(member);
        container.appendChild(memberElement);
    });
}

// Create individual member card element
function createMemberCard(member) {
    // Create card element
    const card = document.createElement('div');
    card.className = `member-card ${getMembershipClass(member.membershipLevel)}`;
    
    // Create membership level badge
    const membershipBadge = document.createElement('div');
    membershipBadge.className = `membership-level ${getMembershipClass(member.membershipLevel)}`;
    membershipBadge.textContent = `Member Level: ${getMembershipText(member.membershipLevel)}`;
    
    // Create member name
    const name = document.createElement('h3');
    name.textContent = member.name;
    
    // Create member info section
    const info = document.createElement('div');
    info.className = 'member-info';
    info.innerHTML = `
        <p><strong>📍</strong> ${member.address}</p>
        <p><strong>📞</strong> ${member.phone}</p>
        <p><strong>🏢</strong> ${member.industry}</p>
        <p><strong>👥</strong> ${member.employees} employees</p>
        <p><strong>📅</strong> Est. ${member.yearEstablished}</p>
    `;
    
    // Create member description
    const description = document.createElement('p');
    description.className = 'member-description';
    description.textContent = member.description;
    
    // Create website link
    const website = document.createElement('a');
    website.className = 'member-website';
    website.href = member.website;
    website.target = '_blank';
    website.rel = 'noopener noreferrer';
    website.textContent = 'Visit Website →';
    
    // Assemble the card
    card.appendChild(name);
    card.appendChild(info);
    card.appendChild(description);
    card.appendChild(membershipBadge);
    card.appendChild(website);
    
    return card;
}

// Create individual member list item (text-based for list view)
function createMemberListItem(member) {
    // Create list item element
    const listItem = document.createElement('div');
    listItem.className = `member-list-item ${getMembershipClass(member.membershipLevel)}`;
    
    // Create membership badge (inline)
    const membershipBadge = document.createElement('span');
    membershipBadge.className = `membership-badge ${getMembershipClass(member.membershipLevel)}`;
    membershipBadge.textContent = `Member Level: ${getMembershipText(member.membershipLevel)}`;
    
    // Create the text content
    listItem.innerHTML = `
        <div class="member-list-content">
            <div class="member-list-header">
                <h3 class="member-list-name">${member.name}</h3>
                ${membershipBadge.outerHTML}
            </div>
            <div class="member-list-details">
                <span class="member-detail"><strong>Address:</strong> ${member.address}</span>
                <span class="member-detail"><strong>Phone:</strong> ${member.phone}</span>
                <span class="member-detail"><strong>Industry:</strong> ${member.industry}</span>
                <span class="member-detail"><strong>Employees:</strong> ${member.employees}</span>
                <span class="member-detail"><strong>Est:</strong> ${member.yearEstablished}</span>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="member-list-website">Visit Website</a>
            </div>
            <p class="member-list-description">${member.description}</p>
        </div>
    `;
    
    return listItem;
}

// Get membership level CSS class
function getMembershipClass(level) {
    switch (level) {
        case 3:
            return 'gold';
        case 2:
            return 'silver';
        case 1:
        default:
            return 'member';
    }
}

// Get membership level display text
function getMembershipText(level) {
    switch (level) {
        case 3:
            return 'Gold';
        case 2:
            return 'Silver';
        case 1:
        default:
            return 'Member';
    }
}

// Set view type (grid or list)
function setView(viewType) {
    console.log('setView called with:', viewType);
    const container = document.getElementById('members-container');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    
    if (!container || !gridBtn || !listBtn) {
        console.error('Required elements not found:', { container, gridBtn, listBtn });
        return;
    }
    
    // Update button states
    if (viewType === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        container.className = 'members-grid';
    } else {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        container.className = 'members-list';
    }
    
    // Store preference in localStorage
    localStorage.setItem('chamberViewPreference', viewType);
    
    // Refresh member display with new view type
    if (window.currentMemberData) {
        displayMembers(window.currentMemberData);
    }
    
    // Announce change to screen readers
    announceViewChange(viewType);
}

// Announce view change for accessibility
function announceViewChange(viewType) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `View changed to ${viewType} layout`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Load saved view preference
function loadViewPreference() {
    const savedView = localStorage.getItem('chamberViewPreference') || 'grid';
    setView(savedView);
}

// Display error message
function displayError(message) {
    const container = document.getElementById('members-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #dc2626;">
                <h3>Error Loading Directory</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Update footer with current year and last modified date
function updateFooterDates() {
    // Set current year
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Set last modified date
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', options);
    }
}

// Utility function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Load view preference when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadViewPreference, 100);
});

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchMembers,
        displayMembers,
        createMemberCard,
        setView,
        getMembershipClass,
        getMembershipText
    };
}
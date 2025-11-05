// Latter-day Prophets JavaScript
// WDD 231 - Week 3 Activity

// Declare const variable for the JSON resource URL
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the HTML div element with id "cards"
const cards = document.querySelector('#cards');

// Async function to fetch prophet data
async function getProphetData() {
    // Store the response from the fetch() method
    const response = await fetch(url);
    
    // Convert the response to a JSON object
    const data = await response.json();
    
    // Console.table() to check the data response
    console.table(data.prophets);
    
    // Call displayProphets function with data.prophets argument
    // We send data.prophets (not just data) because displayProphets expects an array parameter
    displayProphets(data.prophets);
}

// Function expression to display prophets using arrow function
const displayProphets = (prophets) => {
    // Use forEach loop to process each prophet record
    prophets.forEach((prophet) => {
        // Create a section element and store it in variable named "card"
        let card = document.createElement('section');
        
        // Create an h2 element and store it in variable named "fullName"
        let fullName = document.createElement('h2');
        
        // Create an img element and store it in variable named "portrait"
        let portrait = document.createElement('img');
        
        // Create additional info elements
        let birthInfo = document.createElement('p');
        let birthplace = document.createElement('p');
        
        // Populate the heading element with the prophet's full name using template string
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        // Add ordinal suffix to order number
        const getOrdinal = (num) => {
            const suffixes = ["th", "st", "nd", "rd"];
            const v = num % 100;
            return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
        };
        
        // Build additional information
        birthInfo.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;
        birthplace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;
        
        // Build the image element by setting attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${getOrdinal(prophet.order)} Latter-day Prophet`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        // Add the heading and image elements to the section card using appendChild()
        card.appendChild(fullName);
        card.appendChild(birthInfo);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        
        // Add the section card to the "cards" div
        cards.appendChild(card);
    });
};

// Call the function getProphetData() to test the fetch and response
getProphetData();
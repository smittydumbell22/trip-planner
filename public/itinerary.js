// Get the itinerary list element
const itineraryList = document.getElementById('itinerary-list');

// Function to display existing itinerary items
function displayItineraryItems() {
    // Retrieve itinerary items from local storage or database
    const itineraryItems = JSON.parse(localStorage.getItem('itineraryItems')) || [];
    
    // Clear existing items
    itineraryList.innerHTML = '';

    // Loop through itinerary items and create HTML elements
    itineraryItems.forEach((item, index) => {
        const li = createListItem(item, index);
        itineraryList.appendChild(li);
    });
}

// Function to create a list item with edit and delete buttons
function createListItem(item, index) {
    const li = document.createElement('li');
    li.textContent = item;
    
    // Add edit and delete buttons
    const editButton = createButton('Edit');
    editButton.addEventListener('click', () => editItem(index));
    
    const deleteButton = createButton('Delete');
    deleteButton.addEventListener('click', () => deleteItem(index));
    
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    
    return li;
}

// Function to create a button element
function createButton(text) {
    const button = document.createElement('button');
    button.textContent = text;
    return button;
}

// Function to add a new itinerary item
function addItemToItinerary(newItem) {
    // Retrieve existing itinerary items
    const itineraryItems = JSON.parse(localStorage.getItem('itineraryItems')) || [];
    
    // Add the new item
    itineraryItems.push(newItem);
    
    // Save the updated itinerary items to local storage
    localStorage.setItem('itineraryItems', JSON.stringify(itineraryItems));
    
    // Re-display the itinerary items
    displayItineraryItems();
}

// Function to edit an existing itinerary item
function editItem(index) {
    // Retrieve existing itinerary items
    const itineraryItems = JSON.parse(localStorage.getItem('itineraryItems')) || [];
    
    // Prompt the user to enter the new item
    const newItem = prompt('Enter the new item:');
    
    // Update the item if the input is not empty
    if (newItem !== null && newItem !== '') {
        itineraryItems[index] = newItem;
        
        // Save the updated itinerary items to local storage
        localStorage.setItem('itineraryItems', JSON.stringify(itineraryItems));
        
        // Re-display the itinerary items
        displayItineraryItems();
    }
}

// Function to delete an existing itinerary item
function deleteItem(index) {
    // Retrieve existing itinerary items
    const itineraryItems = JSON.parse(localStorage.getItem('itineraryItems')) || [];
    
    // Remove the item at the specified index
    itineraryItems.splice(index, 1);
    
    // Save the updated itinerary items to local storage
    localStorage.setItem('itineraryItems', JSON.stringify(itineraryItems));
    
    // Re-display the itinerary items
    displayItineraryItems();
}

// Event listener for adding a new itinerary item
document.getElementById('add-item-btn').addEventListener('click', () => {
    const newItem = prompt('Enter a new itinerary item:');
    if (newItem !== null && newItem !== '') {
        addItemToItinerary(newItem);
    }
});

// Display itinerary items when the page loads
window.addEventListener('load', displayItineraryItems);

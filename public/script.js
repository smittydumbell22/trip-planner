document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    //Add event listener to the search button
    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim(); // Get the search query
        if (query) {
            // Call a function to fetch search results based on the query
            fetchSearchResults(query);
        }
    });

    // Function to display search results in the UI
    function displaySearchResults(results) {
        // Clear previous search results
        const searchResultsContainer = document.querySelector('.search-results-container');
        searchResultsContainer.innerHTML = '';

        // Iterate through the results and create HTML elements to display them
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('search-result');

            // Customize this part based on your API response structure
            const title = result.title;
            const description = result.description;

            resultElement.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
            `;
            searchResultsContainer.appendChild(resultElement);
        });
    }

    // Example usage: fetching detailed information about a specific object
    const xid = "Q372040";
    const lang = "en";
    fetch(`/api/places/${xid}?lang=${lang}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process the data and update UI
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

    // Get itinerary list element
    const itineraryList = document.getElementById('itinerary-list');

    // Function to display existing itinerary items
    function displayItineraryItems() {
        // Retrieve itinerary items from local storage or database
        const itineraryItems = JSON.parse(localStorage.getItem('itineraryItems')) || [];

        // Clear existing items
        itineraryList.innerHTML = '';

        // Loop through itinerary items and create HTML elements
        itineraryItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;

            // Add edit and delete buttons
            const editButton = createButton('Edit', () => editItem(index));
            const deleteButton = createButton('Delete', () => deleteItem(index));

            li.appendChild(editButton);
            li.appendChild(deleteButton);

            itineraryList.appendChild(li);
        });
    }

    // Function to create a button with specified text and click handler
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
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
    displayItineraryItems();
});

// Add event listener to the "My Itinerary" button
const myItineraryButton = document.querySelector('#my-itinerary-button');
myItineraryButton.addEventListener('click', navigateToItinerary);

// Define the handler function for navigating to the itinerary page
function navigateToItinerary(event) {
    // Prevent the default behavior of the button (e.g., submitting a form)
    event.preventDefault();

    // Implement the navigation logic here
    // For example, you can change the URL to the itinerary page
    window.location.href = '/itinerary.html';
}

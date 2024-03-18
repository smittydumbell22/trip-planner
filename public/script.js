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
function displaySearchResults(searchResults) {
    const searchResultsContainer = document.querySelector('.search-results-container');
    searchResultsContainer.innerHTML = ''; // Clear previous search results

    searchResults.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('search-result');

        const nameElement = document.createElement('h3');
        nameElement.textContent = result.name;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = result.description;

        // Add more elements for additional information if needed

        resultElement.appendChild(nameElement);
        resultElement.appendChild(descriptionElement);

        searchResultsContainer.appendChild(resultElement);
    });
}


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
});

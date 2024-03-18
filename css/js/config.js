// Define API endpoints
const BASE_URL = "https://api.opentripmap.com/0.1";
const PLACES_GEONAME_ENDPOINT = "/{lang}/places/geoname";
const PLACES_BBOX_ENDPOINT = "/{lang}/places/bbox";
const PLACES_RADIUS_ENDPOINT = "/{lang}/places/radius";
const PLACES_AUTOSUGGEST_ENDPOINT = "/{lang}/places/autosuggest";
const PLACES_XID_ENDPOINT = "/{lang}/places/xid/{xid}";

// Example API key
const API_KEY = "5ae2e3f221c38a28845f05b64d4565925b923c98a0618216eb198d11";

// Function to make GET requests to the API
async function fetchData(endpoint, params) {
    const url = `${BASE_URL}${endpoint}`.replace("{lang}", params.lang).replace("{xid}", params.xid);
    const response = await fetch(`${url}?apikey=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}, status: ${response.status}`);
    }
    return response.json();
}

// Example usage: fetching detailed information about a specific object
const xid = "Q372040";
const lang = "en";
const params = { lang, xid };
fetchData(PLACES_XID_ENDPOINT, params)
    .then(data => {
        // Process the data as needed
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Import necessary modules
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

// Create an Express app
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route for serving itinerary.js with correct MIME type
app.get('/itinerary.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'itinerary.js'));
});


// Define API endpoints
const BASE_URL = "https://api.opentripmap.com/0.1";
const PLACES_GEONAME_ENDPOINT = "/{lang}/places/geoname";
const PLACES_BBOX_ENDPOINT = "/{lang}/places/bbox";
const PLACES_RADIUS_ENDPOINT = "/{lang}/places/radius";
const PLACES_AUTOSUGGEST_ENDPOINT = "/{lang}/places/autosuggest";
const PLACES_XID_ENDPOINT = "/{lang}/places/xid/{xid}";
const API_KEY = "5ae2e3f221c38a28845f05b64d4565925b923c98a0618216eb198d11";

// Define route for fetching detailed information about a specific object
app.get('/api/places/:xid', async (req, res) => {
    const xid = req.params.xid;
    const lang = req.query.lang || "en";
    const url = `${BASE_URL}${PLACES_XID_ENDPOINT}`.replace("{lang}", lang).replace("{xid}", xid);
    try {
        const response = await fetch(`${url}?apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define route for handling search requests
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const lang = req.query.lang || "en";
    const url = `${BASE_URL}${PLACES_AUTOSUGGEST_ENDPOINT}`.replace("{lang}", lang);
    try {
        const response = await fetch(`${url}?apikey=${API_KEY}&query=${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

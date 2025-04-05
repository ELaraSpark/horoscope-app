const express = require("express");
const cors = require("cors");
const axios = require("axios");
// Removed dotenv requirement as we aren't using environment variables here yet
// require("dotenv").config();

const app = express();
app.use(cors()); // Enable CORS for requests from the frontend
app.use(express.json()); // Middleware to parse JSON request bodies

const AZTRO_API_URL = 'https://aztro.sameerkumar.website/';

// Define the endpoint for the frontend to call
app.post("/horoscope", async (req, res) => {
  try {
    // Get sign and day from the request body sent by the frontend
    const { sign, day } = req.body;

    if (!sign || !day) {
      return res.status(400).json({ error: "Sign and day are required in the request body" });
    }

    // Make the POST request to the Aztro API
    // Aztro expects parameters in the query string even for POST
    const aztroResponse = await axios.post(`${AZTRO_API_URL}?sign=${sign}&day=${day}`);

    // Send the data received from Aztro back to the frontend
    res.json(aztroResponse.data);

  } catch (error) {
    console.error("Error fetching horoscope from Aztro:", error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({ error: "Error fetching horoscope data from Aztro API" });
  }
});

const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => console.log(`Backend proxy server running on port ${PORT}`));

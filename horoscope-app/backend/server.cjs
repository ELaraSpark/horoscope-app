const express = require("express");
const cors = require("cors");
// Removed duplicate requires
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
console.log("[Server] Express middleware configured."); // Added log

// Switched to "Best Daily Astrology And Horoscope API"
const BEST_ASTROLOGY_API_URL = 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope';
const RAPIDAPI_KEY = 'c4c2522c78msh3a433ccb32ea030p1244dfjsn87d80d7cb7da'; // From image
const RAPIDAPI_HOST = 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'; // From image

app.post("/horoscope", async (req, res) => {
  console.log(`[Server] Received POST request on /horoscope for sign: ${req.body?.sign}`); // Added log
  try {
    // This API only needs the sign for today's horoscope
    // We ignore the 'day' sent from the frontend for now
    const { sign } = req.body;

    if (!sign) {
      return res.status(400).json({ error: "Sign is required" });
    }

    // Convert frontend sign key (e.g., 'aries') to capitalized version if needed by API
    // Assuming API takes capitalized e.g., 'Leo' based on example path
    const capitalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1);

    const options = {
      method: 'GET',
      url: BEST_ASTROLOGY_API_URL,
      params: { // Send parameters as query string for GET
        zodiacSign: capitalizedSign // Use the correct parameter name
       },
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
      }
    };

    console.log(`[Server] Making GET request to RapidAPI for sign: ${capitalizedSign}`); // Added log
    const rapidApiResponse = await axios.request(options);
    console.log("[Server] Received response from RapidAPI."); // Added log

    // Extract the prediction from the RapidAPI response and send it back
    // Assuming the external API response structure has a 'prediction' field
    const predictionText = rapidApiResponse.data?.prediction;

    if (!predictionText) {
      // Handle case where the external API response is missing the prediction
      console.error("External API response missing 'prediction' field:", rapidApiResponse.data);
      return res.status(500).json({ error: "Horoscope text not found in external API response" });
    }

    // Send back an object structured as the frontend expects
    console.log(`[Server] Sending prediction back to frontend: ${predictionText ? predictionText.substring(0, 50) + '...' : 'None'}`); // Added log
    res.json({ prediction: predictionText });

  } catch (error) {
    console.error("Error fetching horoscope from Best Astrology API:", error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({ error: "Error fetching horoscope data from Best Astrology API" });
  }
});

const PORT = process.env.PORT || 5000;
console.log(`[Server] Attempting to listen on port ${PORT}...`); // Added log
app.listen(PORT, () => {
  console.log(`[Server] Backend proxy server successfully running on port ${PORT}`); // Modified log
}).on('error', (err) => {
  // Added listener for server startup errors (like EADDRINUSE)
  console.error(`[Server] Failed to start server on port ${PORT}:`, err);
});

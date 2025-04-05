const express = require("express");
const cors = require("cors");
// Removed duplicate requires
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Switched to "Best Daily Astrology And Horoscope API"
const BEST_ASTROLOGY_API_URL = 'https://best-daily-astrology-and-horoscope-api.p.rapidapi.com/api/Detailed-Horoscope';
const RAPIDAPI_KEY = 'c4c2522c78msh3a433ccb32ea030p1244dfjsn87d80d7cb7da'; // From image
const RAPIDAPI_HOST = 'best-daily-astrology-and-horoscope-api.p.rapidapi.com'; // From image

app.post("/horoscope", async (req, res) => {
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

    const rapidApiResponse = await axios.request(options);

    // Send the data received from RapidAPI back to the frontend
    // The horoscope text is in the 'prediction' field
    res.json(rapidApiResponse.data);

  } catch (error) {
    console.error("Error fetching horoscope from Best Astrology API:", error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({ error: "Error fetching horoscope data from Best Astrology API" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend proxy server running on port ${PORT}`));

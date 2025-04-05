// Pointing to the local backend proxy server
const API_BASE_URL = 'http://localhost:5000/horoscope'; // Our backend endpoint

/**
 * Fetches horoscope data via the local backend proxy.
 * @param {string} sign - The zodiac sign (e.g., 'aries').
 * @param {string} day - The day ('yesterday', 'today', 'tomorrow').
 * @returns {Promise<object|null>} - A promise that resolves with the horoscope data or null if an error occurs.
 */
const fetchHoroscopeData = async (sign, day) => {
  if (!sign || !day) {
    console.error('Sign and day are required for fetching horoscope data.');
    return null;
  }

  const url = API_BASE_URL; // Use the backend URL

  try {
    // Send request to our backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // Send JSON data to our backend
        'Content-Type': 'application/json',
      },
      // Send sign and day as JSON in the body
      body: JSON.stringify({ sign, day }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Aztro returns the text in the 'description' field
    return data;
  } catch (error) {
    console.error(`Error fetching ${day}'s horoscope for ${sign}:`, error);
    return null;
  }
};

/**
 * Gets today's horoscope reading for a given sign using the backend proxy (which calls RapidAPI).
 * @param {string} sign - The zodiac sign.
 * @returns {Promise<object>} - An object containing only the 'present' reading.
 */
export const getHoroscopeReadings = async (sign) => {
  // Only fetch 'today' as the backend now calls an API providing only that
  const presentData = await fetchHoroscopeData(sign, 'today'); // Still need to pass 'day' to backend

  // Extract the horoscope text from the 'prediction' field of the response
  return {
    past: null, // No past data from this API
    present: presentData?.prediction || 'Could not retrieve horoscope reading.', // Use 'prediction' field
    future: null, // No future data from this API
    details: presentData // Keep the full details if needed
  };
};

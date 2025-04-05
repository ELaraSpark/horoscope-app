import React, { useState, useEffect } from 'react';
import ZodiacSelector from './components/ZodiacSelector';
import BirthYearInput from './components/BirthYearInput';
import HoroscopeDisplay from './components/HoroscopeDisplay';
import ChineseZodiacDisplay from './components/ChineseZodiacDisplay';
import FlowerDisplay from './components/FlowerDisplay';
import { westernZodiac, getChineseZodiacInfo } from './data/zodiacMappings';
import { getHoroscopeReadings } from './services/horoscopeAPI';
import './App.css'; // We'll add styles later

function App() {
  const [selectedSign, setSelectedSign] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [horoscopeReadings, setHoroscopeReadings] = useState(null);
  const [chineseZodiacInfo, setChineseZodiacInfo] = useState(null);
  const [isLoadingHoroscope, setIsLoadingHoroscope] = useState(false);
  const [apiError, setApiError] = useState(null); // New state for API errors

  // Fetch Western horoscope when selectedSign changes
  useEffect(() => {
    if (selectedSign) {
      setIsLoadingHoroscope(true);
      setHoroscopeReadings(null); // Clear previous readings
      setApiError(null); // Clear previous errors
      getHoroscopeReadings(selectedSign)
        .then(readings => {
          // Check if any reading indicates an issue (based on fallback text)
          if (readings.present === 'Could not retrieve present reading.') {
             throw new Error('Failed to retrieve horoscope data.');
          }
          setHoroscopeReadings(readings);
        })
        .catch(error => {
          console.error("Error fetching horoscope readings:", error);
          setApiError('Sorry, could not fetch horoscope data. Please try again later.');
          setHoroscopeReadings(null); // Ensure readings are cleared on error
        })
        .finally(() => {
          setIsLoadingHoroscope(false);
        });
    } else {
      setHoroscopeReadings(null); // Clear if no sign is selected
      setApiError(null); // Clear errors if sign is deselected
    }
  }, [selectedSign]);

  // Calculate Chinese zodiac when birthYear changes
  useEffect(() => {
    const yearNum = parseInt(birthYear, 10);
    if (birthYear && !isNaN(yearNum)) {
      const info = getChineseZodiacInfo(yearNum);
      setChineseZodiacInfo(info);
    } else {
      setChineseZodiacInfo(null); // Clear if year is invalid or empty
    }
  }, [birthYear]);

  // Get flower info based on selected signs
  const westernFlowerInfo = selectedSign ? westernZodiac[selectedSign] : null;
  const chineseFlowerInfo = chineseZodiacInfo ? { flower: chineseZodiacInfo.flower, image: chineseZodiacInfo.image } : null;


  return (
    <div className="App">
      <h1>Horoscope Finder</h1>

      <div className="input-section">
        <ZodiacSelector
          westernZodiac={westernZodiac}
          selectedSign={selectedSign}
          onSignChange={setSelectedSign}
        />
        <BirthYearInput
          birthYear={birthYear}
          onYearChange={setBirthYear}
        />
      </div>

      <div className="results-section">
        {selectedSign && (
          <div className="western-results">
            {/* Pass apiError state to HoroscopeDisplay */}
            <HoroscopeDisplay
              readings={horoscopeReadings}
              isLoading={isLoadingHoroscope}
              error={apiError}
             />
             {/* Display symbol next to horoscope if available */}
             {westernFlowerInfo?.symbol && <span className="zodiac-symbol-display">{westernFlowerInfo.symbol}</span>}
            <FlowerDisplay flowerInfo={westernFlowerInfo} signType="Western Zodiac" />
          </div>
        )}

        {chineseZodiacInfo && (
           <div className="chinese-results">
             <ChineseZodiacDisplay zodiacInfo={chineseZodiacInfo} />
             {/* Display Chinese flower only if different from Western */}
             {(!westernFlowerInfo || westernFlowerInfo.flower !== chineseFlowerInfo.flower) && (
                <FlowerDisplay flowerInfo={chineseFlowerInfo} signType="Chinese Zodiac" />
             )}
           </div>
        )}
      </div>
    </div>
  );
}

export default App;

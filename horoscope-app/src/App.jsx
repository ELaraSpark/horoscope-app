import React, { useState, useEffect } from 'react';
import ZodiacSelector from './components/ZodiacSelector';
import BirthYearInput from './components/BirthYearInput';
import TarotReadingPage from './components/TarotReadingPage';
import HoroscopeDisplay from './components/HoroscopeDisplay';
import ChineseZodiacDisplay from './components/ChineseZodiacDisplay';
import FlowerDisplay from './components/FlowerDisplay';
import CardHistoryView from './components/CardHistoryView'; // Import the history view
import { westernZodiac, getChineseZodiacInfo } from './data/zodiacMappings';
import { getHoroscopeReadings } from './services/horoscopeAPI';
import { CardHistoryProvider } from './context/CardHistoryContext'; // Import the provider
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('horoscope'); // 'horoscope', 'tarot', or 'history'
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


  const renderHoroscopeView = () => (
    <>
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
    </>
  );

  return (
    <CardHistoryProvider> {/* Wrap the entire app content */}
      <div className="App">
        <h1>
          {currentView === 'horoscope' && 'Horoscope Finder'}
          {currentView === 'tarot' && 'Tarot Reading'}
          {currentView === 'history' && 'Reading History'}
        </h1>

      {/* Navigation Buttons */}
      <div className="navigation-buttons" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentView('horoscope')}
          disabled={currentView === 'horoscope'}
          style={{ marginRight: '10px' }}
        >
          View Horoscopes
        </button>
        <button
          onClick={() => setCurrentView('tarot')}
          disabled={currentView === 'tarot'}
          style={{ marginRight: '10px' }}
        >
          Get Tarot Reading
        </button>
        <button
          onClick={() => setCurrentView('history')}
          disabled={currentView === 'history'}
        >
          View History
        </button>
      </div>

      {/* Conditional Rendering based on view */}
      {currentView === 'horoscope' && renderHoroscopeView()}
      {currentView === 'tarot' && <TarotReadingPage />}
      {currentView === 'history' && <CardHistoryView />}

      </div>
    </CardHistoryProvider> /* Close the provider */
  );
}

export default App;

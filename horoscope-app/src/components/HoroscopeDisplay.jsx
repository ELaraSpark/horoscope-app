import React from 'react';

function HoroscopeDisplay({ readings, isLoading, error }) { // Added error prop
  // Display error message if present
  if (error) {
    return <div className="horoscope-display error">Error: {error}</div>;
  }

  // Display loading message
  if (isLoading) {
    return <div className="horoscope-display loading">Loading horoscope...</div>;
  }

  // Don't render anything if there are no readings and no error/loading
  if (!readings || (!readings.past && !readings.present && !readings.future)) {
    return null;
  }

  // Render readings if available and no error/loading
  // Updated again for "Best Daily..." API (only provides 'present')
  return (
    <div className="horoscope-display">
      <h2>Today's Horoscope</h2> {/* Title for single reading */}
      {/* Removed Past section */}
      <div className="reading-section">
        {/* Removed heading for Present as it's the only one */}
        <p>{readings.present}</p>
      </div>
      {/* Removed Future section */}
    </div>
  );
}

export default HoroscopeDisplay;

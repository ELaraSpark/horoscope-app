import React from 'react';

function ZodiacSelector({ westernZodiac, selectedSign, onSignChange }) {
  return (
    <div className="selector-container">
      <label htmlFor="zodiac-select">Select Your Zodiac Sign:</label>
      <select
        id="zodiac-select"
        value={selectedSign}
        onChange={(e) => onSignChange(e.target.value)}
      >
        <option value="">-- Select Sign --</option>
        {/* Updated to include the symbol */}
        {Object.entries(westernZodiac).map(([key, { name, symbol }]) => (
          <option key={key} value={key}>
            {symbol} {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ZodiacSelector;

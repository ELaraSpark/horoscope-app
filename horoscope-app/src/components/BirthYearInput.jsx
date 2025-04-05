import React from 'react';

function BirthYearInput({ birthYear, onYearChange }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="input-container">
      <label htmlFor="birth-year-input">Enter Your Birth Year:</label>
      <input
        type="number"
        id="birth-year-input"
        value={birthYear}
        onChange={(e) => onYearChange(e.target.value)}
        placeholder="e.g., 1990"
        min="1900" // Based on Chinese Zodiac calculation range
        max={currentYear} // Cannot be born in the future
      />
    </div>
  );
}

export default BirthYearInput;

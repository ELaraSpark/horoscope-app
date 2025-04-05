import React from 'react';

function ChineseZodiacDisplay({ zodiacInfo }) {
  if (!zodiacInfo) {
    return null; // Don't render if no info is available
  }

  return (
    <div className="chinese-zodiac-display">
      <h2>Chinese Zodiac</h2>
      <p>
        Your sign is the <strong>{zodiacInfo.sign}</strong>.
      </p>
      <p>
        Associated Trait: <strong>{zodiacInfo.trait}</strong>
      </p>
      {/* We will add the flower display separately */}
    </div>
  );
}

export default ChineseZodiacDisplay;

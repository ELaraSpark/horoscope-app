import React from 'react';
import PropTypes from 'prop-types';
import { getCardBackImage } from '../data/tarotCards'; // Helper to get card back path

// Basic styling for the card
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  margin: '5px',
  width: '100px', // Adjust as needed
  height: '150px', // Adjust as needed
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  cursor: 'pointer', // Add pointer cursor to indicate clickability
  userSelect: 'none', // Prevent text selection on click
};

const cardImageStyle = {
  maxWidth: '90%',
  maxHeight: '70%', // Leave space for name if shown
  objectFit: 'contain', // Scale image nicely
  marginBottom: '5px',
};

const cardNameStyle = {
  fontSize: '0.8em',
  fontWeight: 'bold',
  marginTop: 'auto', // Push name to bottom if space allows
};

function TarotCardDisplay({ card, isRevealed, onClick, positionIndex }) {
  const cardBackSrc = getCardBackImage();

  // Determine image source and alt text based on revealed state
  const imageSrc = isRevealed ? card?.image : cardBackSrc;
  const altText = isRevealed ? `Card: ${card?.name}` : 'Card Back';
  const displayName = isRevealed ? card?.name : '';

  // Handle potential case where card data might be missing temporarily
  if (!isRevealed && !cardBackSrc) {
    return <div style={cardStyle}>Loading back...</div>;
  }
  if (isRevealed && !card) {
     return <div style={cardStyle}>Loading card...</div>;
  }

  const handleClick = () => {
    // Only call onClick if it's provided and the card has data (or is the back)
    if (onClick && (card || !isRevealed)) {
      onClick(positionIndex);
    }
  };

  return (
    // Attach onClick handler to the main div
    <div style={cardStyle} title={altText} onClick={handleClick}>
      <img
        src={imageSrc}
        alt={altText}
        style={cardImageStyle}
        // Add error handling for broken image links
        onError={(e) => { e.target.onerror = null; e.target.src = cardBackSrc; e.target.alt="Image not found"; }}
      />
      {isRevealed && <div style={cardNameStyle}>{displayName}</div>}
    </div>
  );
}

TarotCardDisplay.propTypes = {
  // 'card' can be null/undefined if not yet revealed or placed
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    uprightMeaning: PropTypes.string, // Add meaning if needed directly here later
    // other properties from tarotCards.js can be added here if needed
  }),
  isRevealed: PropTypes.bool.isRequired,
  onClick: PropTypes.func, // Function to call when clicked
  positionIndex: PropTypes.number, // Index of the card in the spread
};

// Add defaultProps for the new props
TarotCardDisplay.defaultProps = {
  card: null,
  onClick: null,
  positionIndex: -1, // Use -1 or similar to indicate not set
};

export default TarotCardDisplay;

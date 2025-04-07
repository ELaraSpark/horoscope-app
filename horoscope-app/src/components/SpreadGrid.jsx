import React from 'react';
import PropTypes from 'prop-types';
import TarotCardDisplay from './TarotCardDisplay';
import { positionMeanings } from '../data/positionMeanings'; // To potentially show position meaning on hover/click later

// Basic styling for the grid container
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
  gridTemplateRows: 'repeat(3, auto)',    // 3 rows, height based on content
  gap: '10px', // Spacing between cards
  padding: '20px',
  maxWidth: '400px', // Max width of the grid, adjust as needed
  margin: '20px auto', // Center the grid
  border: '1px dashed #aaa', // Optional border to visualize grid area
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight background tint
};

// Styling for each grid cell (optional, could add position numbers/titles)
const cellStyle = {
  position: 'relative', // For potential absolute positioning of overlays later
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function SpreadGrid({ placedCards, revealedStates, onCardClick }) { // Add onCardClick prop
  // Create an array representing the 9 grid positions
  const gridPositions = Array.from({ length: 9 }, (_, index) => index);

  return (
    <div style={gridStyle}>
      {gridPositions.map((positionIndex) => {
        const card = placedCards[positionIndex]; // Get card data for this position (might be null)
        const isRevealed = revealedStates[positionIndex] || false; // Get revealed state

        return (
          <div key={positionIndex} style={cellStyle} title={`Position ${positionIndex + 1}: ${positionMeanings[positionIndex]}`}>
            {/* Render the card display, passing the card data and revealed state */}
            {/* If no card is placed yet, it might render nothing or a placeholder */}
            <TarotCardDisplay
              card={card} // Pass the specific card object for this position
              isRevealed={isRevealed}
              onClick={onCardClick} // Pass the click handler down
              positionIndex={positionIndex} // Pass the index down
            />
          </div>
        );
      })}
    </div>
  );
}

SpreadGrid.propTypes = {
  // An array/object mapping position index (0-8) to card objects or null
  placedCards: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object), // Could be sparse array or object
    PropTypes.objectOf(PropTypes.object)
  ]).isRequired,
  // An array/object mapping position index (0-8) to boolean revealed state
  revealedStates: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.bool),
    PropTypes.objectOf(PropTypes.bool)
  ]).isRequired,
  // Add prop type for the click handler
  onCardClick: PropTypes.func,
};

// Default props for initial render before cards are placed/revealed
SpreadGrid.defaultProps = {
  placedCards: {},
  revealedStates: {},
  onCardClick: null, // Add default prop
};


export default SpreadGrid;

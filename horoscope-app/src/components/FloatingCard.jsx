import React from 'react';
import PropTypes from 'prop-types';
import TarotCardDisplay from './TarotCardDisplay';

// Styling for the floating card container (positioning, etc.)
const floatingCardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  cursor: 'pointer', // Indicate it's clickable
  // Add perspective for potential 3D flip animations later
  perspective: '1000px',
};

// Basic animation/transition placeholder (can be enhanced with CSS)
const floatingCardStyle = {
  transition: 'transform 0.3s ease-in-out',
  // Add hover effect
  ':hover': {
     transform: 'scale(1.05)',
  }
};


function FloatingCard({ onCardClick, isDrawingComplete }) {

  // Don't render the clickable card if the drawing process is finished
  if (isDrawingComplete) {
    return null;
  }

  return (
    <div
      style={floatingCardContainerStyle}
      onClick={onCardClick}
      title="Click to draw next card"
    >
      <div style={floatingCardStyle}>
        {/* Display the card back using TarotCardDisplay */}
        {/* We don't need specific card data here, just the back */}
        <TarotCardDisplay card={null} isRevealed={false} />
      </div>
    </div>
  );
}

FloatingCard.propTypes = {
  // Function to call when the card is clicked
  onCardClick: PropTypes.func.isRequired,
  // Boolean to indicate if all 9 cards have been drawn/placed
  isDrawingComplete: PropTypes.bool.isRequired,
};

FloatingCard.defaultProps = {
  isDrawingComplete: false,
};

export default FloatingCard;

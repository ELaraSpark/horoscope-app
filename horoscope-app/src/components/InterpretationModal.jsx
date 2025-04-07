import React from 'react';
import PropTypes from 'prop-types';

// Basic inline styles for the modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000, // Ensure it's above other content
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px 30px',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '80vh', // Limit height and allow scrolling if needed
  overflowY: 'auto',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  position: 'relative', // For positioning the close button
  textAlign: 'left',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  color: '#555',
};

const cardImageStyle = {
  maxWidth: '100px', // Smaller image inside modal
  maxHeight: '150px',
  objectFit: 'contain',
  float: 'right', // Float image to the right
  marginLeft: '15px',
  marginBottom: '10px',
  border: '1px solid #eee',
  borderRadius: '4px',
};

function InterpretationModal({ isOpen, onClose, card, positionMeaning }) {
  if (!isOpen || !card) {
    return null; // Don't render anything if not open or no card data
  }

  return (
    <div style={modalOverlayStyle} onClick={onClose}> {/* Close on overlay click */}
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside content */}
        <button style={closeButtonStyle} onClick={onClose} title="Close">
          &times; {/* Simple 'X' character */}
        </button>
        <h3>{`Position: ${positionMeaning}`}</h3>
        <hr style={{ margin: '10px 0' }} />
        {card.image && (
          <img
            src={card.image}
            alt={card.name}
            style={cardImageStyle}
            onError={(e) => { e.target.style.display = 'none'; }} // Hide if image fails
          />
        )}
        <h4>{card.name}</h4>
        <p><strong>Meaning:</strong> {card.uprightMeaning || 'No meaning provided.'}</p>
        {/* Add more details if needed, e.g., reversed meaning, keywords */}
      </div>
    </div>
  );
}

InterpretationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    uprightMeaning: PropTypes.string,
    // Add other card properties if needed
  }),
  positionMeaning: PropTypes.string,
};

InterpretationModal.defaultProps = {
  card: null,
  positionMeaning: 'Unknown Position',
};

export default InterpretationModal;

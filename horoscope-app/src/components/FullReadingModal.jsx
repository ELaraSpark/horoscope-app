import React from 'react';

const FullReadingModal = ({ reading, closeModal }) => {
  if (!reading) {
    return null; // Don't render if no reading is provided
  }

  return (
    // Use CSS classes for styling
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content full-reading-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="modal-close-button">&times;</button>
        <h3>Reading from: {new Date(reading.timestamp).toLocaleString()}</h3>
        <div className="modal-cards-container">
          {reading.revealedCards?.map((card, index) => (
            <div key={index} className="modal-card-detail">
              {/* Clear float after image */}
              <div style={{ overflow: 'hidden' }}>
                 {card.image && <img src={card.image} alt={card.name} className="modal-card-image" />}
                 <p><strong>Position {card.position}: {card.name}</strong></p>
                 <p className="modal-card-interpretation">{card.interpretation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Removed inline style definitions

export default FullReadingModal;

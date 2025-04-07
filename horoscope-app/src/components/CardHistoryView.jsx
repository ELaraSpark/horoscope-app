import React, { useState } from 'react';
import { useCardHistory } from '../context/CardHistoryContext';
import FullReadingModal from './FullReadingModal';

const CardHistoryView = () => {
  // Get clearHistory from context
  const { cardHistory, isLoading, clearHistory } = useCardHistory();
  const [selectedReadingIndex, setSelectedReadingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const viewFullHistory = (index) => {
    setSelectedReadingIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReadingIndex(null);
  };

  const handleClearHistory = () => {
    // Add a confirmation dialog
    if (window.confirm("Are you sure you want to clear your entire reading history? This cannot be undone.")) {
      clearHistory();
    }
  };

  if (isLoading) {
    // Add a class for styling the loading state
    return <div className="loading-message">Loading history...</div>;
  }

  if (!cardHistory || cardHistory.length === 0) {
    // Add a class for styling the empty state
    return <div className="empty-history-message">No past readings found.</div>;
  }

  // Sort history newest first
  const sortedHistory = [...cardHistory].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="card-history-container">
      <h2>Past Readings</h2>
      {/* Add Clear History Button */}
      {cardHistory.length > 0 && (
         <button onClick={handleClearHistory} className="clear-button">
           Clear All History
         </button>
      )}

      {sortedHistory.map((reading, index) => (
        // Use CSS classes instead of inline styles
        <div key={reading.timestamp + '-' + index} className="card-history-item">
          <p className="history-timestamp">{new Date(reading.timestamp).toLocaleString()}</p>
          <div className="history-summary">
            {/* Display first few cards/interpretations as summary */}
            {reading.revealedCards?.slice(0, 3).map((card, i) => (
              <span key={i} className="summary-card">
                <strong>{card.name || `Card ${card.position}`}:</strong> {card.interpretation?.substring(0, 30) || 'N/A'}...
              </span>
            ))}
            {reading.revealedCards?.length > 3 && <span> ...and more</span>}
          </div>
          <button onClick={() => viewFullHistory(sortedHistory.length - 1 - index)} className="view-button">
            View Full Reading
          </button>
           {/* Note: We use sortedHistory.length - 1 - index because we reversed the array for display */}
        </div>
      ))}

      {showModal && selectedReadingIndex !== null && (
        <FullReadingModal
          reading={cardHistory[selectedReadingIndex]} // Use original index for accessing data
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

// Removed inline style definitions

export default CardHistoryView;

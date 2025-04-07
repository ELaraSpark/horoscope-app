import React, { useState, useEffect } from 'react';
import { useCardHistory } from '../context/CardHistoryContext'; // Import the hook
import { tarotCards } from '../data/tarotCards';
import { positionMeanings } from '../data/positionMeanings';
import FloatingCard from './FloatingCard';
import SpreadGrid from './SpreadGrid';
import InterpretationModal from './InterpretationModal'; // Import the new modal component

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleDeck(deck) {
  let shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

function TarotReadingPage() {
  const [drawnCards, setDrawnCards] = useState([]);
  const [placedCards, setPlacedCards] = useState({});
  const [revealedStates, setRevealedStates] = useState({}); // { positionIndex: boolean }
  const [currentStep, setCurrentStep] = useState(0);
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Track selected card for modal
  const [hasHistoryBeenSaved, setHasHistoryBeenSaved] = useState(false); // Track if history is saved for this session
  const { saveCardHistory } = useCardHistory(); // Get the save function from context

  // Shuffle deck and draw 9 cards on component mount
  useEffect(() => {
    const shuffled = shuffleDeck(tarotCards);
    // Ensure we don't try to draw more cards than available in placeholder data
    const numCardsToDraw = Math.min(9, shuffled.length);
    setDrawnCards(shuffled.slice(0, numCardsToDraw));

    // Initialize revealed states to all false for 9 positions
    const initialRevealed = {};
    for (let i = 0; i < 9; i++) {
      initialRevealed[i] = false;
    }

    // Reset state for a new reading
    setPlacedCards({});
    setRevealedStates(initialRevealed); // Start with all cards face down
    setCurrentStep(0);
    setIsDrawingComplete(false);
    setSelectedCardIndex(null);
    setHasHistoryBeenSaved(false); // Reset save status for new reading
  }, []);

  // Effect to save history when all cards are placed and revealed
  useEffect(() => {
    const allCardsPlaced = Object.keys(placedCards).length === 9;
    const allCardsRevealed = Object.values(revealedStates).filter(Boolean).length === 9;

    if (isDrawingComplete && allCardsPlaced && allCardsRevealed && !hasHistoryBeenSaved) {
      // Format the data for saving
      const readingToSave = Object.entries(placedCards).map(([positionIndex, card]) => ({
        position: parseInt(positionIndex, 10) + 1, // Positions are 1-based in the plan
        interpretation: positionMeanings[positionIndex] || 'No interpretation available.',
        name: card.name,
        image: card.image, // Assuming card object has an image property
      }));

      // Sort by position just in case order isn't guaranteed
      readingToSave.sort((a, b) => a.position - b.position);

      saveCardHistory(readingToSave);
      setHasHistoryBeenSaved(true); // Mark as saved for this session
      console.log("Card history saved."); // Optional: log confirmation
    }
  }, [placedCards, revealedStates, isDrawingComplete, hasHistoryBeenSaved, saveCardHistory]);


  // Handle clicking the floating card to draw/place the next card
  const handleCardClick = () => {
    if (currentStep >= drawnCards.length) {
      // Should not happen if FloatingCard is hidden correctly, but safety check
      console.warn("Attempted to draw more cards than available.");
      return;
    }

    const nextCard = drawnCards[currentStep];
    const nextPositionIndex = currentStep;

    // Update placed cards (keep revealed state false initially)
    setPlacedCards(prev => ({ ...prev, [nextPositionIndex]: nextCard }));
    // Revealed state is handled separately now by clicking the grid card

    // Move to the next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    // Check if drawing is complete
    if (nextStep >= 9 || nextStep >= drawnCards.length) {
      setIsDrawingComplete(true);
      // Interpretation is now handled by clicking revealed cards
    }
  };

  // Handle clicking a card in the grid
  const handleGridCardClick = (positionIndex) => {
    if (!isDrawingComplete) return; // Don't allow clicks before drawing is done

    const isCurrentlyRevealed = revealedStates[positionIndex];

    if (!isCurrentlyRevealed) {
      // Reveal the card
      setRevealedStates(prev => ({ ...prev, [positionIndex]: true }));
      setSelectedCardIndex(null); // Don't show modal on first reveal
    } else {
      // Card is already revealed, select it for modal display
      setSelectedCardIndex(positionIndex);
    }
  };

  // Handle closing the interpretation modal
  const handleCloseModal = () => {
    setSelectedCardIndex(null);
  };

  // Handle revealing all cards
  const handleRevealAll = () => {
    if (!isDrawingComplete) return;
    const allRevealed = {};
    for (let i = 0; i < 9; i++) {
      allRevealed[i] = true;
    }
    setRevealedStates(allRevealed);
    setSelectedCardIndex(null); // Close modal if open
  };

  // Get data for the modal
  const selectedData = selectedCardIndex !== null ? {
    card: placedCards[selectedCardIndex],
    positionMeaning: positionMeanings[selectedCardIndex]
  } : null;

  return (
    <div>
      <h2>9-Card Tarot Spread</h2>
      <FloatingCard
        onCardClick={handleCardClick}
        isDrawingComplete={isDrawingComplete}
      />
      <SpreadGrid
        placedCards={placedCards}
        revealedStates={revealedStates}
        onCardClick={handleGridCardClick} // Pass the click handler
      />
      {isDrawingComplete && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleRevealAll}
            className="mt-4 p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700" // Example styling
            style={{ padding: '8px 16px', fontSize: '1em', cursor: 'pointer' }} // Basic inline style fallback
          >
            Reveal All Interpretations
          </button>
        </div>
      )}
      {/* Render the modal */}
      <InterpretationModal
        isOpen={selectedCardIndex !== null}
        onClose={handleCloseModal}
        card={selectedData?.card}
        positionMeaning={selectedData?.positionMeaning}
      />
    </div>
  );
}

export default TarotReadingPage;

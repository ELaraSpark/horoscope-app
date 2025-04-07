import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const CardHistoryContext = createContext();

// Custom hook to use the CardHistory context
export const useCardHistory = () => {
  return useContext(CardHistoryContext);
};

// Create the provider component
export const CardHistoryProvider = ({ children }) => {
  const [cardHistory, setCardHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To handle initial load

  // Load history from localStorage on initial mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('cardHistory');
      if (storedHistory) {
        setCardHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load card history from localStorage:", error);
      // Optionally clear corrupted data
      // localStorage.removeItem('cardHistory');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to save a new reading
  const saveCardHistory = (revealedCards) => {
    if (!revealedCards || revealedCards.length === 0) {
        console.warn("Attempted to save an empty reading.");
        return;
    }

    const newReading = {
      timestamp: new Date().toISOString(),
      // Ensure revealedCards is an array of objects with expected structure
      revealedCards: revealedCards.map(card => ({
        position: card.position,
        interpretation: card.interpretation,
        // Add other relevant card details if needed, e.g., card name, image
        name: card.name || 'Unknown Card', // Example: Include card name
        image: card.image || null,       // Example: Include card image URL
      })),
    };

    setCardHistory(prevHistory => {
      const updatedHistory = [...prevHistory, newReading];
      try {
        localStorage.setItem('cardHistory', JSON.stringify(updatedHistory));
      } catch (error) {
        console.error("Failed to save card history to localStorage:", error);
      }
      return updatedHistory;
    });
  };

  // Function to clear history
  const clearHistory = () => {
    try {
      localStorage.removeItem('cardHistory');
      setCardHistory([]); // Clear state
      console.log("Card history cleared.");
    } catch (error) {
      console.error("Failed to clear card history from localStorage:", error);
    }
  };

  // Value provided to consuming components
  const value = {
    cardHistory,
    saveCardHistory,
    clearHistory, // Add clearHistory to context value
    isLoading,
  };

  return (
    <CardHistoryContext.Provider value={value}>
      {!isLoading && children} {/* Render children only after loading */}
    </CardHistoryContext.Provider>
  );
};

export default CardHistoryContext;

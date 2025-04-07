// horoscope-app/src/data/tarotCards.js

// Placeholder data - Expand this to include all 78 Tarot cards
// Ensure image paths correspond to files placed in /public/assets/cards/
export const tarotCards = [
  {
    id: 0,
    name: "The Fool",
    arcana: "Major",
    suit: null,
    number: 0,
    uprightMeaning: "New beginnings, optimism, trust in the universe, spontaneity, faith, innocence.",
    // Assuming images are in /public/assets/cards/
    image: "/assets/cards/the_fool.jpg"
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "Major",
    suit: null,
    number: 1,
    uprightMeaning: "Manifestation, power, inspired action, resourcefulness, skill, willpower.",
    image: "/assets/cards/the_magician.jpg"
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: "Major",
    suit: null,
    number: 2,
    uprightMeaning: "Intuition, mystery, inner voice, the subconscious, secrets, wisdom.",
    image: "/assets/cards/the_high_priestess.jpg"
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "Major",
    suit: null,
    number: 3,
    uprightMeaning: "Fertility, beauty, nature, abundance, nurturing, femininity.",
    image: "/assets/cards/the_empress.jpg"
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "Major",
    suit: null,
    number: 4,
    uprightMeaning: "Authority, structure, control, fatherhood, stability, leadership.",
    image: "/assets/cards/the_emperor.jpg"
  },
  // --- Add the remaining 73 cards here following the same structure ---
  // Example for a Minor Arcana card:
  /*
  {
    id: 22, // Continue numbering sequentially
    name: "Ace of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 1, // Ace is 1, Page=11, Knight=12, Queen=13, King=14
    uprightMeaning: "Inspiration, new opportunities, growth, potential.",
    image: "/assets/cards/ace_of_wands.jpg"
  },
  */
  // --- Placeholder for card back ---
  // We might not need this in the data array if handled separately in components
  // {
  //   id: 999, // Or some unique identifier
  //   name: "Card Back",
  //   image: "/assets/cards/card_back.jpg"
  // }
];

// Function to get the card back image path (can be used by components)
export const getCardBackImage = () => "/assets/cards/card_back.jpg";

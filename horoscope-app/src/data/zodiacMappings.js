// Added unicode symbols
export const westernZodiac = {
  aries: { name: 'Aries', symbol: '♈', flower: 'Marigold', image: 'marigold.jpg' },
  taurus: { name: 'Taurus', symbol: '♉', flower: 'Rose', image: 'rose.jpg' },
  gemini: { name: 'Gemini', symbol: '♊', flower: 'Lavender', image: 'lavender.jpg' },
  cancer: { name: 'Cancer', symbol: '♋', flower: 'White Rose', image: 'white_rose.jpg' },
  leo: { name: 'Leo', symbol: '♌', flower: 'Sunflower', image: 'sunflower.jpg' },
  virgo: { name: 'Virgo', symbol: '♍', flower: 'Chrysanthemum', image: 'chrysanthemum.jpg' },
  libra: { name: 'Libra', symbol: '♎', flower: 'Bluebell', image: 'bluebell.jpg' },
  scorpio: { name: 'Scorpio', symbol: '♏', flower: 'Dark Red Geranium', image: 'geranium.jpg' },
  sagittarius: { name: 'Sagittarius', symbol: '♐', flower: 'Carnation', image: 'carnation.jpg' },
  capricorn: { name: 'Capricorn', symbol: '♑', flower: 'Pansy', image: 'pansy.jpg' },
  aquarius: { name: 'Aquarius', symbol: '♒', flower: 'Orchid', image: 'orchid.jpg' },
  pisces: { name: 'Pisces', symbol: '♓', flower: 'Water Lily', image: 'water_lily.jpg' },
};

export const chineseZodiac = [
  { sign: 'Monkey', flower: 'Chrysanthemum', trait: 'Smart', image: 'chrysanthemum.jpg' }, // 2016, 2004, 1992, 1980, 1968, 1956, 1944, 1932
  { sign: 'Rooster', flower: 'Gladiolus', trait: 'Independent', image: 'gladiolus.jpg' }, // 2017, 2005, 1993, 1981, 1969, 1957, 1945, 1933
  { sign: 'Dog', flower: 'Rose', trait: 'Loyal', image: 'rose.jpg' }, // 2018, 2006, 1994, 1982, 1970, 1958, 1946, 1934
  { sign: 'Pig', flower: 'Daisy', trait: 'Compassionate', image: 'daisy.jpg' }, // 2019, 2007, 1995, 1983, 1971, 1959, 1947, 1935
  { sign: 'Rat', flower: 'Lily', trait: 'Quick-witted', image: 'lily.jpg' }, // 2020, 2008, 1996, 1984, 1972, 1960, 1948, 1936
  { sign: 'Ox', flower: 'Tulip', trait: 'Diligent', image: 'tulip.jpg' }, // 2021, 2009, 1997, 1985, 1973, 1961, 1949, 1937
  { sign: 'Tiger', flower: 'Calla Lily', trait: 'Brave', image: 'calla_lily.jpg' }, // 2022, 2010, 1998, 1986, 1974, 1962, 1950, 1938
  { sign: 'Rabbit', flower: 'Snapdragon', trait: 'Gentle', image: 'snapdragon.jpg' }, // 2023, 2011, 1999, 1987, 1975, 1963, 1951, 1939
  { sign: 'Dragon', flower: 'Hyacinth', trait: 'Energetic', image: 'hyacinth.jpg' }, // 2024, 2012, 2000, 1988, 1976, 1964, 1952, 1940
  { sign: 'Snake', flower: 'Orchid', trait: 'Enigmatic', image: 'orchid.jpg' }, // 2025, 2013, 2001, 1989, 1977, 1965, 1953, 1941
  { sign: 'Horse', flower: 'Jasmine', trait: 'Active', image: 'jasmine.jpg' }, // 2026, 2014, 2002, 1990, 1978, 1966, 1954, 1942
  { sign: 'Goat', flower: 'Carnation', trait: 'Calm', image: 'carnation.jpg' }, // 2027, 2015, 2003, 1991, 1979, 1967, 1955, 1943
];

export const getChineseZodiacInfo = (year) => {
  if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 10) { // Basic validation
    return null;
  }
  const startYear = 1900; // Year of the Rat
  const index = (year - startYear) % 12;
  // Adjust index because the array starts with Monkey (offset 4 from Rat if Rat is 0)
  // Or more simply, use the modulo result directly with the array order
  // Rat: (year - 1900) % 12 = 0 -> index 4
  // Ox: (year - 1900) % 12 = 1 -> index 5
  // ...
  // Monkey: (year - 1900) % 12 = 8 -> index 0
  // Rooster: (year - 1900) % 12 = 9 -> index 1
  // ...
  // Pig: (year - 1900) % 12 = 11 -> index 3

  // Let's re-order the array to match the cycle starting from Rat for easier calculation
  // Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig
  // Then index = (year - 1900) % 12;

  // Re-calculating based on the provided array order (Monkey first)
  // Year 1980 (Monkey): (1980 - 1900) % 12 = 80 % 12 = 8. We want index 0. Offset = -8 (or +4)
  // Year 1981 (Rooster): (1981 - 1900) % 12 = 81 % 12 = 9. We want index 1. Offset = -8 (or +4)
  // Year 1984 (Rat): (1984 - 1900) % 12 = 84 % 12 = 0. We want index 4. Offset = +4
  // Year 1985 (Ox): (1985 - 1900) % 12 = 85 % 12 = 1. We want index 5. Offset = +4
  const adjustedIndex = (year - 1900 + 4) % 12; // Add 4 to align 1900 (Rat) with index 4
  return chineseZodiac[adjustedIndex];
};

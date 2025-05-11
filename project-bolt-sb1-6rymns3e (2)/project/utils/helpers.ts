/**
 * Generates a unique ID string
 * @returns {string} A unique ID
 */
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Formats a date object into a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Simulates text-to-speech functionality (mock implementation)
 * @param {string} text - Text to be spoken
 * @param {string} language - Language code ('en' or 'hi')
 */
export const speakText = (text: string, language: string = 'en'): void => {
  console.log(`Speaking in ${language}: ${text}`);
  // In a real implementation, this would use a TTS API
};

/**
 * Detects the language of a given text (mock implementation)
 * @param {string} text - Text to analyze
 * @returns {string} Detected language code ('en' or 'hi')
 */
export const detectLanguage = (text: string): 'en' | 'hi' => {
  // This is a very simplified mock implementation
  // A real implementation would use a language detection library
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text) ? 'hi' : 'en';
};
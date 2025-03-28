
import { useState, useCallback, useEffect } from 'react';
import { UserGuess } from '@/types/gameTypes';
import soundManager from '@/utils/sound';

// Names for the bot players
const BOT_PLAYERS = ['Player 1', 'Player 2', 'Player 4'];

export const useGameBots = (
  revealedTiles: boolean[],
  allTilesRevealed: boolean,
  hasCorrectGuess: boolean,
  addUserGuess: (username: string, guess: string, isBot?: boolean, isCorrect?: boolean) => void,
  getCurrentAnswer: () => string,
  onBotCorrectGuess: (answer: string) => void,
) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [botGuessTimeout, setBotGuessTimeout] = useState<NodeJS.Timeout | null>(null);

  // Clear bot timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (botGuessTimeout) {
        clearTimeout(botGuessTimeout);
      }
    };
  }, [botGuessTimeout]);

  // Generate relevant but incorrect guesses based on the actual answer
  const generateRelevantIncorrectGuess = useCallback((correctAnswer: string) => {
    const correctAnswerLower = correctAnswer.toLowerCase();
    
    // Extract key words from the correct answer
    const words = correctAnswerLower.split(' ');
    const keyWords = words.filter(word => word.length > 3 && !['with', 'and', 'the', 'that', 'this', 'from', 'they', 'have'].includes(word));
    
    // Get one random keyword from the answer if available
    const randomKeyword = keyWords.length > 0 ? keyWords[Math.floor(Math.random() * keyWords.length)] : '';
    
    // Generate related but incorrect guesses based on the theme
    if (correctAnswerLower.includes('mountain')) {
      return ["A snowy hill", "A rocky cliff", "Hills with trees"][Math.floor(Math.random() * 3)];
    } else if (correctAnswerLower.includes('beach') || correctAnswerLower.includes('ocean')) {
      return ["A lake with boats", "A coastal view", "A sunny shore"][Math.floor(Math.random() * 3)];
    } else if (correctAnswerLower.includes('forest') || correctAnswerLower.includes('tree')) {
      return ["A park with benches", "A garden with plants", "Woods in autumn"][Math.floor(Math.random() * 3)];
    } else if (correctAnswerLower.includes('animal') || correctAnswerLower.includes('dog') || correctAnswerLower.includes('cat')) {
      return ["A wild animal", "A pet playing", "Some kind of mammal"][Math.floor(Math.random() * 3)];
    } else if (correctAnswerLower.includes('food') || correctAnswerLower.includes('fruit') || correctAnswerLower.includes('cake')) {
      return ["A plate of snacks", "Some kind of dessert", "Food arrangement"][Math.floor(Math.random() * 3)];
    } else if (correctAnswerLower.includes('flower') || correctAnswerLower.includes('garden')) {
      return ["Colorful plants", "A botanical scene", "Nature landscape"][Math.floor(Math.random() * 3)];
    } else if (correctAnswerLower.includes('building') || correctAnswerLower.includes('house')) {
      return ["An architectural structure", "A modern home", "A building with windows"][Math.floor(Math.random() * 3)];
    } else if (randomKeyword) {
      // Use the random keyword to build a related but incorrect guess
      return `Something with ${randomKeyword}`;
    }
    
    // Fallback to generic related guesses
    return [
      "Something similar but not quite it",
      "I can almost see what it is",
      "It looks familiar but I can't tell exactly",
      "Almost the same theme but different"
    ][Math.floor(Math.random() * 4)];
  }, []);

  const startBotGuessing = useCallback((botName: string) => {
    // Clear any existing timeout
    if (botGuessTimeout) {
      clearTimeout(botGuessTimeout);
    }
    
    // Don't start if there's already a correct guess
    if (hasCorrectGuess) return;
    
    // Set streaming flag
    setIsStreaming(true);
    
    // Add typing indicator for this bot
    addUserGuess(botName, "", true);
    
    // Get the correct answer for reference (to make incorrect guesses relevant)
    const correctAnswer = getCurrentAnswer();
    
    // Calculate difficulty based on revealed tiles count
    const revealedCount = revealedTiles.filter(Boolean).length;
    
    // Bots are more likely to guess correctly with more tiles revealed
    // Start at 5% chance with 1 tile, increase by ~5% per additional tile
    const baseChance = 0.03;
    const revealFactor = 0.05;
    const correctChance = Math.min(0.9, baseChance + (revealedCount * revealFactor));
    
    // Randomly decide if this bot will guess correctly based on revealed tiles
    const willGuessCorrectly = Math.random() < correctChance;
    
    // If the bot will guess correctly, they'll do it after some delay
    if (willGuessCorrectly) {
      const correctGuessDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
      
      const timeout = setTimeout(() => {
        // Update the bot's guess to be correct
        addUserGuess(botName, correctAnswer, true, true);
        
        // Notify parent about the correct guess
        onBotCorrectGuess(correctAnswer);
        
        // Play correct sound
        soundManager.play('correct');
        
        // Add celebratory sound effect with a slight delay
        setTimeout(() => soundManager.play('win'), 300);
        
        setBotGuessTimeout(null);
      }, correctGuessDelay);
      
      setBotGuessTimeout(timeout);
    } else {
      // Bot will guess incorrectly with a related guess
      const incorrectGuessDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
      
      const timeout = setTimeout(() => {
        // Generate a relevant but incorrect guess
        const relevantIncorrectGuess = generateRelevantIncorrectGuess(correctAnswer);
        
        // Update the bot's guess
        addUserGuess(botName, relevantIncorrectGuess, true, false);
        
        setIsStreaming(false);
        setBotGuessTimeout(null);
      }, incorrectGuessDelay);
      
      setBotGuessTimeout(timeout);
    }
  }, [botGuessTimeout, hasCorrectGuess, addUserGuess, getCurrentAnswer, onBotCorrectGuess, generateRelevantIncorrectGuess, revealedTiles]);

  // Trigger bot guessing based on revealed tiles
  const checkAndTriggerBots = useCallback((userGuesses: UserGuess[]) => {
    // Count how many tiles are revealed
    const revealedCount = revealedTiles.filter(Boolean).length;
    
    // Don't trigger bots if no tiles are revealed or if there's already a correct guess
    if (revealedCount === 0 || allTilesRevealed || hasCorrectGuess) return;
    
    // First bot starts guessing after 1 tile is revealed
    if (revealedCount === 1 && !userGuesses.some(g => g.username === BOT_PLAYERS[0])) {
      startBotGuessing(BOT_PLAYERS[0]);
    }
    
    // Second bot starts guessing after 3 tiles are revealed
    if (revealedCount === 3 && !userGuesses.some(g => g.username === BOT_PLAYERS[1])) {
      startBotGuessing(BOT_PLAYERS[1]);
    }
    
    // Third bot starts guessing after 5 tiles are revealed
    if (revealedCount === 5 && !userGuesses.some(g => g.username === BOT_PLAYERS[2])) {
      startBotGuessing(BOT_PLAYERS[2]);
    }
  }, [revealedTiles, allTilesRevealed, hasCorrectGuess, startBotGuessing]);

  return {
    isStreaming,
    setIsStreaming,
    checkAndTriggerBots,
    clearBotTimeout: () => {
      if (botGuessTimeout) {
        clearTimeout(botGuessTimeout);
        setBotGuessTimeout(null);
      }
    }
  };
};

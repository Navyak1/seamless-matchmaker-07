
import { useState, useCallback, useEffect } from 'react';
import { UserGuess } from '@/types/gameTypes';
import soundManager from '@/utils/sound';

// Names for the bot players
const BOT_PLAYERS = ['Player 1', 'Player 2', 'Player 4'];

// Random incorrect guesses for bots
const RANDOM_INCORRECT_GUESSES = [
  "A dog", "A mountain", "A tree", "A house", "A car", "A flower", "A bird", 
  "A city", "A cat", "A beach", "A person", "A robot", "A cloud", "A river", 
  "A planet", "An animal", "A building", "A rainbow", "Fish", "Stars",
];

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
    
    // Randomly decide if this bot will guess correctly (10% chance, reduced from 20%)
    const willGuessCorrectly = Math.random() < 0.1;
    
    // If the bot will guess correctly, they'll do it after some delay
    if (willGuessCorrectly) {
      const correctGuessDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
      
      const timeout = setTimeout(() => {
        // Get the correct answer
        const answer = getCurrentAnswer();
        
        // Update the bot's guess to be correct
        addUserGuess(botName, answer, true, true);
        
        // Notify parent about the correct guess
        onBotCorrectGuess(answer);
        
        // Play correct sound
        soundManager.play('correct');
        
        // Add celebratory sound effect with a slight delay
        setTimeout(() => soundManager.play('win'), 300);
        
        setBotGuessTimeout(null);
      }, correctGuessDelay);
      
      setBotGuessTimeout(timeout);
    } else {
      // Bot will guess incorrectly
      const incorrectGuessDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
      
      const timeout = setTimeout(() => {
        // Get a random incorrect guess
        const randomGuess = RANDOM_INCORRECT_GUESSES[Math.floor(Math.random() * RANDOM_INCORRECT_GUESSES.length)];
        
        // Update the bot's guess
        addUserGuess(botName, randomGuess, true, false);
        
        setIsStreaming(false);
        setBotGuessTimeout(null);
      }, incorrectGuessDelay);
      
      setBotGuessTimeout(timeout);
    }
  }, [botGuessTimeout, hasCorrectGuess, addUserGuess, getCurrentAnswer, onBotCorrectGuess]);

  // Trigger bot guessing based on revealed tiles
  const checkAndTriggerBots = useCallback((userGuesses: UserGuess[]) => {
    // Count how many tiles are revealed
    const revealedCount = revealedTiles.filter(Boolean).length;
    
    // Don't trigger bots if all tiles are revealed or if there's already a correct guess
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


import { useState, useCallback, useEffect } from 'react';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';
import { useGameTimer } from './useGameTimer';
import { useGameImages } from './useGameImages';
import { useGameTiles } from './useGameTiles';
import { UseGameStateReturn, UserGuess } from '@/types/gameTypes';

// Names for the bot players
const BOT_PLAYERS = ['Player 1', 'Player 2', 'Player 4'];

// Random incorrect guesses for bots
const RANDOM_INCORRECT_GUESSES = [
  "A dog",
  "A mountain",
  "A tree",
  "A house",
  "A car",
  "A flower",
  "A bird",
  "A city",
  "A cat",
  "A beach",
  "A person",
  "A robot",
  "A cloud",
  "A river",
  "A planet",
  "An animal",
  "A building",
  "A rainbow",
  "Fish",
  "Stars",
];

export const useGameState = (): UseGameStateReturn => {
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isWinner, setIsWinner] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userGuesses, setUserGuesses] = useState<UserGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [botGuessTimeout, setBotGuessTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hasCorrectGuess, setHasCorrectGuess] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const endGame = useCallback((playerWins: boolean = true) => {
    // Cleanup any pending timeouts
    if (botGuessTimeout) {
      clearTimeout(botGuessTimeout);
      setBotGuessTimeout(null);
    }
    
    setIsWinner(playerWins);
    
    // Show result announcement
    if (playerWins) {
      soundManager.play('win');
      soundManager.play('fireworks');
    } else {
      soundManager.play('lose');
    }
    setShowWinner(true);
  }, [botGuessTimeout]);

  const { timeLeft } = useGameTimer(60, () => endGame(score >= 30));

  const {
    generatedImages,
    currentImageIndex,
    isLoading,
    totalImagesPlayed,
    generateInitialImages,
    getCurrentImage,
    getCurrentAnswer,
    moveToNextImage,
    setTotalImagesPlayed
  } = useGameImages();

  const {
    revealedTiles,
    allTilesRevealed,
    handleTileClick,
    revealRandomTile: originalRevealRandomTile,
    revealAllTiles: originalRevealAllTiles,
    resetTiles
  } = useGameTiles();

  // Generate initial set of images when the component mounts
  useEffect(() => {
    generateInitialImages();
  }, [generateInitialImages]);

  // Start bot guessing when tiles are revealed
  useEffect(() => {
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
  }, [revealedTiles, allTilesRevealed, hasCorrectGuess, userGuesses]);

  const addUserGuess = useCallback((username: string, guess: string, isBot: boolean = false, isCorrect: boolean = false) => {
    const newGuess: UserGuess = {
      username,
      guess,
      timestamp: Date.now(),
      isBot,
      isTyping: isBot ? true : false,
      isCorrect
    };
    
    setUserGuesses(prev => [...prev, newGuess]);
    
    // If it's a bot and is typing, simulate the typing and then reveal the guess
    if (isBot && newGuess.isTyping) {
      const typingTime = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
      
      const timeout = setTimeout(() => {
        setUserGuesses(prev => 
          prev.map(g => 
            g.username === username && g.timestamp === newGuess.timestamp
              ? { ...g, isTyping: false }
              : g
          )
        );
      }, typingTime);
      
      setBotGuessTimeout(timeout);
    }
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
    
    // Randomly decide if this bot will guess correctly (20% chance)
    const willGuessCorrectly = Math.random() < 0.2;
    
    // If the bot will guess correctly, they'll do it after some delay
    if (willGuessCorrectly) {
      const correctGuessDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
      
      const timeout = setTimeout(() => {
        // Get the correct answer
        const answer = getCurrentAnswer();
        setCorrectAnswer(answer);
        
        // Update the bot's guess to be correct
        setUserGuesses(prev => 
          prev.map(g => 
            g.username === botName && g.isTyping
              ? { ...g, guess: answer, isTyping: false, isCorrect: true }
              : g
          )
        );
        
        // Set that we have a correct guess
        setHasCorrectGuess(true);
        
        // Play correct sound
        soundManager.play('correct');
        
        // Show answer
        setShowAnswer(true);
        toast.success(`${botName} guessed correctly!`);
        
        // After a delay, move to the next image or end game
        setTimeout(() => {
          // If the player loses, adjust the score if needed
          if (totalImagesPlayed >= 4) {
            // End game with player losing
            endGame(false);
          } else {
            // Move to next image
            moveToNextImage();
            resetTiles();
            setUserGuesses([]);
            setHasCorrectGuess(false);
            setIsStreaming(false);
            setShowAnswer(false);
          }
        }, 3000);
        
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
        setUserGuesses(prev => 
          prev.map(g => 
            g.username === botName && g.isTyping
              ? { ...g, guess: randomGuess, isTyping: false }
              : g
          )
        );
        
        setIsStreaming(false);
        setBotGuessTimeout(null);
      }, incorrectGuessDelay);
      
      setBotGuessTimeout(timeout);
    }
  }, [botGuessTimeout, hasCorrectGuess, addUserGuess, getCurrentAnswer, endGame, totalImagesPlayed, moveToNextImage, resetTiles]);

  const handleGuessSubmit = useCallback(() => {
    if (isDisabled || !currentGuess.trim()) return;
    
    setIsDisabled(true);
    
    // Add the user's guess to the list
    addUserGuess('You', currentGuess);
    
    // Check if the guess is correct (case insensitive comparison)
    const answer = getCurrentAnswer();
    const correct = currentGuess.toLowerCase().trim() === answer.toLowerCase().trim();
    
    if (correct) {
      // Update this guess to be correct
      setUserGuesses(prev => 
        prev.map(g => 
          g.username === 'You' && g.guess === currentGuess
            ? { ...g, isCorrect: true }
            : g
        )
      );
      
      setHasCorrectGuess(true);
      setCorrectAnswer(answer);
      setShowAnswer(true);
      setScore(prevScore => prevScore + 10);
      soundManager.play('correct');
      toast.success("Correct guess! +10 points");
      
      // Set a timeout to move to next image after toast is visible
      setTimeout(() => {
        moveToNextImage();
        resetTiles();
        setIsDisabled(false);
        setCurrentGuess('');
        setUserGuesses([]);
        setHasCorrectGuess(false);
        setShowAnswer(false);
        
        // End game after all images
        if (totalImagesPlayed >= 4) { // 5 images total (0-indexed)
          endGame(true);
        }
      }, 3000);
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
      setIsDisabled(false);
    }
    
    // Clear the input field after submission
    setCurrentGuess('');
  }, [isDisabled, currentGuess, addUserGuess, getCurrentAnswer, moveToNextImage, resetTiles, totalImagesPlayed, endGame]);

  // Custom wrapper for revealRandomTile to reset streaming status
  const revealRandomTile = useCallback(() => {
    originalRevealRandomTile();
    setIsStreaming(true);
  }, [originalRevealRandomTile]);

  // Wrapper for revealAllTiles with additional logic
  const revealAllTiles = useCallback(() => {
    originalRevealAllTiles();
    
    // If no correct guess yet, show the answer and move to next image after a delay
    if (!hasCorrectGuess) {
      const answer = getCurrentAnswer();
      setCorrectAnswer(answer);
      setShowAnswer(true);
      
      setTimeout(() => {
        moveToNextImage();
        resetTiles();
        setUserGuesses([]);
        setHasCorrectGuess(false);
        setIsStreaming(false);
        setShowAnswer(false);
        
        // End game after all images
        if (totalImagesPlayed >= 4) { // 5 images total (0-indexed)
          endGame(score >= 30);
        }
      }, 5000); // Increased delay to give users time to see the answer
    }
  }, [originalRevealAllTiles, hasCorrectGuess, getCurrentAnswer, moveToNextImage, resetTiles, totalImagesPlayed, endGame, score]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  }, [isMuted]);

  return {
    score,
    timeLeft,
    revealedTiles,
    allTilesRevealed,
    isMuted,
    showWinner,
    isWinner,
    totalImagesPlayed,
    isDisabled,
    isLoading,
    generatedImages,
    currentImageIndex,
    userGuesses,
    currentGuess,
    isStreaming,
    correctAnswer,
    showAnswer,
    getCurrentImage,
    getCurrentAnswer,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    handleGuessSubmit,
    setCurrentGuess,
    addUserGuess,
    endGame,
    toggleMute
  };
};

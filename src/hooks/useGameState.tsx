
import { useState, useCallback, useEffect } from 'react';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';
import { useGameTimer } from './useGameTimer';
import { useGameImages } from './useGameImages';
import { useGameTiles } from './useGameTiles';
import { useGameBots } from './useGameBots';
import { useGameAnswers } from './useGameAnswers';
import { UseGameStateReturn, UserGuess } from '@/types/gameTypes';

export const useGameState = (): UseGameStateReturn => {
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isWinner, setIsWinner] = useState(true);
  const [userGuesses, setUserGuesses] = useState<UserGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const endGame = useCallback((playerWins: boolean = true) => {
    setIsWinner(playerWins);
    
    // Show result announcement
    if (playerWins) {
      soundManager.play('win');
      soundManager.play('fireworks');
    } else {
      soundManager.play('lose');
    }
    setShowWinner(true);
  }, []);

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

  const {
    hasCorrectGuess,
    showAnswer,
    correctAnswer,
    isDisabled,
    setIsDisabled,
    handleBotCorrectGuess,
    handlePlayerCorrectGuess,
    revealAnswer
  } = useGameAnswers(
    moveToNextImage,
    resetTiles,
    setUserGuesses,
    totalImagesPlayed,
    endGame
  );

  // Add a user guess to the list
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
      
      setTimeout(() => {
        setUserGuesses(prev => 
          prev.map(g => 
            g.username === username && g.timestamp === newGuess.timestamp
              ? { ...g, isTyping: false }
              : g
          )
        );
      }, typingTime);
    }
  }, []);

  const {
    isStreaming,
    checkAndTriggerBots,
    clearBotTimeout
  } = useGameBots(
    revealedTiles,
    allTilesRevealed,
    hasCorrectGuess,
    addUserGuess,
    getCurrentAnswer,
    handleBotCorrectGuess
  );

  // Generate initial set of images when the component mounts
  useEffect(() => {
    generateInitialImages();
  }, [generateInitialImages]);

  // Start bot guessing when tiles are revealed
  useEffect(() => {
    checkAndTriggerBots(userGuesses);
  }, [revealedTiles, allTilesRevealed, hasCorrectGuess, userGuesses, checkAndTriggerBots]);

  // Handle user guess submission
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
      
      const updateScore = () => setScore(prevScore => prevScore + 10);
      handlePlayerCorrectGuess(answer, updateScore);
      soundManager.play('correct');
      toast.success("Correct guess! +10 points");
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
      setIsDisabled(false);
    }
    
    // Clear the input field after submission
    setCurrentGuess('');
  }, [isDisabled, currentGuess, addUserGuess, getCurrentAnswer, handlePlayerCorrectGuess]);

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
      revealAnswer(answer);
    }
  }, [originalRevealAllTiles, hasCorrectGuess, getCurrentAnswer, revealAnswer]);

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

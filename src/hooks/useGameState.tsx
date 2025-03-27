import { useState, useCallback, useEffect } from 'react';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';
import { useGameTimer } from './useGameTimer';
import { useGameImages } from './useGameImages';
import { useGameTiles } from './useGameTiles';
import { UseGameStateReturn, UserGuess } from '@/types/gameTypes';

export const useGameState = (): UseGameStateReturn => {
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isWinner, setIsWinner] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userGuesses, setUserGuesses] = useState<UserGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const endGame = useCallback(() => {
    // Determine if player wins or loses based on score
    // If they have at least 30 points (3 correct answers), they win
    const playerWins = score >= 30;
    setIsWinner(playerWins);
    
    // Show result announcement
    if (playerWins) {
      soundManager.play('win');
      soundManager.play('fireworks');
    } else {
      soundManager.play('lose');
    }
    setShowWinner(true);
  }, [score]);

  const { timeLeft } = useGameTimer(60, endGame);

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
    revealRandomTile,
    revealAllTiles,
    resetTiles
  } = useGameTiles();

  // Generate initial set of images when the component mounts
  useEffect(() => {
    generateInitialImages();
  }, [generateInitialImages]);

  const addUserGuess = useCallback((username: string, guess: string) => {
    const newGuess: UserGuess = {
      username,
      guess,
      timestamp: Date.now()
    };
    setUserGuesses(prev => [...prev, newGuess]);
  }, []);

  const handleGuessSubmit = useCallback(() => {
    if (isDisabled || !currentGuess.trim()) return;
    
    setIsDisabled(true);
    
    // Add the user's guess to the list
    addUserGuess('You', currentGuess);
    
    // Check if the guess is correct (case insensitive comparison)
    const correct = currentGuess.toLowerCase().trim() === getCurrentAnswer().toLowerCase().trim();
    
    if (correct) {
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
        
        // End game after all images
        if (totalImagesPlayed >= 4) { // 5 images total (0-indexed)
          endGame();
        }
      }, 1500);
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
      setIsDisabled(false);
    }
    
    // Clear the input field after submission
    setCurrentGuess('');
  }, [isDisabled, currentGuess, addUserGuess, getCurrentAnswer, moveToNextImage, resetTiles, totalImagesPlayed, endGame]);

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


import { useState, useCallback, useEffect } from 'react';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';
import { useGameTimer } from './useGameTimer';
import { useGameImages } from './useGameImages';
import { useGameTiles } from './useGameTiles';
import { UseGameStateReturn } from '@/types/gameTypes';

export const useGameState = (): UseGameStateReturn => {
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const endGame = useCallback(() => {
    // Show winner announcement
    soundManager.play('win');
    setShowWinner(true);
  }, []);

  const { timeLeft } = useGameTimer(60, endGame);

  const {
    generatedImages,
    currentImageIndex,
    isLoading,
    totalImagesPlayed,
    generateInitialImages,
    getCurrentImage,
    getCurrentOptions,
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

  const handleGuess = useCallback((option: string) => {
    if (isDisabled) return;
    
    setIsDisabled(true);
    const correct = option === getCurrentAnswer();
    
    if (correct) {
      setScore(prevScore => prevScore + 10);
      soundManager.play('correct');
      toast.success("Correct guess! +10 points");
      
      // Set a timeout to move to next image after toast is visible
      setTimeout(() => {
        moveToNextImage();
        resetTiles();
        setIsDisabled(false);
        
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
  }, [isDisabled, getCurrentAnswer, moveToNextImage, resetTiles, totalImagesPlayed, endGame]);

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
    totalImagesPlayed,
    isDisabled,
    isLoading,
    generatedImages,
    currentImageIndex,
    getCurrentImage,
    getCurrentOptions,
    getCurrentAnswer,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    handleGuess,
    endGame,
    toggleMute
  };
};

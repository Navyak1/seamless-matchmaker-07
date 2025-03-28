
import { useState, useCallback } from 'react';
import { UserGuess } from '@/types/gameTypes';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';

export const useGameAnswers = (
  moveToNextImage: () => void,
  resetTiles: () => void,
  setTotalImagesPlayed: React.Dispatch<React.SetStateAction<number>>,
  endGame: (playerWins: boolean) => void,
) => {
  const [hasCorrectGuess, setHasCorrectGuess] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCorrectGuess = useCallback((answer: string, isPlayer: boolean = false, revealedCount: number = 0) => {
    setHasCorrectGuess(true);
    setCorrectAnswer(answer);
    setShowAnswer(true);
    setIsDisabled(true);
    
    // Show the correct answer and play sound
    soundManager.play('correct');
    toast.success(`Correct! The answer is: ${answer}`);
  }, []);

  const handleBotCorrectGuess = useCallback((answer: string, revealedCount: number = 0) => {
    handleCorrectGuess(answer, false, revealedCount);
  }, [handleCorrectGuess]);

  const handlePlayerCorrectGuess = useCallback((answer: string, updateScore: (revealedCount: number) => void, revealedCount: number = 0) => {
    updateScore(revealedCount); // Update player score based on revealed tile count
    handleCorrectGuess(answer, true, revealedCount);
  }, [handleCorrectGuess]);

  const revealAnswer = useCallback((answer: string) => {
    if (!hasCorrectGuess) {
      setCorrectAnswer(answer);
      setShowAnswer(true);
      setIsDisabled(true);
      
      // Display the correct answer with 100% accuracy
      toast.info(`The correct answer is: ${answer}`, {
        duration: 4000
      });
    }
  }, [hasCorrectGuess]);

  const proceedToNextImage = useCallback(() => {
    moveToNextImage();
    resetTiles();
    setHasCorrectGuess(false);
    setShowAnswer(false);
    setIsDisabled(false);
    
    // End game after all images
    setTotalImagesPlayed(prev => {
      // Check if this was the last image
      if (prev >= 4) { // 5 images total (0-indexed)
        endGame(hasCorrectGuess); // Pass if the player got the last one right
      }
      return prev + 1;
    });
  }, [moveToNextImage, resetTiles, setTotalImagesPlayed, endGame, hasCorrectGuess]);

  return {
    hasCorrectGuess,
    showAnswer,
    correctAnswer,
    isDisabled,
    setIsDisabled,
    handleBotCorrectGuess,
    handlePlayerCorrectGuess,
    revealAnswer,
    proceedToNextImage
  };
};

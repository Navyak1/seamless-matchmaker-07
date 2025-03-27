
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

  const handleCorrectGuess = useCallback((answer: string, isPlayer: boolean = false) => {
    setHasCorrectGuess(true);
    setCorrectAnswer(answer);
    setShowAnswer(true);
    
    // Add delay before moving to next image
    setTimeout(() => {
      moveToNextImage();
      resetTiles();
      setHasCorrectGuess(false);
      setShowAnswer(false);
      setIsDisabled(false);
      
      // End game after all images
      setTotalImagesPlayed(prev => {
        // Check if this was the last image
        if (prev >= 4) { // 5 images total (0-indexed)
          endGame(isPlayer);
        }
        return prev + 1;
      });
    }, 3000);
  }, [moveToNextImage, resetTiles, setTotalImagesPlayed, endGame]);

  const handleBotCorrectGuess = useCallback((answer: string) => {
    handleCorrectGuess(answer, false);
  }, [handleCorrectGuess]);

  const handlePlayerCorrectGuess = useCallback((answer: string, updateScore: () => void) => {
    updateScore(); // Update player score
    handleCorrectGuess(answer, true);
  }, [handleCorrectGuess]);

  const revealAnswer = useCallback((answer: string) => {
    if (!hasCorrectGuess) {
      setCorrectAnswer(answer);
      setShowAnswer(true);
      
      setTimeout(() => {
        moveToNextImage();
        resetTiles();
        setHasCorrectGuess(false);
        setShowAnswer(false);
        
        // End game after all images
        setTotalImagesPlayed(prev => {
          // Check if this was the last image
          if (prev >= 4) { // 5 images total (0-indexed)
            endGame(false);
          }
          return prev + 1;
        });
      }, 5000); // Increased delay to give users time to see the answer
    }
  }, [hasCorrectGuess, moveToNextImage, resetTiles, setTotalImagesPlayed, endGame]);

  return {
    hasCorrectGuess,
    showAnswer,
    correctAnswer,
    isDisabled,
    setIsDisabled,
    handleBotCorrectGuess,
    handlePlayerCorrectGuess,
    revealAnswer
  };
};

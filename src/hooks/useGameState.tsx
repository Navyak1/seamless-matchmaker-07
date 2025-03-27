
import { useState, useCallback, useEffect } from 'react';
import { imageCategories, placeholderImages } from '@/data/imageCategories';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [revealedTiles, setRevealedTiles] = useState(Array(9).fill(false));
  const [allTilesRevealed, setAllTilesRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [totalImagesPlayed, setTotalImagesPlayed] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  // Start the timer when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Game over when time runs out
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getCurrentImage = useCallback(() => {
    try {
      return imageCategories[currentCategory].items[currentItem].src;
    } catch (e) {
      // Fallback to placeholder images if real ones aren't available
      return placeholderImages[currentItem % placeholderImages.length];
    }
  }, [currentCategory, currentItem]);

  const getCurrentOptions = useCallback(() => {
    try {
      return imageCategories[currentCategory].items[currentItem].options;
    } catch (e) {
      return ['Mountain', 'Ocean', 'Forest', 'Desert'];
    }
  }, [currentCategory, currentItem]);

  const getCurrentAnswer = useCallback(() => {
    try {
      return imageCategories[currentCategory].items[currentItem].answer;
    } catch (e) {
      return getCurrentOptions()[0];
    }
  }, [currentCategory, currentItem, getCurrentOptions]);

  const handleTileClick = (index: number) => {
    if (revealedTiles[index] || allTilesRevealed) return;
    
    soundManager.play('reveal');
    
    const newRevealedTiles = [...revealedTiles];
    newRevealedTiles[index] = true;
    setRevealedTiles(newRevealedTiles);
    
    // Check if all tiles are revealed
    if (newRevealedTiles.filter(Boolean).length === 9) {
      setAllTilesRevealed(true);
    }
  };

  const revealRandomTile = () => {
    // Get indices of unrevealed tiles
    const unrevealedIndices = revealedTiles
      .map((revealed, index) => revealed ? -1 : index)
      .filter(index => index !== -1);
    
    if (unrevealedIndices.length === 0) return;
    
    // Reveal a random tile
    const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
    handleTileClick(randomIndex);
  };

  const revealAllTiles = () => {
    setRevealedTiles(Array(9).fill(true));
    setAllTilesRevealed(true);
  };

  const handleGuess = (option: string) => {
    if (isDisabled) return;
    
    setIsDisabled(true);
    const correct = option === getCurrentAnswer();
    
    if (correct) {
      setScore(score + 10);
      soundManager.play('correct');
      toast.success("Correct guess! +10 points");
      
      // Set a timeout to move to next image after toast is visible
      setTimeout(() => {
        moveToNextImage();
        setIsDisabled(false);
      }, 1500);
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
      setIsDisabled(false);
    }
  };

  const moveToNextImage = () => {
    setTotalImagesPlayed(totalImagesPlayed + 1);
    
    // End game after 5 images
    if (totalImagesPlayed >= 4) {
      endGame();
      return;
    }
    
    // Determine next category and item
    let nextCategory = currentCategory;
    let nextItem = currentItem + 1;
    
    // If we've gone through all items in this category, move to next category
    if (nextItem >= imageCategories[nextCategory].items.length) {
      nextItem = 0;
      nextCategory = (nextCategory + 1) % imageCategories.length;
    }
    
    setCurrentCategory(nextCategory);
    setCurrentItem(nextItem);
    setRevealedTiles(Array(9).fill(false));
    setAllTilesRevealed(false);
  };

  const endGame = () => {
    // Show winner announcement
    soundManager.play('win');
    setShowWinner(true);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  };

  return {
    score,
    timeLeft,
    currentCategory,
    currentItem,
    revealedTiles,
    allTilesRevealed,
    isMuted,
    showWinner,
    totalImagesPlayed,
    isDisabled,
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

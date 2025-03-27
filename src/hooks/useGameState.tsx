
import { useState, useCallback, useEffect } from 'react';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';
import { GeneratedImage, imageGenerationService } from '@/utils/imageGenerationService';

// Number of images to generate for each game
const TOTAL_IMAGES_PER_GAME = 5;

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [revealedTiles, setRevealedTiles] = useState(Array(9).fill(false));
  const [allTilesRevealed, setAllTilesRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [totalImagesPlayed, setTotalImagesPlayed] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Generate initial set of images when the component mounts
  useEffect(() => {
    generateInitialImages();
  }, []);
  
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
  
  // Function to generate the initial set of images
  const generateInitialImages = async () => {
    try {
      setIsLoading(true);
      const images = await imageGenerationService.generateRandomImages(TOTAL_IMAGES_PER_GAME);
      setGeneratedImages(images);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to generate initial images:", error);
      toast.error("Failed to generate images. Please refresh the page.");
      setIsLoading(false);
    }
  };

  const getCurrentImage = useCallback(() => {
    if (generatedImages.length === 0) {
      return '';
    }
    return generatedImages[currentImageIndex]?.imageUrl || '';
  }, [generatedImages, currentImageIndex]);

  const getCurrentOptions = useCallback(() => {
    if (generatedImages.length === 0) {
      return ['', '', '', ''];
    }
    
    const correctPrompt = generatedImages[currentImageIndex]?.prompt || '';
    const correctCategory = generatedImages[currentImageIndex]?.category || '';
    
    // Generate fake options based on other images or random options
    const fakeOptions = [];
    
    // Use prompts from other images if available
    for (let i = 0; i < generatedImages.length; i++) {
      if (i !== currentImageIndex && fakeOptions.length < 3) {
        fakeOptions.push(generatedImages[i].prompt);
      }
    }
    
    // Fill remaining options with variations
    while (fakeOptions.length < 3) {
      const randomOption = `${correctCategory} scene ${fakeOptions.length + 1}`;
      if (!fakeOptions.includes(randomOption)) {
        fakeOptions.push(randomOption);
      }
    }
    
    // Shuffle the options and include the correct answer
    const allOptions = [correctPrompt, ...fakeOptions];
    return shuffleArray(allOptions);
  }, [generatedImages, currentImageIndex]);

  const getCurrentAnswer = useCallback(() => {
    if (generatedImages.length === 0) {
      return '';
    }
    return generatedImages[currentImageIndex]?.prompt || '';
  }, [generatedImages, currentImageIndex]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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
    
    // End game after all images
    if (totalImagesPlayed >= TOTAL_IMAGES_PER_GAME - 1) {
      endGame();
      return;
    }
    
    // Move to next image
    setCurrentImageIndex(currentImageIndex + 1);
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
    revealedTiles,
    allTilesRevealed,
    isMuted,
    showWinner,
    totalImagesPlayed,
    isDisabled,
    isLoading,
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


import { useState, useCallback } from 'react';
import { imageGenerationService } from '@/utils/imageGenerationService';
import { GeneratedImage } from '@/types/imageGenerationTypes';
import { toast } from 'sonner';

// Number of images to generate for each game
const TOTAL_IMAGES_PER_GAME = 5;

export const useGameImages = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalImagesPlayed, setTotalImagesPlayed] = useState(0);

  const generateInitialImages = useCallback(async () => {
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
  }, []);

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
    
    // Get the correct prompt as the correct answer
    const correctPrompt = generatedImages[currentImageIndex]?.prompt || '';
    
    // Generate fake options from other images to make the game challenging
    const fakeOptions = [];
    
    // Get all prompts from other images
    const allPrompts = generatedImages.map(img => img.prompt);
    
    // Remove the correct answer from options to avoid duplicates
    const availableOptions = allPrompts.filter(opt => opt !== correctPrompt);
    
    // Randomly select 3 fake options from available options
    while (fakeOptions.length < 3 && availableOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      fakeOptions.push(availableOptions[randomIndex]);
      availableOptions.splice(randomIndex, 1);
    }
    
    // If we don't have enough fake options, add some additional options
    const backupOptions = ["Tree", "Cat", "House", "Car"];
    while (fakeOptions.length < 3) {
      const randomOption = backupOptions[Math.floor(Math.random() * backupOptions.length)];
      if (!fakeOptions.includes(randomOption) && randomOption !== correctPrompt) {
        fakeOptions.push(randomOption);
      }
    }
    
    // Shuffle the options and include the correct answer
    const allAnswerOptions = [correctPrompt, ...fakeOptions];
    return shuffleArray(allAnswerOptions);
  }, [generatedImages, currentImageIndex]);

  const getCurrentAnswer = useCallback(() => {
    if (generatedImages.length === 0) {
      return '';
    }
    // Return the exact prompt used to generate the image - guaranteed to match
    return generatedImages[currentImageIndex]?.prompt || '';
  }, [generatedImages, currentImageIndex]);

  const moveToNextImage = useCallback(() => {
    setCurrentImageIndex(prev => prev + 1);
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return {
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
  };
};


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

  const moveToNextImage = useCallback(() => {
    setTotalImagesPlayed(prev => prev + 1);
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

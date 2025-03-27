
import { toast } from "sonner";
import { randomSubjects, randomCategories, placeholderImages } from "@/data/imageGenerationData";
import { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";

/**
 * Service for generating images through AI
 */
export const imageGenerationService = {
  /**
   * Generate an image based on the provided prompt or randomly
   */
  async generateImage(params: GenerateImageParams = {}): Promise<GeneratedImage> {
    try {
      // Generate a random prompt if none is provided
      const prompt = params.prompt || randomSubjects[Math.floor(Math.random() * randomSubjects.length)];
      
      // Generate a random category if none is provided
      const category = params.category || randomCategories[Math.floor(Math.random() * randomCategories.length)];
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Select a random image from the placeholder images
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      const imageUrl = placeholderImages[randomIndex];
      
      return {
        imageUrl,
        prompt,
        category
      };
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
      throw error;
    }
  },
  
  /**
   * Generate a batch of random images
   */
  async generateRandomImages(count: number): Promise<GeneratedImage[]> {
    const images: GeneratedImage[] = [];
    
    for (let i = 0; i < count; i++) {
      const image = await this.generateImage();
      images.push(image);
    }
    
    return images;
  }
};

// Re-export the types from this file for backward compatibility
export type { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";


import { toast } from "sonner";

// Interface for image generation parameters
export interface GenerateImageParams {
  prompt: string;
  category?: string;
}

// Interface for the generated image result
export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  category: string;
}

/**
 * Service for generating images through AI
 */
export const imageGenerationService = {
  /**
   * Generate an image based on the provided prompt
   */
  async generateImage(params: GenerateImageParams): Promise<GeneratedImage> {
    try {
      // For demonstration purposes, we're using placeholder images
      // In a real implementation, this would make a call to an AI image generation API
      const placeholderImages = [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        'https://images.unsplash.com/photo-1518770660439-4636190af475',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      ];
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Select a random image from the placeholder images
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      const imageUrl = placeholderImages[randomIndex];
      
      toast.success("Generated a new image!");
      
      return {
        imageUrl,
        prompt: params.prompt,
        category: params.category || "Generated"
      };
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
      throw error;
    }
  }
};

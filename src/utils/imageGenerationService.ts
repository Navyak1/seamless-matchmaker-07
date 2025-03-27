
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
      
      // Instead of using random images, use images that match the prompt
      // This ensures that the answer always matches the image content
      const imageIndex = this.getImageIndexForPrompt(prompt);
      const imageUrl = placeholderImages[imageIndex];
      
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
    const usedPrompts = new Set<string>();
    
    for (let i = 0; i < count; i++) {
      // Select a prompt that hasn't been used yet to avoid duplicates
      let prompt;
      do {
        prompt = randomSubjects[Math.floor(Math.random() * randomSubjects.length)];
      } while (usedPrompts.has(prompt) && usedPrompts.size < randomSubjects.length);
      
      usedPrompts.add(prompt);
      
      const image = await this.generateImage({ prompt });
      images.push(image);
    }
    
    return images;
  },

  /**
   * Get an appropriate image index based on the prompt
   * This ensures that the image matches the description
   */
  getImageIndexForPrompt(prompt: string): number {
    const lowerPrompt = prompt.toLowerCase();
    
    // Map prompts to specific image indices
    if (lowerPrompt.includes("fruit") || lowerPrompt.includes("food") || lowerPrompt.includes("cake") || lowerPrompt.includes("ice cream")) {
      return 3; // Index for fruit/food image
    } else if (lowerPrompt.includes("flower") || lowerPrompt.includes("garden") || lowerPrompt.includes("rose") || lowerPrompt.includes("blossom")) {
      return 4; // Index for flower image  
    } else if (lowerPrompt.includes("animal") || lowerPrompt.includes("puppy") || lowerPrompt.includes("elephant") || lowerPrompt.includes("panda")) {
      return 5; // Index for animal image
    } else if (lowerPrompt.includes("colorful") || lowerPrompt.includes("rainbow") || lowerPrompt.includes("bright")) {
      return 6; // Index for colorful image
    } else if (lowerPrompt.includes("computer") || lowerPrompt.includes("laptop") || lowerPrompt.includes("technology")) {
      return 7; // Index for technology image
    } else if (lowerPrompt.includes("toy") || lowerPrompt.includes("blocks") || lowerPrompt.includes("cartoon")) {
      return 8; // Index for toys/cartoon image
    } else if (lowerPrompt.includes("mountain") || lowerPrompt.includes("landscape") || lowerPrompt.includes("nature") || lowerPrompt.includes("forest")) {
      return Math.floor(Math.random() * 3); // First three indices are nature scenes
    }
    
    // If no specific match, return a random index
    return Math.floor(Math.random() * placeholderImages.length);
  }
};

// Re-export the types from this file for backward compatibility
export type { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";

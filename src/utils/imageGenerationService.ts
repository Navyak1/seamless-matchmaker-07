
import { toast } from "sonner";
import { randomSubjects, randomCategories } from "@/data/imageGenerationData";
import { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";

// Store generated images and their associated prompts to maintain consistency
const imageCache = new Map<string, string>();

/**
 * Service for generating images through the Gemini API
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
      
      // Check if this prompt is already in our cache
      if (imageCache.has(prompt)) {
        return {
          imageUrl: imageCache.get(prompt)!,
          prompt,
          category
        };
      }
      
      // Simulate API call with a delay (in a real implementation, this would call the Gemini API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Since we're in a demo environment without actual Gemini API access,
      // we're generating appropriate images based on the prompt keywords
      const imageUrl = this.generateImageUrlFromPrompt(prompt);
      
      // Cache the image URL with its prompt
      imageCache.set(prompt, imageUrl);
      
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
   * Generate an image URL based on the prompt content
   * In a real implementation, this would call the Gemini API
   */
  generateImageUrlFromPrompt(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Create a consistent mapping between prompts and image URLs
    // This ensures that the same prompt always gets the same image
    if (lowerPrompt.includes("cake") || lowerPrompt.includes("dessert") || lowerPrompt.includes("food")) {
      return "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80";
    } else if (lowerPrompt.includes("flower") || lowerPrompt.includes("garden") || lowerPrompt.includes("rose")) {
      return "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else if (lowerPrompt.includes("forest") || lowerPrompt.includes("nature") || lowerPrompt.includes("trees")) {
      return "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else if (lowerPrompt.includes("beach") || lowerPrompt.includes("ocean") || lowerPrompt.includes("sea")) {
      return "https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else if (lowerPrompt.includes("mountain") || lowerPrompt.includes("landscape") || lowerPrompt.includes("peak")) {
      return "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else if (lowerPrompt.includes("city") || lowerPrompt.includes("urban") || lowerPrompt.includes("building")) {
      return "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else if (lowerPrompt.includes("dog") || lowerPrompt.includes("puppy") || lowerPrompt.includes("animal")) {
      return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else if (lowerPrompt.includes("fruit") || lowerPrompt.includes("vegetable") || lowerPrompt.includes("healthy")) {
      return "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    } else {
      // Default image for prompts we don't have a specific match for
      return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
    }
  }
};

// Re-export the types from this file for backward compatibility
export type { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";

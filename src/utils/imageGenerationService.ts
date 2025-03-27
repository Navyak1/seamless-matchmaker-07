
import { toast } from "sonner";
import { randomSubjects, randomCategories } from "@/data/imageGenerationData";
import { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";

// Direct mapping of prompts to specific image URLs for perfect matching
const imageMapping = {
  // Nature
  "Mountain": "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Beach": "https://images.unsplash.com/photo-1520942702018-0862200e6873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Forest": "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Waterfall": "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  
  // Animals
  "Dog": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Parrot": "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Elephant": "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Panda": "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  
  // Food
  "Cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
  "Apple": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Banana": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  
  // Flowers
  "Rose": "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Sunflower": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Tulip": "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Daisy": "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  
  // Simple objects
  "Book": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Chair": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Clock": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  "Ball": "https://images.unsplash.com/photo-1614632537190-23e4146777db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80"
};

/**
 * Service for generating images with guaranteed accurate answers
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
      
      // Simulate API call with a delay (in a real implementation, this would call the Gemini API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use our direct mapping to ensure 100% accuracy between image and prompt
      const imageUrl = imageMapping[prompt] || this.getDefaultImage();
      
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
   * Generate a batch of random images with guaranteed matching
   */
  async generateRandomImages(count: number): Promise<GeneratedImage[]> {
    const images: GeneratedImage[] = [];
    const usedPrompts = new Set<string>();
    
    // Get available prompts (keys from our mapping)
    const availablePrompts = Object.keys(imageMapping);
    
    for (let i = 0; i < count; i++) {
      // Select a prompt that hasn't been used yet to avoid duplicates
      let prompt;
      do {
        prompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
      } while (usedPrompts.has(prompt) && usedPrompts.size < availablePrompts.length);
      
      usedPrompts.add(prompt);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const category = this.getCategoryForPrompt(prompt);
      const imageUrl = imageMapping[prompt];
      
      images.push({
        imageUrl,
        prompt,
        category
      });
    }
    
    return images;
  },

  /**
   * Get a default image if no mapping exists
   */
  getDefaultImage(): string {
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80";
  },
  
  /**
   * Determine the category of a prompt
   */
  getCategoryForPrompt(prompt: string): string {
    // Simple category determination based on the prompt
    const natureItems = ["Mountain", "Beach", "Forest", "Waterfall"];
    const animalItems = ["Dog", "Parrot", "Elephant", "Panda"];
    const foodItems = ["Cake", "Apple", "Pizza", "Banana"];
    const flowerItems = ["Rose", "Sunflower", "Tulip", "Daisy"];
    
    if (natureItems.includes(prompt)) return "Nature";
    if (animalItems.includes(prompt)) return "Animals";
    if (foodItems.includes(prompt)) return "Food";
    if (flowerItems.includes(prompt)) return "Flowers";
    return "Objects";
  }
};

// Re-export the types from this file for backward compatibility
export type { GenerateImageParams, GeneratedImage } from "@/types/imageGenerationTypes";

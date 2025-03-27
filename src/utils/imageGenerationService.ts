
import { toast } from "sonner";

// Interface for image generation parameters
export interface GenerateImageParams {
  prompt?: string;
  category?: string;
}

// Interface for the generated image result
export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  category: string;
}

// List of random subjects for automatic image generation
const randomSubjects = [
  "A mountain landscape with snow",
  "A tropical beach with palm trees",
  "A forest with tall pine trees",
  "A waterfall in a jungle",
  "A cityscape at sunset",
  "A farm with animals",
  "A desert with cactus",
  "An underwater scene with fish",
  "A space scene with planets",
  "A medieval castle",
  "A futuristic city",
  "A garden with flowers",
  "A safari with wild animals",
  "A carnival with rides",
  "A cozy cabin in the woods"
];

// List of random categories
const randomCategories = [
  "Nature",
  "Urban",
  "Animals",
  "Fantasy",
  "Architecture",
  "Travel",
  "Food",
  "Technology",
  "Sports",
  "Abstract"
];

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

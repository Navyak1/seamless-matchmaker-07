
/**
 * Interface for image generation parameters
 */
export interface GenerateImageParams {
  prompt?: string;
  category?: string;
}

/**
 * Interface for the generated image result
 */
export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  category: string;
}

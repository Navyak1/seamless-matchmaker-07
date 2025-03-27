
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { imageGenerationService } from '@/utils/imageGenerationService';
import { GeneratedImage } from '@/types/imageGenerationTypes';
import { toast } from 'sonner';

interface ImageGeneratorProps {
  onImageGenerated: (image: GeneratedImage) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
  onImageGenerated, 
  isGenerating, 
  setIsGenerating 
}) => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate an image");
      return;
    }
    
    // Check if the prompt is a single word
    if (prompt.trim().split(/\s+/).length > 1) {
      toast.error("Please enter only a single word for the prompt");
      return;
    }
    
    // Capitalize the first letter for consistency with our mapping
    const formattedPrompt = prompt.trim().charAt(0).toUpperCase() + prompt.trim().slice(1);
    
    try {
      setIsGenerating(true);
      const generatedImage = await imageGenerationService.generateImage({
        prompt: formattedPrompt,
        category
      });
      
      onImageGenerated(generatedImage);
      // Clear the form after successful generation
      setPrompt('');
      setCategory('');
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Failed to generate image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Generate AI Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            Enter a single word (e.g., Cake, Dog, Mountain):
          </label>
          <Input
            id="prompt"
            placeholder="E.g., Apple, Rose, Chair"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {prompt.trim().split(/\s+/).length > 1 && (
            <p className="text-red-500 text-sm">Please enter only a single word</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category (optional):
          </label>
          <Input
            id="category"
            placeholder="E.g., Nature, Animals, Food"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim() || prompt.trim().split(/\s+/).length > 1}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          {isGenerating ? (
            <>
              <motion.div
                className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageGenerator;

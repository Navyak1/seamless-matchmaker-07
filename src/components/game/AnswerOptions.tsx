
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnswerOptionsProps {
  allTilesRevealed: boolean;
  currentOptions: string[];
  handleGuess: (option: string) => void;
  isDisabled: boolean;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  allTilesRevealed,
  currentOptions,
  handleGuess,
  isDisabled,
  revealRandomTile,
  revealAllTiles
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">
        {allTilesRevealed ? "What is this picture showing?" : "Reveal tiles to see the hidden picture!"}
      </h2>
      
      {allTilesRevealed ? (
        <div className="grid grid-cols-2 gap-4">
          {currentOptions.map((option, index) => (
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button 
                onClick={() => handleGuess(option)} 
                variant="outline" 
                className="w-full p-6 h-auto text-left justify-start hover:bg-primary/5 hover:border-primary/30"
                disabled={isDisabled}
              >
                <div>
                  <div className="font-medium mb-1">{option}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Click on the tiles or use the reveal button to uncover parts of the image
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={revealRandomTile}
              variant="outline"
              className="animate-pulse-soft flex items-center"
            >
              <Eye className="mr-2 h-4 w-4" />
              Reveal Random Tile
            </Button>
            <Button 
              onClick={revealAllTiles}
              variant="outline"
              className="flex items-center"
            >
              <Search className="mr-2 h-4 w-4" />
              Reveal All Tiles
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerOptions;

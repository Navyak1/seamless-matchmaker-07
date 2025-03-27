
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserGuess } from '@/types/gameTypes';

interface GuessInputProps {
  allTilesRevealed: boolean;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  handleGuessSubmit: () => void;
  isDisabled: boolean;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
  userGuesses: UserGuess[];
}

const GuessInput: React.FC<GuessInputProps> = ({
  allTilesRevealed,
  currentGuess,
  setCurrentGuess,
  handleGuessSubmit,
  isDisabled,
  revealRandomTile,
  revealAllTiles,
  userGuesses
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when all tiles are revealed
    if (allTilesRevealed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [allTilesRevealed]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleGuessSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">
        {allTilesRevealed ? "What is this picture showing?" : "Reveal tiles to see the hidden picture!"}
      </h2>
      
      {allTilesRevealed ? (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your guess here..."
              disabled={isDisabled}
              className="flex-grow"
            />
            <Button 
              onClick={handleGuessSubmit} 
              disabled={isDisabled || !currentGuess.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </div>
          
          {userGuesses.length > 0 && (
            <motion.div 
              className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-medium mb-2">Recent Guesses:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {userGuesses.map((guess, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="font-medium">{guess.username}:</span>
                    <span className="text-muted-foreground">{guess.guess}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
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

export default GuessInput;


import React from 'react';
import { motion } from 'framer-motion';
import { UserGuess } from '@/types/gameTypes';
import GuessForm from './GuessForm';
import GuessOptions from './GuessOptions';
import GuessList from './GuessList';
import { Button } from '@/components/ui/button';

interface GuessInputProps {
  allTilesRevealed: boolean;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  handleGuessSubmit: () => void;
  isDisabled: boolean;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
  userGuesses: UserGuess[];
  isStreaming: boolean;
  showAnswer: boolean;
  correctAnswer: string;
  moveToNextImage: () => void;
}

const GuessInput: React.FC<GuessInputProps> = ({
  allTilesRevealed,
  currentGuess,
  setCurrentGuess,
  handleGuessSubmit,
  isDisabled,
  revealRandomTile,
  revealAllTiles,
  userGuesses,
  isStreaming,
  showAnswer,
  correctAnswer,
  moveToNextImage
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">
        {!showAnswer 
          ? "Guess what this image shows! The fewer tiles revealed, the more points you earn!" 
          : "Correct answer revealed! Moving to next image..."}
      </h2>
      
      <div className="space-y-4">
        {/* Guess input form - always visible for all tile reveals */}
        {!showAnswer ? (
          <GuessForm
            currentGuess={currentGuess}
            setCurrentGuess={setCurrentGuess}
            handleGuessSubmit={handleGuessSubmit}
            isDisabled={isDisabled}
          />
        ) : (
          <motion.div 
            className="mb-4 p-4 rounded-lg bg-primary/10 border border-primary/30 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium mb-1">The correct answer was:</h3>
            <p className="text-xl font-bold text-primary">{correctAnswer}</p>
            <Button 
              onClick={moveToNextImage}
              className="mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Next Image
            </Button>
          </motion.div>
        )}
        
        {/* Revelation controls - only shown if not all tiles revealed and no correct answer yet */}
        {!allTilesRevealed && !showAnswer && (
          <GuessOptions
            revealRandomTile={revealRandomTile}
            revealAllTiles={revealAllTiles}
          />
        )}
        
        {/* Guesses list */}
        <GuessList
          userGuesses={userGuesses}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
};

export default GuessInput;



import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserGuess } from '@/types/gameTypes';
import GuessForm from './GuessForm';
import GuessOptions from './GuessOptions';
import GuessList from './GuessList';

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
  isStreaming
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">
        {allTilesRevealed 
          ? "Final chance! What does this picture show?" 
          : "Guess after each reveal! The fewer tiles shown, the more points you earn!"}
      </h2>
      
      <div className="space-y-4">
        {/* Guess input form - always visible */}
        <GuessForm
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleGuessSubmit={handleGuessSubmit}
          isDisabled={isDisabled}
        />
        
        {/* Revelation controls - only shown if not all tiles revealed */}
        {!allTilesRevealed && (
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

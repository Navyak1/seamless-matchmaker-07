
import React from 'react';
import { motion } from 'framer-motion';
import ImageTiles from '@/components/game/ImageTiles';
import GuessInput from '@/components/game/GuessInput';

interface GameContentProps {
  revealedTiles: boolean[];
  allTilesRevealed: boolean;
  userGuesses: any[];
  currentGuess: string;
  isStreaming: boolean;
  correctAnswer: string;
  showAnswer: boolean;
  isDisabled: boolean;
  getCurrentImage: () => string;
  handleTileClick: (index: number) => void;
  revealRandomTile: () => void;
  revealAllTiles: () => void;
  handleGuessSubmit: () => void;
  setCurrentGuess: (guess: string) => void;
}

const GameContent: React.FC<GameContentProps> = ({
  revealedTiles,
  allTilesRevealed,
  userGuesses,
  currentGuess,
  isStreaming,
  correctAnswer,
  showAnswer,
  isDisabled,
  getCurrentImage,
  handleTileClick,
  revealRandomTile,
  revealAllTiles,
  handleGuessSubmit,
  setCurrentGuess
}) => {
  return (
    <>
      <ImageTiles
        revealedTiles={revealedTiles}
        currentImage={getCurrentImage()}
        handleTileClick={handleTileClick}
        allTilesRevealed={allTilesRevealed}
      />
      
      {showAnswer && (
        <motion.div 
          className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-1">The correct answer was:</h3>
          <p className="text-xl font-bold text-primary">{correctAnswer}</p>
        </motion.div>
      )}
      
      <GuessInput 
        allTilesRevealed={allTilesRevealed}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        handleGuessSubmit={handleGuessSubmit}
        isDisabled={isDisabled}
        revealRandomTile={revealRandomTile}
        revealAllTiles={revealAllTiles}
        userGuesses={userGuesses}
        isStreaming={isStreaming}
      />
    </>
  );
};

export default GameContent;

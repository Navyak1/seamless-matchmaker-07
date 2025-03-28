
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
  moveToNextImage: () => void;
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
  setCurrentGuess,
  moveToNextImage
}) => {
  return (
    <>
      <ImageTiles
        revealedTiles={revealedTiles}
        currentImage={getCurrentImage()}
        handleTileClick={handleTileClick}
        allTilesRevealed={allTilesRevealed}
      />
      
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
        showAnswer={showAnswer}
        correctAnswer={correctAnswer}
        moveToNextImage={moveToNextImage}
      />
    </>
  );
};

export default GameContent;

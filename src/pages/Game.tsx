
import React from 'react';
import Header from '@/components/layout/Header';
import { useGameState } from '@/hooks/useGameState';
import useWindowSize from '@/hooks/useWindowSize';
import GameHeader from '@/components/game/GameHeader';
import ImageTiles from '@/components/game/ImageTiles';
import AnswerOptions from '@/components/game/AnswerOptions';
import WinnerAnnouncement from '@/components/game/WinnerAnnouncement';
import { motion } from 'framer-motion';

const Game = () => {
  const { 
    score, 
    timeLeft, 
    revealedTiles, 
    allTilesRevealed, 
    isMuted, 
    showWinner, 
    totalImagesPlayed, 
    isDisabled,
    getCurrentImage,
    getCurrentOptions,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    handleGuess,
    toggleMute
  } = useGameState();
  
  const { width, height } = useWindowSize();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-4xl mx-auto">
          <GameHeader 
            score={score} 
            timeLeft={timeLeft} 
            totalImagesPlayed={totalImagesPlayed}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
          
          <div className="playful-card p-8 mb-8">
            <motion.h1 
              className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Guess What's in the Picture!
            </motion.h1>
            
            <ImageTiles
              revealedTiles={revealedTiles}
              currentImage={getCurrentImage()}
              handleTileClick={handleTileClick}
              allTilesRevealed={allTilesRevealed}
            />
            
            <AnswerOptions
              allTilesRevealed={allTilesRevealed}
              currentOptions={getCurrentOptions()}
              handleGuess={handleGuess}
              isDisabled={isDisabled}
              revealRandomTile={revealRandomTile}
              revealAllTiles={revealAllTiles}
            />
          </div>
        </div>
      </main>
      
      <WinnerAnnouncement
        score={score}
        width={width}
        height={height}
        show={showWinner}
      />
    </div>
  );
};

export default Game;

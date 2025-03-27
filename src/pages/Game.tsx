
import React from 'react';
import Header from '@/components/layout/Header';
import { useGameState } from '@/hooks/useGameState';
import useWindowSize from '@/hooks/useWindowSize';
import GameHeader from '@/components/game/GameHeader';
import ImageTiles from '@/components/game/ImageTiles';
import GuessInput from '@/components/game/GuessInput';
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
    isWinner, 
    totalImagesPlayed, 
    isDisabled,
    isLoading,
    userGuesses,
    currentGuess,
    isStreaming,
    getCurrentImage,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    handleGuessSubmit,
    setCurrentGuess,
    toggleMute,
  } = useGameState();
  
  const { width, height } = useWindowSize();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/40">
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
          
          <div className="playful-card p-8 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border border-purple-100 dark:border-purple-900">
            <motion.h1 
              className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Guess What's in the AI-Generated Picture!
            </motion.h1>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="ml-4 text-lg">Generating new AI image...</p>
              </div>
            ) : (
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
                />
              </>
            )}
          </div>
        </div>
      </main>
      
      <WinnerAnnouncement
        score={score}
        width={width}
        height={height}
        show={showWinner}
        isWinner={isWinner}
      />
    </div>
  );
};

export default Game;

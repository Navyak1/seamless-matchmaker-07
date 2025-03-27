
import React from 'react';
import Header from '@/components/layout/Header';
import GameHeader from '@/components/game/GameHeader';
import WinnerAnnouncement from '@/components/game/WinnerAnnouncement';
import GameContent from '@/components/game/GameContent';
import { useGameState } from '@/hooks/useGameState';
import useWindowSize from '@/hooks/useWindowSize';
import { motion } from 'framer-motion';

const GameContainer = () => {
  const { 
    score, 
    timeLeft, 
    isMuted, 
    showWinner,
    isWinner, 
    totalImagesPlayed,
    isLoading,
    width,
    height,
    toggleMute,
    ...gameStateProps
  } = useGameStateWithWindowSize();
  
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
              <GameLoading />
            ) : (
              <GameContent {...gameStateProps} />
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

// Custom hook to combine window size with game state
const useGameStateWithWindowSize = () => {
  const gameState = useGameState();
  const { width, height } = useWindowSize();
  
  return {
    ...gameState,
    width,
    height
  };
};

export default GameContainer;


import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { useGameState } from '@/hooks/useGameState';
import useWindowSize from '@/hooks/useWindowSize';
import GameHeader from '@/components/game/GameHeader';
import ImageTiles from '@/components/game/ImageTiles';
import AnswerOptions from '@/components/game/AnswerOptions';
import WinnerAnnouncement from '@/components/game/WinnerAnnouncement';
import ImageGenerator from '@/components/game/ImageGenerator';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

const Game = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  
  const { 
    score, 
    timeLeft, 
    revealedTiles, 
    allTilesRevealed, 
    isMuted, 
    showWinner, 
    totalImagesPlayed, 
    isDisabled,
    isGeneratingImage,
    setIsGeneratingImage,
    getCurrentImage,
    getCurrentOptions,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    handleGuess,
    toggleMute,
    handleImageGenerated
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
            <div className="flex justify-between items-center mb-6">
              <motion.h1 
                className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Guess What's in the Picture!
              </motion.h1>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 border-primary/30 text-primary"
                onClick={() => setShowGenerator(!showGenerator)}
              >
                <Wand2 className="w-4 h-4" />
                {showGenerator ? "Hide Generator" : "Generate AI Image"}
              </Button>
            </div>
            
            {showGenerator && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ImageGenerator 
                  onImageGenerated={handleImageGenerated}
                  isGenerating={isGeneratingImage}
                  setIsGenerating={setIsGeneratingImage}
                />
              </motion.div>
            )}
            
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

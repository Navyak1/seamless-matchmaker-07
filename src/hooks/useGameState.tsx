import { useState, useCallback, useEffect } from 'react';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';
import { useGameTimer } from './useGameTimer';
import { useGameImages } from './useGameImages';
import { useGameTiles } from './useGameTiles';
import { useGameBots } from './useGameBots';
import { useGameAnswers } from './useGameAnswers';
import { UseGameStateReturn, UserGuess } from '@/types/gameTypes';

export const useGameState = (): UseGameStateReturn => {
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isWinner, setIsWinner] = useState(true);
  const [userGuesses, setUserGuesses] = useState<UserGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');

  const endGame = useCallback((playerWins: boolean = true) => {
    setIsWinner(playerWins);
    
    // Show result announcement
    if (playerWins) {
      soundManager.play('win');
      soundManager.play('fireworks');
    } else {
      soundManager.play('lose');
    }
    setShowWinner(true);
  }, []);

  const { timeLeft } = useGameTimer(60, () => endGame(score >= 30));

  const {
    generatedImages,
    currentImageIndex,
    isLoading,
    totalImagesPlayed,
    generateInitialImages,
    getCurrentImage,
    getCurrentAnswer,
    moveToNextImage,
    setTotalImagesPlayed
  } = useGameImages();

  const {
    revealedTiles,
    allTilesRevealed,
    handleTileClick,
    revealRandomTile: originalRevealRandomTile,
    revealAllTiles: originalRevealAllTiles,
    resetTiles
  } = useGameTiles();

  const {
    hasCorrectGuess,
    showAnswer,
    correctAnswer,
    isDisabled,
    setIsDisabled,
    handleBotCorrectGuess,
    handlePlayerCorrectGuess,
    revealAnswer
  } = useGameAnswers(
    moveToNextImage,
    resetTiles,
    setUserGuesses,
    totalImagesPlayed,
    endGame
  );

  const addUserGuess = useCallback((username: string, guess: string, isBot: boolean = false, isCorrect: boolean = false) => {
    const newGuess: UserGuess = {
      username,
      guess,
      timestamp: Date.now(),
      isBot,
      isTyping: isBot ? true : false,
      isCorrect
    };
    
    setUserGuesses(prev => [...prev, newGuess]);
    
    if (isBot && newGuess.isTyping) {
      const typingTime = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds
      
      setTimeout(() => {
        setUserGuesses(prev => 
          prev.map(g => 
            g.username === username && g.timestamp === newGuess.timestamp
              ? { ...g, isTyping: false }
              : g
          )
        );
      }, typingTime);
    }
  }, []);

  const {
    isStreaming,
    setIsStreaming,
    checkAndTriggerBots,
    clearBotTimeout
  } = useGameBots(
    revealedTiles,
    allTilesRevealed,
    hasCorrectGuess,
    addUserGuess,
    getCurrentAnswer,
    handleBotCorrectGuess
  );

  useEffect(() => {
    generateInitialImages();
  }, [generateInitialImages]);

  useEffect(() => {
    checkAndTriggerBots(userGuesses);
  }, [revealedTiles, allTilesRevealed, hasCorrectGuess, userGuesses, checkAndTriggerBots]);

  const handleGuessSubmit = useCallback(() => {
    if (isDisabled || !currentGuess.trim()) return;
    
    setIsDisabled(true);
    
    addUserGuess('You', currentGuess);
    
    const answer = getCurrentAnswer();
    const correct = currentGuess.toLowerCase().trim() === answer.toLowerCase().trim();
    
    if (correct) {
      setUserGuesses(prev => 
        prev.map(g => 
          g.username === 'You' && g.guess === currentGuess
            ? { ...g, isCorrect: true }
            : g
        )
      );
      
      const updateScore = () => setScore(prevScore => prevScore + 10);
      handlePlayerCorrectGuess(answer, updateScore);
      soundManager.play('correct');
      toast.success("Correct guess! +10 points");
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
      setIsDisabled(false);
    }
    
    setCurrentGuess('');
  }, [isDisabled, currentGuess, addUserGuess, getCurrentAnswer, handlePlayerCorrectGuess]);

  const revealRandomTile = useCallback(() => {
    originalRevealRandomTile();
    setIsStreaming(true);
  }, [originalRevealRandomTile, setIsStreaming]);

  const revealAllTiles = useCallback(() => {
    originalRevealAllTiles();
    
    if (!hasCorrectGuess) {
      const answer = getCurrentAnswer();
      revealAnswer(answer);
    }
  }, [originalRevealAllTiles, hasCorrectGuess, getCurrentAnswer, revealAnswer]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  }, [isMuted]);

  return {
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
    generatedImages,
    currentImageIndex,
    userGuesses,
    currentGuess,
    isStreaming,
    correctAnswer,
    showAnswer,
    getCurrentImage,
    getCurrentAnswer,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    handleGuessSubmit,
    setCurrentGuess,
    addUserGuess,
    endGame,
    toggleMute
  };
};


import { useCallback, useEffect } from 'react';
import { UseGameStateReturn } from '@/types/gameTypes';
import { useGameTimer } from './useGameTimer';
import { useGameImages } from './useGameImages';
import { useGameTiles } from './useGameTiles';
import { useGameBots } from './useGameBots';
import { useGameAnswers } from './useGameAnswers';
import { useGameScore } from './useGameScore';
import { useGameUI } from './useGameUI';
import { useGameInput } from './useGameInput';
import { useGameEnd } from './useGameEnd';

export const useGameState = (): UseGameStateReturn => {
  // Game UI state
  const {
    isMuted,
    showWinner,
    isWinner,
    toggleMute,
    showWinnerAnnouncement
  } = useGameUI();

  // Game ending logic
  const { endGame } = useGameEnd(showWinnerAnnouncement);

  // Scoring system
  const { score, updateScore } = useGameScore();

  // Timer
  const { timeLeft } = useGameTimer(60, () => endGame(score >= 30));

  // Image generation and management
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

  // Tile revealing system
  const {
    revealedTiles,
    allTilesRevealed,
    handleTileClick,
    revealRandomTile: originalRevealRandomTile,
    revealAllTiles: originalRevealAllTiles,
    resetTiles
  } = useGameTiles();

  // Calculate how many tiles are currently revealed
  const revealedCount = revealedTiles.filter(Boolean).length;

  // Answer validation
  const {
    hasCorrectGuess,
    showAnswer,
    correctAnswer,
    handleBotCorrectGuess,
    handlePlayerCorrectGuess,
    revealAnswer
  } = useGameAnswers(
    moveToNextImage,
    resetTiles,
    setTotalImagesPlayed,
    endGame
  );

  // User input management
  const {
    userGuesses,
    currentGuess,
    isDisabled,
    setUserGuesses,
    setCurrentGuess,
    setIsDisabled,
    addUserGuess,
    handleGuessSubmit
  } = useGameInput(
    getCurrentAnswer,
    // Pass the current revealed count to calculate score
    (answer, updateScoreFn) => handlePlayerCorrectGuess(answer, updateScoreFn, revealedCount),
    updateScore
  );

  // Bot players logic
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
    (answer) => handleBotCorrectGuess(answer, revealedCount)
  );

  // Initialize game
  useEffect(() => {
    generateInitialImages();
  }, [generateInitialImages]);

  // Monitor game state and trigger bots
  useEffect(() => {
    checkAndTriggerBots(userGuesses);
  }, [revealedTiles, allTilesRevealed, hasCorrectGuess, userGuesses, checkAndTriggerBots]);

  // Wrapper functions for tile revealing
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

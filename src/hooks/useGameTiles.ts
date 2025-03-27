
import { useState, useCallback } from 'react';
import soundManager from '@/utils/sound';

export const useGameTiles = () => {
  const [revealedTiles, setRevealedTiles] = useState(Array(9).fill(false));
  const [allTilesRevealed, setAllTilesRevealed] = useState(false);

  const handleTileClick = useCallback((index: number) => {
    if (revealedTiles[index] || allTilesRevealed) return;
    
    soundManager.play('reveal');
    
    const newRevealedTiles = [...revealedTiles];
    newRevealedTiles[index] = true;
    setRevealedTiles(newRevealedTiles);
    
    // Check if all tiles are revealed
    if (newRevealedTiles.filter(Boolean).length === 9) {
      setAllTilesRevealed(true);
    }
  }, [revealedTiles, allTilesRevealed]);

  const revealRandomTile = useCallback(() => {
    // Get indices of unrevealed tiles
    const unrevealedIndices = revealedTiles
      .map((revealed, index) => revealed ? -1 : index)
      .filter(index => index !== -1);
    
    if (unrevealedIndices.length === 0) return;
    
    // Reveal a random tile
    const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
    handleTileClick(randomIndex);
  }, [revealedTiles, handleTileClick]);

  const revealAllTiles = useCallback(() => {
    setRevealedTiles(Array(9).fill(true));
    setAllTilesRevealed(true);
  }, []);

  const resetTiles = useCallback(() => {
    setRevealedTiles(Array(9).fill(false));
    setAllTilesRevealed(false);
  }, []);

  return {
    revealedTiles,
    allTilesRevealed,
    handleTileClick,
    revealRandomTile,
    revealAllTiles,
    resetTiles
  };
};

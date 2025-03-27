
import { useCallback } from 'react';
import soundManager from '@/utils/sound';

export const useGameEnd = (showWinnerAnnouncement: (playerWins: boolean) => void) => {
  const endGame = useCallback((playerWins: boolean = true) => {
    // Show result announcement
    if (playerWins) {
      soundManager.play('win');
      soundManager.play('fireworks');
    } else {
      soundManager.play('lose');
    }
    
    showWinnerAnnouncement(playerWins);
  }, [showWinnerAnnouncement]);

  return {
    endGame
  };
};

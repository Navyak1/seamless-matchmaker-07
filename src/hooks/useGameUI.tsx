
import { useState, useCallback } from 'react';
import soundManager from '@/utils/sound';

export const useGameUI = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isWinner, setIsWinner] = useState(true);
  
  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  }, [isMuted]);
  
  const showWinnerAnnouncement = useCallback((playerWins: boolean = true) => {
    setIsWinner(playerWins);
    setShowWinner(true);
  }, []);
  
  return {
    isMuted,
    showWinner,
    isWinner,
    toggleMute,
    showWinnerAnnouncement
  };
};

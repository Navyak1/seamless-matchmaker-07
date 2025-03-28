
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import soundManager from '@/utils/sound';

export const useGameScore = () => {
  const [score, setScore] = useState(0);
  
  const updateScore = useCallback((revealedCount: number = 0) => {
    // Calculate points based on how many tiles are revealed
    // Fewer tiles revealed = more points
    const basePoints = 10;
    const bonusPoints = Math.max(0, 9 - revealedCount) * 5; // Up to 45 bonus points for early guesses
    const points = basePoints + bonusPoints;
    
    setScore(prevScore => prevScore + points);
    toast.success(`Correct guess! +${points} points${bonusPoints > 0 ? ` (includes ${bonusPoints} early guess bonus!)` : ''}`);
    soundManager.play('correct');
  }, []);
  
  return {
    score,
    updateScore
  };
};


import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import soundManager from '@/utils/sound';

export const useGameScore = () => {
  const [score, setScore] = useState(0);
  
  const updateScore = useCallback((points: number = 10) => {
    setScore(prevScore => prevScore + points);
    toast.success(`Correct guess! +${points} points`);
    soundManager.play('correct');
  }, []);
  
  return {
    score,
    updateScore
  };
};

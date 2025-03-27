
import { useState, useCallback } from 'react';
import { UserGuess } from '@/types/gameTypes';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';

export const useGameInput = (
  getCurrentAnswer: () => string,
  handlePlayerCorrectGuess: (answer: string, updateScore: () => void) => void,
  updateScore: () => void
) => {
  const [userGuesses, setUserGuesses] = useState<UserGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

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
      
      handlePlayerCorrectGuess(answer, updateScore);
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
      setIsDisabled(false);
    }
    
    setCurrentGuess('');
  }, [isDisabled, currentGuess, addUserGuess, getCurrentAnswer, handlePlayerCorrectGuess, updateScore]);

  return {
    userGuesses,
    currentGuess,
    isDisabled,
    setUserGuesses,
    setCurrentGuess,
    setIsDisabled,
    addUserGuess,
    handleGuessSubmit
  };
};

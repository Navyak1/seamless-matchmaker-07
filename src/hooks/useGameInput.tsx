
import { useState, useCallback } from 'react';
import { UserGuess } from '@/types/gameTypes';
import soundManager from '@/utils/sound';
import { toast } from 'sonner';

export const useGameInput = (
  getCurrentAnswer: () => string,
  handlePlayerCorrectGuess: (answer: string, updateScore: (revealedCount: number) => void, revealedCount: number) => void,
  updateScore: (revealedCount: number) => void,
  revealedTiles: boolean[]
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
    if (!currentGuess.trim()) return;
    
    // Calculate how many tiles are revealed
    const revealedCount = revealedTiles.filter(Boolean).length;
    
    addUserGuess('You', currentGuess);
    
    const answer = getCurrentAnswer();
    const userGuessLower = currentGuess.toLowerCase().trim();
    const answerLower = answer.toLowerCase().trim();
    
    // Calculate similarity to determine if the guess is correct
    // Check for exact match or close match (contains the word)
    const correct = userGuessLower === answerLower || 
                   (answerLower.includes(userGuessLower) && userGuessLower.length > 2) ||
                   (userGuessLower.includes(answerLower) && answerLower.length > 2);
    
    if (correct) {
      // Mark this guess as correct in the list
      setUserGuesses(prev => 
        prev.map(g => 
          g.username === 'You' && g.guess === currentGuess
            ? { ...g, isCorrect: true }
            : g
        )
      );
      
      // Handle the correct guess (update score and move to next image)
      handlePlayerCorrectGuess(answer, updateScore, revealedCount);
      setCurrentGuess('');
    } else {
      soundManager.play('wrong');
      toast.error("Not quite right! Try again or reveal more tiles");
      setCurrentGuess('');
    }
  }, [currentGuess, addUserGuess, getCurrentAnswer, handlePlayerCorrectGuess, updateScore, revealedTiles]);

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

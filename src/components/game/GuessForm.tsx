
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface GuessFormProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  handleGuessSubmit: () => void;
  isDisabled: boolean;
  tileRevealCount: number;  // Added prop to track tile reveals
}

const GuessForm: React.FC<GuessFormProps> = ({
  currentGuess,
  setCurrentGuess,
  handleGuessSubmit,
  isDisabled,
  tileRevealCount
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when component mounts, tile reveals, or isDisabled changes
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled, tileRevealCount]);  // Trigger focus on each reveal

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleGuessSubmit();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        key={tileRevealCount}  // Forces re-render on each tile reveal
        ref={inputRef}
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your guess here..."
        disabled={isDisabled}
        className="flex-grow"
      />
      <Button 
        onClick={handleGuessSubmit} 
        disabled={isDisabled || !currentGuess.trim()}
        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
      >
        <Send className="mr-2 h-4 w-4" />
        Guess
      </Button>
    </div>
  );
};

export default GuessForm;

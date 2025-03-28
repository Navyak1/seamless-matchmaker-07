
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface GuessFormProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  handleGuessSubmit: () => void;
  isDisabled: boolean;
}

const GuessForm: React.FC<GuessFormProps> = ({
  currentGuess,
  setCurrentGuess,
  handleGuessSubmit,
  isDisabled
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when component mounts and when isDisabled changes to false
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleGuessSubmit();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        ref={inputRef}
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your guess here... (available for every tile reveal)"
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

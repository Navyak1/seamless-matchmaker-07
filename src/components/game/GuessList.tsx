
import React from 'react';
import { UserGuess } from '@/types/gameTypes';
import { motion } from 'framer-motion';
import GuessListItem from './GuessListItem';

interface GuessListProps {
  userGuesses: UserGuess[];
  isStreaming: boolean;
}

const GuessList: React.FC<GuessListProps> = ({ userGuesses, isStreaming }) => {
  return (
    <motion.div 
      className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-medium mb-2">Players Guessing:</h3>
      {userGuesses.length > 0 ? (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {userGuesses.map((guess, index) => (
            <GuessListItem 
              key={index}
              guess={guess}
              index={index}
              isStreaming={isStreaming}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No guesses yet. Be the first to guess!</p>
      )}
    </motion.div>
  );
};

export default GuessList;

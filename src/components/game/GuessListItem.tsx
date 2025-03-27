
import React from 'react';
import { UserGuess } from '@/types/gameTypes';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuessListItemProps {
  guess: UserGuess;
  index: number;
  isStreaming: boolean;
}

const GuessListItem: React.FC<GuessListItemProps> = ({ guess, index, isStreaming }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className={`flex items-center justify-between text-sm ${
          guess.isCorrect ? 'bg-green-100 dark:bg-green-900/30 p-2 rounded-lg relative overflow-hidden' : ''
        }`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <span className={`font-medium ${guess.isBot ? 'text-blue-500' : 'text-primary'}`}>
          {guess.username}:
        </span>
        <div className="flex items-center">
          <span className="text-muted-foreground">
            {isStreaming && guess.isTyping ? (
              <span className="inline-flex">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
              </span>
            ) : (
              guess.guess
            )}
          </span>
          {guess.isCorrect && (
            <>
              <motion.span 
                className="ml-2 text-green-500 font-bold flex items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.1 
                }}
              >
                <Sparkles className="h-4 w-4 mr-1 text-yellow-500 animate-pulse" />
                Correct!
              </motion.span>
              
              {/* Celebration effects only for correct guesses */}
              {guess.isCorrect && (
                <>
                  {/* Sparkle effects */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute w-2 h-2 rounded-full bg-yellow-400"
                      initial={{ 
                        x: "50%", 
                        y: "50%", 
                        opacity: 1,
                        scale: 0 
                      }}
                      animate={{ 
                        x: `${Math.random() * 100 - 50}%`, 
                        y: `${Math.random() * 100 - 50}%`, 
                        opacity: 0,
                        scale: Math.random() * 2 + 1
                      }}
                      transition={{ 
                        duration: Math.random() * 1 + 0.5, 
                        delay: Math.random() * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  {/* Rainbow glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      background: [
                        "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(0,255,0,0.2) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(0,0,255,0.2) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(255,255,0,0.2) 0%, transparent 70%)",
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      times: [0, 0.5, 1],
                      repeat: 1,
                      repeatType: "reverse"
                    }}
                  />
                </>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuessListItem;

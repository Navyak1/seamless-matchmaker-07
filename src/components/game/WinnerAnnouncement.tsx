
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import soundManager from '@/utils/sound';

interface WinnerAnnouncementProps {
  score: number;
  width: number;
  height: number;
  show: boolean;
  isWinner?: boolean; // New prop to determine if user won or lost
}

const WinnerAnnouncement: React.FC<WinnerAnnouncementProps> = ({ 
  score, 
  width, 
  height, 
  show,
  isWinner = true // Default to true for backward compatibility
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Play sounds when results are shown
    if (show) {
      if (isWinner) {
        // Play celebratory sounds for winner
        soundManager.play('fireworks');
        
        // Play celebratory sounds with slight delays for a more festive effect
        const timer1 = setTimeout(() => soundManager.play('win'), 500);
        const timer2 = setTimeout(() => soundManager.play('fireworks'), 1500);
        
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      } else {
        // Play dull sound for losing
        soundManager.play('lose');
      }
    }
  }, [show, isWinner]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
      {isWinner && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <motion.div 
        className={`winner-card max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl ${
          isWinner 
            ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/40 dark:to-secondary-900/40' 
            : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
        }`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-4 ${
          isWinner 
            ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {isWinner ? "Congratulations!" : "You Lose!"}
        </h2>
        <p className="text-center text-lg mb-6 dark:text-gray-200">
          You scored <span className={`font-bold ${isWinner ? 'text-primary dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>{score} points</span>!
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/matchmaking')}
            className={isWinner 
              ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              : "bg-gradient-to-r from-gray-500 to-gray-600 hover:opacity-90"}
          >
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WinnerAnnouncement;

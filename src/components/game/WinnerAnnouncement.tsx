
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
    <div className="winner-announcement">
      {isWinner && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <motion.div 
        className="winner-card"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {isWinner ? "Congratulations!" : "You Lose!"}
        </h2>
        <p className="text-center text-lg mb-6">
          You scored <span className="font-bold text-primary">{score} points</span>!
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/matchmaking')}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WinnerAnnouncement;

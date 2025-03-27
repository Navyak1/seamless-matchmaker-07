
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface WinnerAnnouncementProps {
  score: number;
  width: number;
  height: number;
  show: boolean;
}

const WinnerAnnouncement: React.FC<WinnerAnnouncementProps> = ({ 
  score, 
  width, 
  height, 
  show 
}) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="winner-announcement">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
      <motion.div 
        className="winner-card"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Congratulations!
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

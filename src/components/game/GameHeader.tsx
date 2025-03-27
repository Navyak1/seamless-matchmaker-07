
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  totalImagesPlayed: number;
  isMuted: boolean;
  toggleMute: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  score, 
  timeLeft, 
  totalImagesPlayed, 
  isMuted, 
  toggleMute 
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex items-center justify-between">
      <Button variant="ghost" onClick={() => navigate('/matchmaking')} className="flex items-center">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Exit Game
      </Button>
      <div className="flex items-center space-x-4">
        <motion.div 
          className="playful-card px-4 py-2 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm font-bold">Score: {score}</span>
        </motion.div>
        <motion.div 
          className="playful-card px-4 py-2 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-bold">Image: {totalImagesPlayed + 1}/5</span>
        </motion.div>
        <motion.div 
          className="playful-card px-4 py-2 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-bold">Time: {timeLeft}s</span>
        </motion.div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMute}
          className="h-8 w-8"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;

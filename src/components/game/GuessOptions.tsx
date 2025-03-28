
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface GuessOptionsProps {
  revealRandomTile: () => void;
  revealAllTiles: () => void;
}

const GuessOptions: React.FC<GuessOptionsProps> = ({
  revealRandomTile,
  revealAllTiles
}) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row justify-center gap-4 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center text-sm text-muted-foreground mb-2">
        <p>Reveal tiles for clues and guess after each reveal for maximum points!</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button 
          onClick={revealRandomTile}
          variant="outline"
          className="animate-pulse-soft flex items-center"
        >
          <Eye className="mr-2 h-4 w-4" />
          Reveal Next Tile
        </Button>
        <Button 
          onClick={revealAllTiles}
          variant="outline"
          className="flex items-center"
        >
          <Search className="mr-2 h-4 w-4" />
          Reveal All Tiles
        </Button>
      </div>
    </motion.div>
  );
};

export default GuessOptions;

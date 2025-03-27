
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';

interface GuessOptionsProps {
  revealRandomTile: () => void;
  revealAllTiles: () => void;
}

const GuessOptions: React.FC<GuessOptionsProps> = ({
  revealRandomTile,
  revealAllTiles
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
      <Button 
        onClick={revealRandomTile}
        variant="outline"
        className="animate-pulse-soft flex items-center"
      >
        <Eye className="mr-2 h-4 w-4" />
        Reveal Random Tile
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
  );
};

export default GuessOptions;

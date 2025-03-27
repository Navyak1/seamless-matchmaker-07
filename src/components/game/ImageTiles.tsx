
import React from 'react';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageTilesProps {
  revealedTiles: boolean[];
  currentImage: string;
  handleTileClick: (index: number) => void;
  allTilesRevealed: boolean;
}

const ImageTiles: React.FC<ImageTilesProps> = ({ 
  revealedTiles, 
  currentImage, 
  handleTileClick, 
  allTilesRevealed 
}) => {
  return (
    <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-xl border-4 border-secondary/30">
      <div className="relative w-full h-full">
        {Array(9).fill(0).map((_, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          
          return (
            <motion.div
              key={index}
              className={`image-tile ${revealedTiles[index] ? 'image-tile-revealed' : 'image-tile-hidden'}`}
              style={{
                height: '33.333%',
                width: '33.333%',
                position: 'absolute',
                top: `${row * 33.333}%`,
                left: `${col * 33.333}%`,
                backgroundImage: revealedTiles[index] ? `url(${currentImage})` : 'none',
                backgroundSize: '300% 300%',
                backgroundPosition: `${col * 50}% ${row * 50}%`,
              }}
              onClick={() => handleTileClick(index)}
              whileHover={{ scale: revealedTiles[index] ? 1 : 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              {!revealedTiles[index] && (
                <div className="w-full h-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary/50" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {allTilesRevealed && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl text-white text-center">
            <p className="text-lg font-bold mb-2">What is this picture showing?</p>
            <p className="text-sm">Select the correct answer below!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageTiles;

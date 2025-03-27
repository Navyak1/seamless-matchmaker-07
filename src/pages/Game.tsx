
import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import soundManager from '@/utils/sound';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';

// Define image categories and their items
const imageCategories = [
  {
    name: 'Nature',
    items: [
      { src: '/images/nature-1.jpg', answer: 'Mountain Range', options: ['Mountain Range', 'Desert', 'Beach', 'Waterfall'] },
      { src: '/images/nature-2.jpg', answer: 'Forest', options: ['Forest', 'Jungle', 'Savanna', 'Garden'] },
      { src: '/images/nature-3.jpg', answer: 'Lake', options: ['Lake', 'Ocean', 'River', 'Pond'] },
    ]
  },
  {
    name: 'Fruits',
    items: [
      { src: '/images/fruit-1.jpg', answer: 'Strawberry', options: ['Strawberry', 'Raspberry', 'Blueberry', 'Cherry'] },
      { src: '/images/fruit-2.jpg', answer: 'Banana', options: ['Banana', 'Mango', 'Pineapple', 'Papaya'] },
      { src: '/images/fruit-3.jpg', answer: 'Apple', options: ['Apple', 'Pear', 'Peach', 'Plum'] },
    ]
  },
  {
    name: 'Vegetables',
    items: [
      { src: '/images/vegetable-1.jpg', answer: 'Carrot', options: ['Carrot', 'Pepper', 'Radish', 'Sweet Potato'] },
      { src: '/images/vegetable-2.jpg', answer: 'Broccoli', options: ['Broccoli', 'Spinach', 'Kale', 'Lettuce'] },
      { src: '/images/vegetable-3.jpg', answer: 'Tomato', options: ['Tomato', 'Bell Pepper', 'Eggplant', 'Onion'] },
    ]
  },
  {
    name: 'Toys',
    items: [
      { src: '/images/toy-1.jpg', answer: 'Teddy Bear', options: ['Teddy Bear', 'Action Figure', 'Doll', 'Robot'] },
      { src: '/images/toy-2.jpg', answer: 'Building Blocks', options: ['Building Blocks', 'Puzzle', 'Board Game', 'Play-Doh'] },
      { src: '/images/toy-3.jpg', answer: 'Toy Car', options: ['Toy Car', 'Train Set', 'Remote Control Helicopter', 'Bicycle'] },
    ]
  },
  {
    name: 'Cartoon Characters',
    items: [
      { src: '/images/cartoon-1.jpg', answer: 'Mickey Mouse', options: ['Mickey Mouse', 'Donald Duck', 'Goofy', 'Pluto'] },
      { src: '/images/cartoon-2.jpg', answer: 'SpongeBob', options: ['SpongeBob', 'Patrick Star', 'Squidward', 'Mr. Krabs'] },
      { src: '/images/cartoon-3.jpg', answer: 'Pikachu', options: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur'] },
    ]
  }
];

// For simplicity in this mockup, we'll use placeholder images if actual ones aren't available
const placeholderImages = [
  '/game-image-1.jpg',
  '/game-image-2.jpg',
  '/game-image-3.jpg',
];

const Game = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [revealedTiles, setRevealedTiles] = useState(Array(9).fill(false));
  const [allTilesRevealed, setAllTilesRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  
  const getCurrentImage = useCallback(() => {
    // Use real images if available, otherwise fallback to placeholders
    try {
      return imageCategories[currentCategory].items[currentItem].src;
    } catch (e) {
      return placeholderImages[currentItem % placeholderImages.length];
    }
  }, [currentCategory, currentItem]);

  const getCurrentOptions = useCallback(() => {
    try {
      return imageCategories[currentCategory].items[currentItem].options;
    } catch (e) {
      return ['Mountain', 'Ocean', 'Forest', 'Desert'];
    }
  }, [currentCategory, currentItem]);

  const getCurrentAnswer = useCallback(() => {
    try {
      return imageCategories[currentCategory].items[currentItem].answer;
    } catch (e) {
      return getCurrentOptions()[0];
    }
  }, [currentCategory, currentItem, getCurrentOptions]);
  
  // Start the timer when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Game over when time runs out
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleTileClick = (index: number) => {
    if (revealedTiles[index] || allTilesRevealed) return;
    
    soundManager.play('reveal');
    
    const newRevealedTiles = [...revealedTiles];
    newRevealedTiles[index] = true;
    setRevealedTiles(newRevealedTiles);
    
    // Check if all tiles are revealed
    if (newRevealedTiles.filter(Boolean).length === 9) {
      setAllTilesRevealed(true);
    }
  };
  
  const handleGuess = (option: string) => {
    const correct = option === getCurrentAnswer();
    
    if (correct) {
      setScore(score + 10);
      soundManager.play('correct');
      toast.success("Correct guess! +10 points");
    } else {
      soundManager.play('wrong');
      toast.error("Wrong guess! Try again");
    }
    
    // Move to next image
    moveToNextImage();
  };
  
  const moveToNextImage = () => {
    // Determine next category and item
    let nextCategory = currentCategory;
    let nextItem = currentItem + 1;
    
    // If we've gone through all items in this category, move to next category
    if (nextItem >= imageCategories[nextCategory].items.length) {
      nextItem = 0;
      nextCategory = (nextCategory + 1) % imageCategories.length;
    }
    
    setCurrentCategory(nextCategory);
    setCurrentItem(nextItem);
    setRevealedTiles(Array(9).fill(false));
    setAllTilesRevealed(false);
  };
  
  const endGame = () => {
    // Show winner announcement
    soundManager.play('win');
    setShowWinner(true);
  };
  
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  };
  
  // Divide image into a 3x3 grid
  const renderImageTiles = () => {
    return Array(9).fill(0).map((_, index) => {
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
            backgroundImage: revealedTiles[index] ? `url(${getCurrentImage()})` : 'none',
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
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-4xl mx-auto">
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
          
          <div className="playful-card p-8 mb-8">
            <motion.h1 
              className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Guess What's in the Picture!
            </motion.h1>
            
            <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-xl border-4 border-secondary/30">
              <div className="relative w-full h-full">
                {renderImageTiles()}
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
            
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-center mb-4">
                {allTilesRevealed ? "What is this picture showing?" : "Reveal tiles to see the hidden picture!"}
              </h2>
              
              {allTilesRevealed ? (
                <div className="grid grid-cols-2 gap-4">
                  {getCurrentOptions().map((option, index) => (
                    <motion.div key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Button 
                        onClick={() => handleGuess(option)} 
                        variant="outline" 
                        className="w-full p-6 h-auto text-left justify-start hover:bg-primary/5 hover:border-primary/30"
                      >
                        <div>
                          <div className="font-medium mb-1">{option}</div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    Click on the tiles to reveal parts of the image
                  </p>
                  <div className="flex justify-center">
                    <Button 
                      onClick={() => setRevealedTiles(Array(9).fill(true))}
                      variant="outline"
                      className="animate-pulse-soft"
                    >
                      Reveal All Tiles
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Winner Announcement */}
      {showWinner && (
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
      )}
    </div>
  );
};

export default Game;

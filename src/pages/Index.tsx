
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Sparkles } from 'lucide-react';

const Index = () => {
  // State to track if elements are loaded for animations
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded after a brief delay to ensure CSS animations work
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="comic-background min-h-screen flex flex-col items-center justify-center overflow-hidden p-4">
      {/* Comic ray background */}
      <div className="comic-rays"></div>
      
      {/* Comic elements */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Paper plane decoration */}
        <motion.img 
          src="/lovable-uploads/c0e03561-0059-4325-a7a8-27b361ab10a5.png" 
          alt="Comic background" 
          className="absolute w-full h-full object-cover pointer-events-none opacity-0"
        />
        
        <motion.div 
          className="paper-plane"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </motion.div>
        
        {/* Sparkles - reduced number and size */}
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            className="sparkle absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: 2, 
              delay: i * 0.5, 
              repeat: Infinity, 
              repeatDelay: Math.random() * 3
            }}
            style={{
              top: `${Math.random() * 70 + 15}%`,
              right: `${Math.random() * 70 + 15}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.4 + 0.3})`,
            }}
          />
        ))}
        
        {/* Main speech bubble with text - reduced size */}
        <motion.div 
          className="speech-bubble w-4/5 max-w-md aspect-auto flex flex-col items-center justify-center py-6 px-4 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20, 
            delay: 0.3 
          }}
        >
          <motion.h1 
            className="comic-text text-5xl sm:text-6xl font-bold text-amber-400 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            LET'S
            <br />
            UNLOCK THE
            <br />
            PICTURE!
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 1 
            }}
          >
            <Link to="/matchmaking">
              <button className="btn-play text-lg font-bold px-8 py-2 flex items-center">
                PLAY
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  className="ml-2"
                >
                  <Play size={20} />
                </motion.span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Comic style accents - reduced size and spacing */}
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={`accent-${i}`}
            className="absolute w-8 h-1.5 bg-black rounded-full"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + (i * 0.1) }}
            style={{
              transform: `rotate(${i * 45}deg)`,
              top: `${25 + (i * 10)}%`,
              left: `${20 + (i * 4)}%`
            }}
          />
        ))}
        
        {/* Action lines - reduced size */}
        {[...Array(2)].map((_, i) => (
          <motion.div 
            key={`line-${i}`}
            className="absolute w-10 h-0.5 bg-black rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + (i * 0.1) }}
            style={{
              transform: `rotate(${-30 + (i * 30)}deg)`,
              top: `${60 + (i * 8)}%`,
              right: `${20 + (i * 6)}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;

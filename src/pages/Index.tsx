
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
    <div className="comic-background min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Comic ray background */}
      <div className="comic-rays"></div>
      
      {/* Comic elements */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
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
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </motion.div>
        
        {/* Sparkles */}
        {[...Array(5)].map((_, i) => (
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
              top: `${Math.random() * 80 + 10}%`,
              right: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
        
        {/* Main speech bubble with memory game text */}
        <motion.div 
          className="speech-bubble w-4/5 max-w-lg aspect-[4/3] flex flex-col items-center justify-center py-8 px-4 z-10"
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
            className="comic-text text-7xl sm:text-8xl font-bold text-amber-400 mb-6"
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
              <button className="btn-play text-xl font-bold px-12 py-3 flex items-center">
                PLAY
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  className="ml-2"
                >
                  <Play size={24} />
                </motion.span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Comic style accents */}
        {[...Array(4)].map((_, i) => (
          <motion.div 
            key={`accent-${i}`}
            className="absolute w-12 h-2 bg-black rounded-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + (i * 0.1) }}
            style={{
              transform: `rotate(${i * 45}deg)`,
              top: `${20 + (i * 15)}%`,
              left: `${15 + (i * 5)}%`
            }}
          />
        ))}
        
        {/* Action lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={`line-${i}`}
            className="absolute w-16 h-1 bg-black rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + (i * 0.1) }}
            style={{
              transform: `rotate(${-30 + (i * 30)}deg)`,
              top: `${60 + (i * 10)}%`,
              right: `${15 + (i * 8)}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;

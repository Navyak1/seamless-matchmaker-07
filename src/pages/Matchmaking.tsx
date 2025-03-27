
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MatchmakingCard from '@/components/matchmaking/MatchmakingCard';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Matchmaking = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/5">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Let's Play Together!
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Click the button below to find a match and start playing with others around the world.
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MatchmakingCard
              title="Find a Game"
              description="Join a fun match with other players and test your picture recognition skills!"
              icon={<Users className="h-6 w-6 text-primary" />}
              to="/public-game"
              primary
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matchmaking;


import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MatchmakingCard from '@/components/matchmaking/MatchmakingCard';
import { Users, Lock } from 'lucide-react';

const Matchmaking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Game Mode</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select how you want to play today. Jump into a public game with random players or create a private game with friends.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <MatchmakingCard
              title="Public Game"
              description="Instant matchmaking with random players from around the world."
              icon={<Users className="h-6 w-6 text-primary" />}
              to="/public-game"
              primary
            />
            
            <MatchmakingCard
              title="Private Game"
              description="Create a private game and invite your friends with a shareable link."
              icon={<Lock className="h-6 w-6 text-foreground" />}
              to="/private-game"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matchmaking;

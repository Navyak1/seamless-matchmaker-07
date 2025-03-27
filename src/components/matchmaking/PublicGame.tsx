
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FindingOpponents from './FindingOpponents';
import { useNavigate } from 'react-router-dom';

const PublicGame = () => {
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="rounded-2xl glass-card p-8">
      {!isSearching ? (
        <>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-medium">Public Game</h2>
          </div>
          
          <p className="text-muted-foreground mb-8 text-center">
            Join a public game with random players from around the world. We'll match you with players of similar skill.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold mb-1">2,543</div>
              <div className="text-xs text-muted-foreground">Players Online</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold mb-1">~30s</div>
              <div className="text-xs text-muted-foreground">Avg. Wait Time</div>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsSearching(true)} 
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Find Game Now
          </Button>
        </>
      ) : (
        <FindingOpponents onCancel={() => setIsSearching(false)} />
      )}
    </div>
  );
};

export default PublicGame;

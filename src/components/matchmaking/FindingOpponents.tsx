
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FindingOpponentsProps {
  onCancel: () => void;
}

const FindingOpponents = ({ onCancel }: FindingOpponentsProps) => {
  const [searchTime, setSearchTime] = useState(0);
  const [foundPlayers, setFoundPlayers] = useState(1);
  const [matchFound, setMatchFound] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchTime(prev => prev + 1);
      
      // Simulate finding players over time
      if (searchTime > 2 && foundPlayers < 4 && Math.random() > 0.7) {
        setFoundPlayers(prev => Math.min(prev + 1, 4));
      }
      
      // Simulate match found after some time
      if (searchTime > 5 && foundPlayers === 4) {
        setMatchFound(true);
        clearInterval(interval);
        
        // Redirect to game lobby after a delay
        setTimeout(() => {
          navigate('/game-lobby');
        }, 2000);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [searchTime, foundPlayers, navigate]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl glass-card">
      {!matchFound ? (
        <>
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-10 w-10 text-primary animate-pulse-soft" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
          </div>
          
          <h2 className="text-2xl font-medium mb-2">Finding Opponents</h2>
          <p className="text-muted-foreground mb-6">Search time: {formatTime(searchTime)}</p>
          
          <div className="flex justify-center items-center space-x-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                  i < foundPlayers 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < foundPlayers ? i + 1 : "?"}
              </div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Found {foundPlayers} of 4 players
          </p>
          
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <div className="animate-scale-in">
          <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-medium mb-2 text-center">Match Found!</h2>
          <p className="text-muted-foreground text-center">
            Joining game lobby...
          </p>
        </div>
      )}
    </div>
  );
};

export default FindingOpponents;

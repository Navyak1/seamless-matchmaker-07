
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, Trophy, ArrowLeft, Timer } from 'lucide-react';

const GameLobby = () => {
  const [countdown, setCountdown] = useState(5);
  const [players, setPlayers] = useState([
    { id: 1, name: 'You', status: 'Ready', avatar: '👤' },
    { id: 2, name: 'Player 2', status: 'Ready', avatar: '👤' },
    { id: 3, name: 'Player 3', status: 'Ready', avatar: '👤' },
    { id: 4, name: 'Player 4', status: 'Ready', avatar: '👤' },
  ]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      toast.success('Game started!');
      // Redirect to the game page
      navigate('/game');
    }
  }, [countdown, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/matchmaking')} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Matchmaking
            </Button>
            <div className="flex items-center space-x-2 bg-secondary/50 rounded-full px-4 py-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm">4/4 Players</span>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">Game Lobby</h1>
              <div className="bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                Game starting in: {countdown}s
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {players.map((player) => (
                <div 
                  key={player.id}
                  className="flex items-center space-x-4 bg-secondary/40 rounded-lg p-4 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {player.avatar}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">
                      {player.name} {player.id === 1 && '(You)'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Status: {player.status}
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              ))}
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 backdrop-blur-sm border border-border/50">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-medium">Picture Reveal Game Rules</h2>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  Click "Reveal Picture" to see a hidden image
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  Choose the correct option that matches the image
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  Earn 10 points for each correct answer
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  The player with the most points wins!
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Experiencing issues? <a href="#" className="text-primary hover:underline">Report a problem</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameLobby;

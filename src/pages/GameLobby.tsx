
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Users, Trophy, ArrowLeft, Timer, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import soundManager from '@/utils/sound';

const GameLobby = () => {
  const [countdown, setCountdown] = useState(5);
  const [players, setPlayers] = useState([
    { id: 1, name: 'You', status: 'Ready', avatar: '👤', joined: false },
  ]);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add players one by one with a delay
    const playerData = [
      { id: 2, name: 'Player 2', status: 'Ready', avatar: '👤', joined: false },
      { id: 3, name: 'Player 3', status: 'Ready', avatar: '👤', joined: false },
      { id: 4, name: 'Player 4', status: 'Ready', avatar: '👤', joined: false },
    ];
    
    playerData.forEach((player, index) => {
      setTimeout(() => {
        setPlayers(prev => {
          const newPlayer = {...player, joined: true};
          soundManager.play('playerJoin');
          toast.success(`${player.name} joined the game!`);
          return [...prev, newPlayer];
        });
      }, (index + 1) * 2000); // Add a player every 2 seconds
    });
  }, []);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown <= 3) {
          soundManager.play('countdown');
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      soundManager.play('gameStart');
      toast.success('Game started!');
      // Redirect to the game page
      navigate('/game');
    }
  }, [countdown, navigate]);
  
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    soundManager.setMuted(newMuted);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/5">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/matchmaking')} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Matchmaking
            </Button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-secondary/50 rounded-full px-4 py-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">{players.length}/4 Players</span>
              </div>
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
          
          <motion.div 
            className="playful-card p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Game Lobby</h1>
              <motion.div 
                className="bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium flex items-center"
                animate={{ 
                  scale: countdown <= 3 ? [1, 1.1, 1] : 1,
                  transition: { 
                    repeat: countdown <= 3 ? Infinity : 0,
                    duration: 0.5
                  }
                }}
              >
                <Timer className="h-4 w-4 mr-1" />
                Game starting in: {countdown}s
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {players.map((player) => (
                <motion.div 
                  key={player.id}
                  className={`flex items-center space-x-4 bg-secondary/40 rounded-lg p-4 backdrop-blur-sm ${player.joined ? 'player-joined' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg"
                    animate={{ rotate: player.joined ? [0, 15, -15, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {player.avatar}
                  </motion.div>
                  <div className="flex-grow">
                    <div className="font-medium">
                      {player.name} {player.id === 1 && '(You)'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Status: {player.status}
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </motion.div>
              ))}
              
              {Array.from({ length: 4 - players.length }).map((_, i) => (
                <motion.div 
                  key={`empty-${i}`}
                  className="flex items-center justify-center bg-secondary/30 rounded-lg p-4 border border-dashed border-muted-foreground/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * i }}
                >
                  <span className="text-muted-foreground text-sm">Waiting for player...</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="bg-secondary/30 rounded-lg p-6 backdrop-blur-sm border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-medium">Picture Reveal Game Rules</h2>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  Click on the tiles to reveal parts of a hidden image
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  After all tiles are revealed, choose the correct option that matches the image
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  Earn 10 points for each correct answer
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  The player with the most points when the timer ends wins!
                </li>
              </ul>
            </motion.div>
          </motion.div>
          
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

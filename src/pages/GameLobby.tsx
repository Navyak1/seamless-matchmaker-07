
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
    <div className="min-h-screen flex flex-col bg-[#1A1F2C] overflow-hidden">
      {/* Enhanced multi-color background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-black/50"></div>
        {/* Color spots/highlights */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px]"></div>
      </div>
      
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/matchmaking')} className="flex items-center text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Matchmaking
            </Button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-secondary/30 rounded-full px-4 py-1 backdrop-blur-sm">
                <Users className="h-4 w-4 text-secondary" />
                <span className="text-sm text-white">{players.length}/4 Players</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute}
                className="h-8 w-8 text-white"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <motion.div 
            className="rounded-2xl p-8 mb-8 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(20, 20, 35, 0.5)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* Decorative color elements inside the card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 filter blur-[50px]"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-accent/10 filter blur-[50px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-secondary/5 filter blur-[60px] rounded-full"></div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Game Lobby</h1>
              <motion.div 
                className="bg-primary/10 text-white rounded-full px-4 py-1 text-sm font-medium flex items-center"
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
              {players.map((player, index) => (
                <motion.div 
                  key={player.id}
                  className={`flex items-center space-x-4 rounded-lg p-4 backdrop-blur-sm ${player.joined ? 'player-joined' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: index % 3 === 0 ? 'rgba(236, 72, 153, 0.15)' : 
                              index % 3 === 1 ? 'rgba(139, 92, 246, 0.15)' : 
                              'rgba(234, 179, 8, 0.15)',
                    borderLeft: index % 3 === 0 ? '3px solid rgba(236, 72, 153, 0.5)' : 
                              index % 3 === 1 ? '3px solid rgba(139, 92, 246, 0.5)' : 
                              '3px solid rgba(234, 179, 8, 0.5)'
                  }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    animate={{ rotate: player.joined ? [0, 15, -15, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: index % 3 === 0 ? 'rgba(236, 72, 153, 0.2)' : 
                                index % 3 === 1 ? 'rgba(139, 92, 246, 0.2)' : 
                                'rgba(234, 179, 8, 0.2)',
                      color: index % 3 === 0 ? 'rgb(236, 72, 153)' : 
                             index % 3 === 1 ? 'rgb(139, 92, 246)' : 
                             'rgb(234, 179, 8)'
                    }}
                  >
                    {player.avatar}
                  </motion.div>
                  <div className="flex-grow">
                    <div className="font-medium text-white">
                      {player.name} {player.id === 1 && '(You)'}
                    </div>
                    <div className="text-xs text-white/70">
                      Status: {player.status}
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </motion.div>
              ))}
              
              {Array.from({ length: 4 - players.length }).map((_, i) => (
                <motion.div 
                  key={`empty-${i}`}
                  className="flex items-center justify-center rounded-lg p-4 border border-dashed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * i }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: i % 3 === 0 ? 'rgba(236, 72, 153, 0.3)' : 
                                i % 3 === 1 ? 'rgba(139, 92, 246, 0.3)' : 
                                'rgba(234, 179, 8, 0.3)'
                  }}
                >
                  <span className="text-white/50 text-sm">Waiting for player...</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="rounded-lg p-6 backdrop-blur-sm border border-white/10 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(234, 179, 8, 0.1) 100%)'
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-medium text-white">Picture Reveal Game Rules</h2>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                  Click on the tiles to reveal parts of a hidden image
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></div>
                  After all tiles are revealed, choose the correct option that matches the image
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></div>
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
            <p className="text-white/60 text-sm">
              Experiencing issues? <a href="#" className="text-primary hover:underline">Report a problem</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameLobby;

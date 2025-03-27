
import React, { useState } from 'react';
import { Copy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PrivateGame = () => {
  const [inviteLink, setInviteLink] = useState(`https://seamless.game/invite/${generateInviteCode()}`);
  const [players, setPlayers] = useState([{ id: 1, name: 'You (Host)', status: 'Ready' }]);
  const navigate = useNavigate();
  
  function generateInviteCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard');
  };
  
  const startGame = () => {
    toast.success('Starting game with current players');
    navigate('/game-lobby');
  };
  
  // Simulate a player joining every few seconds (for demo purposes)
  React.useEffect(() => {
    if (players.length < 4) {
      const timeout = setTimeout(() => {
        const newPlayer = {
          id: players.length + 1,
          name: `Player ${players.length + 1}`,
          status: Math.random() > 0.3 ? 'Ready' : 'Waiting...'
        };
        setPlayers([...players, newPlayer]);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [players]);
  
  return (
    <div className="rounded-2xl glass-card p-8">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-medium">Private Game</h2>
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Share this invite link with friends
        </label>
        <div className="flex">
          <Input 
            value={inviteLink} 
            readOnly 
            className="rounded-r-none"
          />
          <Button 
            onClick={copyInviteLink}
            className="rounded-l-none"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Players ({players.length}/4)</h3>
        <div className="space-y-2">
          {players.map(player => (
            <div 
              key={player.id}
              className="flex items-center justify-between bg-secondary/50 rounded-lg p-3"
            >
              <span>{player.name}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                player.status === 'Ready' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {player.status}
              </span>
            </div>
          ))}
          
          {Array.from({ length: 4 - players.length }).map((_, i) => (
            <div 
              key={`empty-${i}`}
              className="flex items-center justify-center bg-secondary/30 rounded-lg p-3 border border-dashed border-muted-foreground/30"
            >
              <span className="text-muted-foreground text-sm">Waiting for player...</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/matchmaking')}>
          Cancel
        </Button>
        <Button onClick={startGame} disabled={players.length < 2}>
          Start Game ({players.length}/4)
        </Button>
      </div>
    </div>
  );
};

export default PrivateGame;


import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Game = () => {
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentImage, setCurrentImage] = useState(1);
  const navigate = useNavigate();
  
  // Start the timer when component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          toast.info("Time's up! Game ended.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      toast.success("Image revealed! Make your guess now.");
    }
  };
  
  const handleGuess = (correct: boolean) => {
    if (correct) {
      setScore(score + 10);
      toast.success("Correct guess! +10 points");
    } else {
      toast.error("Wrong guess! Try again");
    }
    
    // Move to next image
    setCurrentImage((prev) => (prev % 3) + 1);
    setRevealed(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/matchmaking')} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Exit Game
            </Button>
            <div className="flex items-center space-x-4">
              <div className="bg-secondary/50 rounded-full px-4 py-1 flex items-center">
                <Eye className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">Score: {score}</span>
              </div>
              <div className="bg-secondary/50 rounded-full px-4 py-1 flex items-center">
                <span className="text-sm font-medium">Time: {timeLeft}s</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-8 mb-8">
            <h1 className="text-2xl font-bold mb-6">Picture Reveal Game</h1>
            
            <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-lg border-2 border-border">
              <img 
                src={`/game-image-${currentImage}.jpg`} 
                alt="Hidden Picture" 
                className="w-full h-full object-cover"
              />
              
              {!revealed && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center">
                  <Button 
                    onClick={handleReveal} 
                    size="lg" 
                    className="animate-pulse-soft flex items-center"
                  >
                    <EyeOff className="mr-2 h-5 w-5" />
                    Reveal Picture
                  </Button>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-medium">What is this picture showing?</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleGuess(true)} 
                  disabled={!revealed} 
                  variant="outline" 
                  className="p-6 h-auto text-left justify-start"
                >
                  <div>
                    <div className="font-medium mb-1">A Mountain Landscape</div>
                    <div className="text-sm text-muted-foreground">Snowy peaks and clear blue sky</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleGuess(false)} 
                  disabled={!revealed} 
                  variant="outline" 
                  className="p-6 h-auto text-left justify-start"
                >
                  <div>
                    <div className="font-medium mb-1">An Ocean View</div>
                    <div className="text-sm text-muted-foreground">Waves crashing on sandy beach</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleGuess(false)} 
                  disabled={!revealed} 
                  variant="outline" 
                  className="p-6 h-auto text-left justify-start"
                >
                  <div>
                    <div className="font-medium mb-1">A City Skyline</div>
                    <div className="text-sm text-muted-foreground">Urban buildings at night</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleGuess(false)} 
                  disabled={!revealed} 
                  variant="outline" 
                  className="p-6 h-auto text-left justify-start"
                >
                  <div>
                    <div className="font-medium mb-1">A Forest Trail</div>
                    <div className="text-sm text-muted-foreground">Dense trees with sunlight</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;

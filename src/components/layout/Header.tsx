
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Gamepad, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Gamepad className="w-4 h-4 text-white" />
            <div className="absolute inset-0 rounded-full animate-ping-slow bg-primary/20"></div>
          </div>
          <span className="font-semibold text-lg">Seamless</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/matchmaking" className="nav-link text-foreground/80 hover:text-foreground transition-colors">
            Play Now
          </Link>
          <Link to="/about" className="nav-link text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>2.5k Online</span>
          </Button>
          <Link to="/matchmaking">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Play Now
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

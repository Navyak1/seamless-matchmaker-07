
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 backdrop-blur-sm border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Gamepad className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Seamless</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              A modern matchmaking platform for gamers, designed with simplicity and elegance in mind.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/matchmaking" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
                  Play Now
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover-scale text-muted-foreground hover:text-foreground" aria-label="Github">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover-scale text-muted-foreground hover:text-foreground" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} Seamless Matchmaking. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

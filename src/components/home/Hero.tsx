
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight, Gamepad, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10 bg-[#1A1F2C]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-black/50"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Users className="mr-1.5 h-3.5 w-3.5" />
          <span>2,500+ players online now</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent leading-tight max-w-4xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Picture Reveal Puzzle!
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Jump into games instantly with auto-matchmaking. No codes, no waiting — just pure gameplay with players around the world.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Link to="/matchmaking">
            <AnimatedButton size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Play Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </Link>
          
          <Link to="/about">
            <AnimatedButton variant="outline" size="lg">
              Learn More
            </AnimatedButton>
          </Link>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="frosted rounded-2xl p-6 hover-scale bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Auto-Matchmaking</h3>
            <p className="text-white/70 text-sm">Instantly pair with players of similar skill level</p>
          </div>
          
          <div className="frosted rounded-2xl p-6 hover-scale bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Gamepad className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Private Lobbies</h3>
            <p className="text-white/70 text-sm">Create private games and invite your friends</p>
          </div>
          
          <div className="frosted rounded-2xl p-6 hover-scale bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Instant Gaming</h3>
            <p className="text-white/70 text-sm">No complicated setups or downloads required</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Gamepad, Users, Target, Trophy } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 page-transition">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Seamless</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A modern matchmaking platform designed with simplicity and elegance in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Seamless, we believe that gaming should be about the experience, not the setup. Our mission is to eliminate friction from multiplayer gaming, allowing players to focus on what matters most: having fun.
              </p>
              <p className="text-muted-foreground">
                We've designed our platform to be intuitive, elegant, and reliable, removing unnecessary complexity from the matchmaking process.
              </p>
            </div>
            
            <div className="frosted rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Gamepad className="h-16 w-16 text-primary/50" />
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Why Choose Seamless?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="frosted rounded-2xl p-8 hover-scale">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Simplicity First</h3>
                <p className="text-muted-foreground">
                  No codes to share, no complicated setup. Just click and play with friends or random opponents.
                </p>
              </div>
              
              <div className="frosted rounded-2xl p-8 hover-scale">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Global Community</h3>
                <p className="text-muted-foreground">
                  Connect with thousands of players from around the world, all sharing your passion for gaming.
                </p>
              </div>
              
              <div className="frosted rounded-2xl p-8 hover-scale">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Fair Matchmaking</h3>
                <p className="text-muted-foreground">
                  Our advanced algorithms ensure you're paired with players of similar skill level for balanced gameplay.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Play?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of players already enjoying our seamless matchmaking experience.
            </p>
            
            <a href="/matchmaking" className="inline-block bg-gradient-to-r from-primary to-accent text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Start Playing Now
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

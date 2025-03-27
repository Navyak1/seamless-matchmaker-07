
import React from 'react';
import Header from '@/components/layout/Header';
import PublicGameComponent from '@/components/matchmaking/PublicGame';

const PublicGame = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 flex items-center justify-center page-transition">
        <PublicGameComponent />
      </main>
    </div>
  );
};

export default PublicGame;

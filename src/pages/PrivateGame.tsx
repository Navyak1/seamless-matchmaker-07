
import React from 'react';
import Header from '@/components/layout/Header';
import PrivateGameComponent from '@/components/matchmaking/PrivateGame';

const PrivateGame = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-6 flex items-center justify-center page-transition">
        <PrivateGameComponent />
      </main>
    </div>
  );
};

export default PrivateGame;

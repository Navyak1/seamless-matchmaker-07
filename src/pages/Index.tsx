
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C] text-white overflow-hidden">
      <Header />
      <main className="flex-grow page-transition">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

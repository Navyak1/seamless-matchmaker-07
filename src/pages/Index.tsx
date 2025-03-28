
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 overflow-hidden relative">
      {/* Cool colors background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-white"></div>
        {/* Color spots/highlights */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-100/40 rounded-full filter blur-[80px]"></div>
      </div>
      
      <Header />
      <main className="flex-grow page-transition relative z-10">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

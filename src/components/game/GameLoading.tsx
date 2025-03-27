
import React from 'react';

const GameLoading = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="ml-4 text-lg">Generating new AI image...</p>
    </div>
  );
};

export default GameLoading;

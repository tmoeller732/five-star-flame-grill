
import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface FlameEffectProps {
  isVisible: boolean;
}

const FlameEffect: React.FC<FlameEffectProps> = ({ isVisible }) => {
  return (
    <div 
      className={`fixed right-8 top-1/3 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
    >
      <div className="relative">
        <Flame 
          size={64} 
          className="text-grill-orange animate-flame filter drop-shadow-lg"
          strokeWidth={1.5}
        />
        <Flame 
          size={48} 
          className="absolute top-6 left-2 text-grill-gold animate-flame-slow filter drop-shadow-lg"
          strokeWidth={1.5}
        />
        <Flame 
          size={36} 
          className="absolute top-10 left-4 text-yellow-400 animate-flame filter drop-shadow-lg"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};

export default FlameEffect;

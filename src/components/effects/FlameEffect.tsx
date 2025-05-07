
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
      <div className="relative flame-container">
        {/* Main flame */}
        <Flame 
          size={72} 
          className="text-grill-orange animate-flame-intense filter drop-shadow-lg"
          strokeWidth={1.5}
        />
        
        {/* Inner flames with different colors and animations */}
        <Flame 
          size={56} 
          className="absolute top-3 left-2 text-yellow-500 animate-flame-slow filter drop-shadow-lg"
          strokeWidth={1.5}
        />
        <Flame 
          size={42} 
          className="absolute top-7 left-4 text-yellow-300 animate-flame filter drop-shadow-lg"
          strokeWidth={1.5}
        />
        
        {/* Small embers/sparks */}
        <div className="absolute top-0 left-6 w-2 h-2 bg-yellow-200 rounded-full animate-ember-1"></div>
        <div className="absolute top-2 right-6 w-1 h-1 bg-yellow-100 rounded-full animate-ember-2"></div>
        <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ember-3"></div>
        
        {/* Flame base glow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-orange-600/30 rounded-full blur-md animate-glow"></div>
      </div>
    </div>
  );
};

export default FlameEffect;

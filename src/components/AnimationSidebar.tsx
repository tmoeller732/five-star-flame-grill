
import React from 'react';

interface AnimationSidebarProps {
  isVisible: boolean;
}

const AnimationSidebar: React.FC<AnimationSidebarProps> = ({ isVisible }) => {
  return (
    <div 
      className={`fixed right-0 top-0 h-full w-40 pointer-events-none z-50 transition-opacity duration-300 flex items-center justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <img 
          src="/flame-animation.webp"
          alt="Flame animation"
          className="h-full w-full object-cover mix-blend-screen animate-flame"
        />
      </div>
    </div>
  );
};

export default AnimationSidebar;

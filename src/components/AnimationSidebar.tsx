
import React from 'react';

interface AnimationSidebarProps {
  isVisible: boolean;
}

const AnimationSidebar: React.FC<AnimationSidebarProps> = ({ isVisible }) => {
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 h-40 pointer-events-none z-[-1] transition-opacity duration-300 flex items-center justify-center ${
        isVisible ? 'opacity-70' : 'opacity-0'
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

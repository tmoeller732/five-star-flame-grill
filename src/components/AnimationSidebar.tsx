
import React, { useState, useEffect } from 'react';

interface AnimationSidebarProps {
  isVisible: boolean;
}

const AnimationSidebar: React.FC<AnimationSidebarProps> = ({ isVisible }) => {
  // Video paths - you'll need to upload your webp animation
  const videoPath = '/flame-animation.webp';

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-40 pointer-events-none z-50 transition-opacity duration-300 flex items-center justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="h-full w-full object-cover mix-blend-screen"
        >
          <source src={videoPath} type="video/webp" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default AnimationSidebar;

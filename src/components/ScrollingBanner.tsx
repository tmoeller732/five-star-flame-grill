
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const ScrollingBanner = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      className={`fixed w-full top-0 z-[60] transition-all duration-300 ${
        scrollPosition > 10 ? 'shadow-md' : ''
      }`}
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
        backgroundSize: 'cover'
      }}
    >
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee py-2">
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium mx-2 text-white">
              Open 7 Days a Week | Daily Specials
            </span>
            <span className="text-sm font-medium mx-2 text-grill-orange">
              |
            </span>
            <div className="flex items-center">
              <Phone size={16} className="text-grill-orange mr-1" />
              <span className="text-sm font-medium text-white">
                Call (856) 559-4938 to order direct
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;

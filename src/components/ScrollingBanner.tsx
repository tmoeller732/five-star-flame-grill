
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

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
      className={`fixed w-full top-0 z-[60] bg-white transition-all duration-300 ${
        scrollPosition > 10 ? 'shadow-md' : ''
      }`}
    >
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee py-2">
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium mx-2 text-grill-black">
              Ordering Apps Ready In:
            </span>
            <CountdownTimer className="inline-flex items-center mx-2" />
            <span className="text-sm font-medium mx-2 text-grill-orange">
              |
            </span>
            <div className="flex items-center">
              <Phone size={16} className="text-grill-orange mr-1" />
              <span className="text-sm font-medium text-grill-black">
                Call (555) 123-4567 to order direct
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;

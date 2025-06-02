
import { useState, useEffect } from 'react';
import { Phone, Star, Gift } from 'lucide-react';

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
  
  const bannerItems = [
    {
      icon: <Phone size={16} className="text-grill-orange mr-1" />,
      text: "Call (856) 559-4938 to order direct"
    },
    {
      icon: <Star size={16} className="text-grill-gold mr-1" />,
      text: "Earn 1 point per $1 spent • Get $10 off every 100 points"
    },
    {
      icon: <Gift size={16} className="text-grill-gold mr-1" />,
      text: "Join our loyalty program and save on every order"
    }
  ];
  
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
          <div className="flex items-center justify-center space-x-8">
            <span className="text-sm font-medium text-white">
              Open 7 Days a Week | Daily Specials
            </span>
            
            {bannerItems.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-sm font-medium text-grill-orange">|</span>
                <div className="flex items-center">
                  {item.icon}
                  <span className="text-sm font-medium text-white">
                    {item.text}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;

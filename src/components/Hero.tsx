
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grill-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-grill-black/70 via-transparent to-grill-black" />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-8">
              <div className="relative -mt-24">
                <img 
                  src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                  alt="5 Star Grill Logo" 
                  className="h-40 md:h-56 animate-flame-slow flame-animation"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair">
              Toms River's <span className="text-grill-gold">Culinary Gem</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Serving the finest American classics, Spanish delights, and fresh salads since 2025
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                asChild
                className="bg-grill-gold hover:bg-grill-orange text-grill-black text-lg px-6 py-6"
              >
                <Link to="/menu">
                  View Our Menu <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-grill-gold text-grill-gold hover:bg-grill-gold/10 text-lg px-6 py-6"
              >
                <Link to="/order">
                  Order Online <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 text-grill-gold font-medium">
              Open 7 Days a Week | Daily Specials
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="animate-bounce">
          <a 
            href="#featured"
            aria-label="Scroll down to featured"
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 text-white/60 hover:border-white/50 hover:text-white/80 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

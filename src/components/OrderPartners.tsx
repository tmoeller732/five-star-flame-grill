
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import { useLanguage } from '../contexts/LanguageContext';

const OrderPartners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('order-partners');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="order-partners" className="py-16 bg-grill-black relative overflow-hidden">
      {/* Background animation effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-grill-gold/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-grill-gold/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-playfair mb-4 text-grill-gold">{t('orderPartners.title')}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('orderPartners.subtitle')}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Order Pickup - First Position */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-32 flex items-center justify-center mb-6 relative">
              <img 
                src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                alt="5 Star Direct" 
                className="h-24 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <Button 
              asChild
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              <Link to="/menu" className="flex items-center justify-center">
                {t('order.pickup')}
              </Link>
            </Button>
          </div>

          {/* GrubHub - Second Position */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-32 flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/328cfcfd-602a-46f6-83d2-88419ec75beb.png" 
                alt="GrubHub Logo" 
                className="h-24 object-contain hover:scale-110 transition-transform duration-300 pulse-glow"
              />
            </div>
            <Button 
              asChild
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black mb-4"
            >
              <a href="#" className="flex items-center justify-center">
                {t('order.grubhub')}
              </a>
            </Button>
            <CountdownTimer className="inline-flex justify-center w-full" />
          </div>

          {/* DoorDash - Third Position */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-32 flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/3023517f-db29-4fe3-a755-849d2a497738.png" 
                alt="DoorDash Logo" 
                className="h-24 object-contain hover:scale-110 transition-transform duration-300 pulse-glow"
              />
            </div>
            <Button 
              asChild
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black mb-4"
            >
              <a href="#" className="flex items-center justify-center">
                {t('order.doordash')}
              </a>
            </Button>
            <CountdownTimer className="inline-flex justify-center w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPartners;

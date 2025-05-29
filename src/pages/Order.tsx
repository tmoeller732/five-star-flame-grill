
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import CountdownTimer from '../components/CountdownTimer';

const Order = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleOptionHover = (option: string) => {
    setActiveOption(option);
  };

  return (
    <>
      <Helmet>
        <title>Online Ordering | 5 Star Grill | Toms River, NJ</title>
        <meta name="description" content="Order online from 5 Star Grill in Toms River, NJ. Enjoy our delicious breakfast, lunch, and dinner options with easy pickup or delivery." />
        <meta name="keywords" content="online ordering, food delivery, pickup, restaurant, Toms River, NJ, 5 Star Grill" />
      </Helmet>
      
      <Header />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Online Ordering</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Order your favorite 5 Star Grill dishes for pickup or delivery. 
              Choose your preferred ordering method below.
            </p>
            <div className="mt-6 mb-2 text-grill-gold font-medium text-lg">
              Open 7 Days a Week | Daily Specials
            </div>
          </div>
          
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Pickup - First Position */}
              <div 
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${activeOption === 'pickup' ? 'scale-105 border-2 border-grill-gold' : 'hover:-translate-y-1'}`}
                onMouseEnter={() => handleOptionHover('pickup')}
                onMouseLeave={() => setActiveOption(null)}
              >
                <div className="h-32 flex items-center justify-center mb-6 relative">
                  <img 
                    src="/lovable-uploads/1769fc8b-f400-416e-ad38-c763a0dfa09a.png" 
                    alt="5 Star Direct" 
                    className={`h-24 object-contain transition-all duration-300 ${activeOption === 'pickup' ? 'scale-110' : ''}`}
                  />
                </div>
                <h3 className="text-xl text-center font-bold mb-3 text-grill-gold">Order Pickup</h3>
                <p className="text-gray-300 text-sm mb-4 text-center">Order directly from us for the best experience and savings.</p>
                <Button 
                  asChild
                  className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                >
                  <Link to="/menu" className="flex items-center justify-center">
                    Continue to Menu
                  </Link>
                </Button>
              </div>

              {/* GrubHub Option - Second Position */}
              <div 
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${activeOption === 'grubhub' ? 'scale-105 border-2 border-grill-gold' : 'hover:-translate-y-1'}`}
                onMouseEnter={() => handleOptionHover('grubhub')}
                onMouseLeave={() => setActiveOption(null)}
              >
                <div className="h-32 flex items-center justify-center mb-6">
                  <img 
                    src="/lovable-uploads/328cfcfd-602a-46f6-83d2-88419ec75beb.png" 
                    alt="GrubHub Logo" 
                    className={`h-24 object-contain transition-all duration-300 ${activeOption === 'grubhub' ? 'scale-110 pulse-glow' : ''}`}
                  />
                </div>
                <h3 className="text-xl text-center font-bold mb-3 text-grill-gold">Order with GrubHub</h3>
                <p className="text-gray-300 text-sm mb-4 text-center">Fast delivery through GrubHub's extensive delivery network.</p>
                <Button 
                  asChild
                  className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                >
                  <a href="#" className="flex items-center justify-center">
                    Continue to GrubHub
                  </a>
                </Button>
                <div className="mt-4">
                  <CountdownTimer className="inline-flex justify-center w-full" />
                </div>
              </div>

              {/* DoorDash Option - Third Position */}
              <div 
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${activeOption === 'doordash' ? 'scale-105 border-2 border-grill-gold' : 'hover:-translate-y-1'}`}
                onMouseEnter={() => handleOptionHover('doordash')}
                onMouseLeave={() => setActiveOption(null)}
              >
                <div className="h-32 flex items-center justify-center mb-6">
                  <img 
                    src="/lovable-uploads/3023517f-db29-4fe3-a755-849d2a497738.png" 
                    alt="DoorDash Logo" 
                    className={`h-24 object-contain transition-all duration-300 ${activeOption === 'doordash' ? 'scale-110 pulse-glow' : ''}`}
                  />
                </div>
                <h3 className="text-xl text-center font-bold mb-3 text-grill-gold">Order with DoorDash</h3>
                <p className="text-gray-300 text-sm mb-4 text-center">Reliable delivery and tracking through DoorDash.</p>
                <Button 
                  asChild
                  className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                >
                  <a href="#" className="flex items-center justify-center">
                    Continue to DoorDash
                  </a>
                </Button>
                <div className="mt-4">
                  <CountdownTimer className="inline-flex justify-center w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Direct Ordering Section */}
          <div id="direct-ordering" className={`bg-card p-6 rounded-lg shadow-lg max-w-3xl mx-auto hover:shadow-2xl transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <h2 className="text-2xl font-bold text-center text-grill-gold mb-6">5 Star Direct Ordering</h2>
            <p className="text-center text-xl mb-8">
              Our online ordering system is coming soon!
            </p>
            
            <div className="text-center">
              <p className="mb-4">For now, please call us to place your order:</p>
              <a 
                href="tel:+18565594938" 
                className="text-2xl font-medium text-grill-gold hover:text-grill-orange transition-colors hover:scale-105 inline-block transform"
              >
                (856) 559-4938
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Order;

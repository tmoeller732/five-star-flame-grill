
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import runwareService from '../services/RunwareService';

const Order = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [directLogoUrl, setDirectLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeOption, setActiveOption] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    async function generateLogo() {
      try {
        setIsLoading(true);
        const result = await runwareService.generateImage({
          positivePrompt: "A professional, clean logo that says '5 Star Direct' with a flame icon, on transparent background, flat design, minimalist",
          width: 512,
          height: 256
        });
        setDirectLogoUrl(result.imageURL);
      } catch (error) {
        console.error("Failed to generate logo:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    generateLogo();
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
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Online Ordering</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Order your favorite 5 Star Grill dishes for pickup or delivery. 
              Choose your preferred ordering method below.
            </p>
          </div>
          
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* GrubHub Option */}
              <div 
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${activeOption === 'grubhub' ? 'scale-105 border-2 border-grill-gold' : 'hover:-translate-y-1'}`}
                onMouseEnter={() => handleOptionHover('grubhub')}
                onMouseLeave={() => setActiveOption(null)}
              >
                <div className="h-32 flex items-center justify-center mb-6">
                  <img 
                    src="https://logowik.com/content/uploads/images/grubhub5225.jpg" 
                    alt="GrubHub Logo" 
                    className={`h-24 object-contain transition-all duration-300 ${activeOption === 'grubhub' ? 'scale-110' : ''}`}
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
              </div>

              {/* DoorDash Option */}
              <div 
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${activeOption === 'doordash' ? 'scale-105 border-2 border-grill-gold' : 'hover:-translate-y-1'}`}
                onMouseEnter={() => handleOptionHover('doordash')}
                onMouseLeave={() => setActiveOption(null)}
              >
                <div className="h-32 flex items-center justify-center mb-6">
                  <img 
                    src="https://logowik.com/content/uploads/images/doordash5214.jpg" 
                    alt="DoorDash Logo" 
                    className={`h-24 object-contain transition-all duration-300 ${activeOption === 'doordash' ? 'scale-110' : ''}`}
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
              </div>

              {/* 5 Star Direct Option */}
              <div 
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${activeOption === 'direct' ? 'scale-105 border-2 border-grill-gold' : 'hover:-translate-y-1'}`}
                onMouseEnter={() => handleOptionHover('direct')}
                onMouseLeave={() => setActiveOption(null)}
              >
                <div className="h-32 flex items-center justify-center mb-6 relative">
                  {isLoading ? (
                    <div className="animate-pulse bg-gray-300 h-24 w-full rounded"></div>
                  ) : directLogoUrl ? (
                    <img 
                      src={directLogoUrl} 
                      alt="5 Star Direct" 
                      className={`h-24 object-contain transition-all duration-300 ${activeOption === 'direct' ? 'scale-110' : ''}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-grill-gold">
                      <span className="text-2xl font-bold">5 Star Direct</span>
                      <div className="text-4xl">🔥</div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl text-center font-bold mb-3 text-grill-gold">Order Direct</h3>
                <p className="text-gray-300 text-sm mb-4 text-center">Order directly from us for the best experience and savings.</p>
                <Button 
                  className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
                  onClick={() => {
                    document.getElementById('direct-ordering')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Order Direct
                </Button>
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

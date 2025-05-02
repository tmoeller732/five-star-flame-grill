
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import runwareService from '../services/RunwareService';
import { Button } from '@/components/ui/button';

const OrderPartners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [directLogoUrl, setDirectLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
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

  return (
    <section id="order-partners" className="py-16 bg-grill-black">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-playfair mb-4 text-grill-gold">Order With Our Partners</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get your favorite grilled dishes delivered right to your door through our delivery partners.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* GrubHub */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-32 flex items-center justify-center mb-6">
              <img 
                src="https://logowik.com/content/uploads/images/grubhub5225.jpg" 
                alt="GrubHub Logo" 
                className="h-24 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <Button 
              asChild
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              <a href="#" className="flex items-center justify-center">
                Order on GrubHub
              </a>
            </Button>
          </div>

          {/* DoorDash */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-32 flex items-center justify-center mb-6">
              <img 
                src="https://logowik.com/content/uploads/images/doordash5214.jpg" 
                alt="DoorDash Logo" 
                className="h-24 object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
            <Button 
              asChild
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              <a href="#" className="flex items-center justify-center">
                Order on DoorDash
              </a>
            </Button>
          </div>

          {/* 5 Star Direct */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-32 flex items-center justify-center mb-6 relative">
              {isLoading ? (
                <div className="animate-pulse bg-gray-300 h-24 w-full rounded"></div>
              ) : directLogoUrl ? (
                <img 
                  src={directLogoUrl} 
                  alt="5 Star Direct" 
                  className="h-24 object-contain hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-grill-gold">
                  <span className="text-2xl font-bold">5 Star Direct</span>
                  <div className="text-4xl">🔥</div>
                </div>
              )}
            </div>
            <Button 
              asChild
              className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black"
            >
              <Link to="/order" className="flex items-center justify-center">
                Order Direct
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPartners;

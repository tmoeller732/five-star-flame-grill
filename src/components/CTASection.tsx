
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    const element = document.querySelector('.cta-section');
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="relative py-20 cta-section overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2274" alt="Restaurant interior" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-grill-black via-transparent to-grill-black" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 font-playfair transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Quality Food at <span className="text-grill-gold">Affordable Prices</span>
          </h2>
          
          <p className={`text-gray-300 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Whether you're joining us for breakfast, lunch, or dinner, we're ready to serve you delicious meals made from high-quality ingredients. Open seven days a week for dine-in, pick-up or delivery.
          </p>
          
          <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button asChild className="bg-grill-gold hover:bg-grill-orange text-grill-black text-lg px-6 py-6">
              <Link to="/order">
                Order Now
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6">
              <a href="tel:+18565594938">
                <Phone className="mr-2" size={18} />
                (856) 559-4938
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

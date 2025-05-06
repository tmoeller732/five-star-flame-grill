
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedItem = ({ 
  image, 
  title, 
  description, 
  tag,
  delay = "0"
}: {
  image: string;
  title: string;
  description: string;
  tag: string;
  delay?: string;
}) => {
  return (
    <div 
      className={`menu-item bg-grill-brown/20 rounded-lg overflow-hidden opacity-0 animate-fade-in`} 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-48 md:h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-grill-gold text-grill-black rounded-full text-sm font-medium mb-3">
          {tag}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Link 
          to="/menu" 
          className="inline-flex items-center text-grill-gold hover:text-grill-orange transition-colors"
        >
          View Details <ArrowRight className="ml-1" size={16} />
        </Link>
      </div>
    </div>
  );
};

const Featured = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    const elements = document.querySelectorAll('.menu-item');
    elements.forEach(element => observer.observe(element));
    
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  // Using direct Unsplash images for reliability and uploaded burger image
  const staticImages = {
    cheesesteak: "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?q=80&w=2187",
    breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2380",
    spanish: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=2340"
  };

  return (
    <section id="featured" className="py-20 bg-grain bg-grill-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            Our Signature <span className="text-grill-gold">Specialties</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            From NY-style breakfast sandwiches to authentic Spanish cuisine and everything in between, our diverse menu satisfies every craving.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeaturedItem 
            image={staticImages.breakfast}
            title="NY-Style Breakfast Sandwiches"
            description="Warm, freshly-made sandwiches with sizzling eggs, crispy bacon, and melted cheese on perfectly toasted bread."
            tag="Breakfast"
            delay="0.1"
          />
          <FeaturedItem 
            image={staticImages.cheesesteak}
            title="Signature Cheesesteaks"
            description="Tender, flavorful steak with grilled onions, peppers, and the perfect layer of melted cheese, served on a fresh roll."
            tag="Lunch"
            delay="0.3"
          />
          <FeaturedItem 
            image={staticImages.spanish}
            title="Authentic Spanish Cuisine"
            description="Savory rice and bean platters and perfectly seasoned grilled meats that transport you to the streets of Barcelona."
            tag="Dinner"
            delay="0.5"
          />
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            asChild
            className="bg-grill-gold hover:bg-grill-orange text-grill-black"
          >
            <Link to="/menu">
              See Full Menu <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Featured;

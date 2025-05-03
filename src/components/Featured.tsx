
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

  // Using direct Unsplash images for reliability
  const staticImages = {
    steak: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2264",
    breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2380",
    burger: "https://images.unsplash.com/photo-1513271075334-039ed3c51b18?q=80&w=2419"
  };

  return (
    <section id="featured" className="py-20 bg-grain bg-grill-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            Our Featured <span className="text-grill-gold">Specialties</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience our signature dishes prepared on our flame grill, showcasing the best of breakfast, lunch, and dinner options.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeaturedItem 
            image={staticImages.steak}
            title="Flame-Grilled Steak"
            description="Premium Angus beef grilled to perfection, served with roasted vegetables and your choice of side."
            tag="Dinner"
            delay="0.1"
          />
          <FeaturedItem 
            image={staticImages.breakfast}
            title="Sunrise Breakfast Platter"
            description="Eggs your way, smoked bacon, sausage, grilled tomatoes, and toast with homemade jam."
            tag="Breakfast"
            delay="0.3"
          />
          <FeaturedItem 
            image={staticImages.burger}
            title="Gourmet Grilled Burger"
            description="Half-pound Angus burger with aged cheddar, caramelized onions, and our signature sauce."
            tag="Lunch"
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

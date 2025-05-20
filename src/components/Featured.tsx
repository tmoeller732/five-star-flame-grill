
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MENU_ITEMS } from '../data/menuItems';
import { MenuItemProps } from './menu/MenuItem';

const FeaturedItem = ({ 
  image, 
  title, 
  description, 
  tag,
  price,
  delay = "0"
}: {
  image: string;
  title: string;
  description: string;
  tag: string;
  price: number;
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white mr-2">{title}</h3>
          <span className="font-medium text-grill-gold">${price.toFixed(2)}</span>
        </div>
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
  const [featuredItems, setFeaturedItems] = useState<MenuItemProps[]>([]);
  
  useEffect(() => {
    // Get random items from different categories
    const getRandomItem = (category: string) => {
      const categoryItems = MENU_ITEMS.filter(item => item.category === category);
      const randomIndex = Math.floor(Math.random() * categoryItems.length);
      return categoryItems[randomIndex];
    };
    
    const breakfast = getRandomItem('breakfast');
    const lunch = getRandomItem('lunch');
    const bowls = getRandomItem('bowls');
    
    setFeaturedItems([breakfast, lunch, bowls]);
    
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

  // Set fallback images in case menu items don't have images yet
  const fallbackImages = [
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2380",
    "https://images.unsplash.com/photo-1600628421055-4d30de868b8f?q=80&w=2187",
    "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=2340"
  ];

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
          {featuredItems.map((item, index) => (
            <FeaturedItem 
              key={item.id}
              image={item.imageUrl || fallbackImages[index]}
              title={item.name}
              description={item.description}
              tag={item.category === 'breakfast' ? 'Breakfast' : 
                   item.category === 'lunch' ? 'Lunch/Dinner' : 
                   'Bowls & Salads'}
              price={item.price}
              delay={`0.${index + 1}`}
            />
          ))}
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

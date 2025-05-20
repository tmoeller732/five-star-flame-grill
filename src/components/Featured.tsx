
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MENU_ITEMS } from '../data/menuItems';
import { MenuItemProps } from './menu/MenuItem';
import { loadCachedMenuImages } from './menu/MenuImageLoader';

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
          src={image || '/placeholder.svg'} 
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
    try {
      // Try to get cached menu items with images first
      const cachedItems = loadCachedMenuImages();
      const itemsToUse = cachedItems || MENU_ITEMS;
      
      // Find menu items with images
      const itemsWithImages = itemsToUse.filter(item => item && item.imageUrl);
      
      // Get random items from different categories with images
      const getRandomItemWithImage = (category: string) => {
        const categoryItems = itemsWithImages.filter(item => item && item.category === category);
        // If no items with images in this category, fall back to all items in category
        if (categoryItems.length === 0) {
          const allCategoryItems = itemsToUse.filter(item => item && item.category === category);
          if (allCategoryItems.length === 0) {
            // Return a default item if no items found in this category
            return {
              id: 0,
              name: "Menu Item",
              description: "Description unavailable",
              price: 0,
              category: category as 'breakfast' | 'lunch' | 'bowls',
              imageUrl: "/placeholder.svg"
            };
          }
          const randomIndex = Math.floor(Math.random() * allCategoryItems.length);
          return allCategoryItems[randomIndex];
        }
        const randomIndex = Math.floor(Math.random() * categoryItems.length);
        return categoryItems[randomIndex];
      };
      
      const breakfast = getRandomItemWithImage('breakfast');
      const lunch = getRandomItemWithImage('lunch');
      const bowls = getRandomItemWithImage('bowls');
      
      if (breakfast && lunch && bowls) {
        setFeaturedItems([breakfast, lunch, bowls]);
      }
      
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
      
      setTimeout(() => {
        const elements = document.querySelectorAll('.menu-item');
        elements.forEach(element => observer.observe(element));
      }, 100);
      
      return () => {
        const elements = document.querySelectorAll('.menu-item');
        elements.forEach(element => observer.unobserve(element));
      };
    } catch (error) {
      console.error("Error in Featured component:", error);
      // Set default items in case of error
      setFeaturedItems([]);
    }
  }, []);

  // Don't render if no featured items
  if (featuredItems.length === 0) {
    return null;
  }

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
              image={item.imageUrl || '/placeholder.svg'}
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

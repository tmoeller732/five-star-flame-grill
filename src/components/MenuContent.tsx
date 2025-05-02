
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import runwareService from '../services/RunwareService';
import { toast } from "sonner";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  popular?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  // Breakfast Items
  { 
    id: 1, 
    name: "Classic American Breakfast", 
    description: "Two eggs your way, crispy bacon, home fries, and toast", 
    price: 12.99, 
    imageUrl: "", 
    category: "breakfast",
    popular: true
  },
  { 
    id: 2, 
    name: "Buttermilk Pancakes", 
    description: "Fluffy pancakes served with maple syrup and butter", 
    price: 10.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 3, 
    name: "Smoked Salmon Benedict", 
    description: "English muffin topped with smoked salmon, poached eggs, and hollandaise", 
    price: 15.99, 
    imageUrl: "", 
    category: "breakfast",
    popular: true
  },
  { 
    id: 4, 
    name: "Veggie Omelette", 
    description: "Three egg omelette with bell peppers, onions, mushrooms, and cheddar cheese", 
    price: 13.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  
  // Lunch Items
  { 
    id: 5, 
    name: "Angus Burger", 
    description: "8oz Angus beef patty with lettuce, tomato, onion, and special sauce on a brioche bun", 
    price: 16.99, 
    imageUrl: "", 
    category: "lunch",
    popular: true
  },
  { 
    id: 6, 
    name: "Grilled Chicken Caesar Salad", 
    description: "Romaine lettuce, grilled chicken, parmesan, croutons, and Caesar dressing", 
    price: 14.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 7, 
    name: "Philly Cheesesteak", 
    description: "Thinly sliced ribeye with grilled onions, peppers, and provolone on a hoagie roll", 
    price: 15.99, 
    imageUrl: "", 
    category: "lunch",
    popular: true
  },
  { 
    id: 8, 
    name: "Fish Tacos", 
    description: "Grilled mahi-mahi with cabbage slaw, pico de gallo, and chipotle aioli in corn tortillas", 
    price: 17.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  
  // Dinner Items
  { 
    id: 9, 
    name: "New York Strip Steak", 
    description: "12oz USDA Prime steak, grilled to perfection, served with mashed potatoes and seasonal vegetables", 
    price: 32.99, 
    imageUrl: "", 
    category: "dinner",
    popular: true
  },
  { 
    id: 10, 
    name: "Grilled Atlantic Salmon", 
    description: "Fresh salmon fillet with lemon herb butter, wild rice, and asparagus", 
    price: 26.99, 
    imageUrl: "", 
    category: "dinner" 
  },
  { 
    id: 11, 
    name: "Chicken Parmesan", 
    description: "Breaded chicken breast topped with marinara and mozzarella, served with pasta", 
    price: 22.99, 
    imageUrl: "", 
    category: "dinner",
    popular: true
  },
  { 
    id: 12, 
    name: "Vegetable Stir Fry", 
    description: "Seasonal vegetables and tofu in a savory sauce, served over jasmine rice", 
    price: 19.99, 
    imageUrl: "", 
    category: "dinner" 
  }
];

const MenuContent = () => {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const generateMenuImages = async () => {
      if (menuItems.some(item => item.imageUrl)) return; // Skip if we already have images
      
      setIsLoading(true);
      try {
        const updatedItems = [...menuItems];
        
        for (const item of updatedItems) {
          if (!item.imageUrl) {
            try {
              const result = await runwareService.generateImage({
                positivePrompt: `Professional food photography of ${item.name}, ${item.description}, gourmet restaurant quality, extreme close-up, bokeh background, high definition`,
                width: 512,
                height: 512
              });
              
              if (result.imageURL) {
                item.imageUrl = result.imageURL;
                // Update state incrementally to show images as they're generated
                setMenuItems([...updatedItems]);
              }
            } catch (err) {
              console.error("Failed to generate image for:", item.name, err);
              // Continue with other items even if one fails
            }
          }
        }
      } catch (error) {
        console.error("Error generating images:", error);
        toast.error("Failed to generate some menu images");
      } finally {
        setIsLoading(false);
      }
    };

    generateMenuImages();
  }, []);
  
  const filteredItems = menuItems.filter(item => item.category === activeTab);
  const popularItems = menuItems.filter(item => item.popular);
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Our Menu</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Savor the finest flavors prepared on our signature grill. From hearty breakfasts to elegant dinners, 
          each dish is crafted with premium ingredients and expert technique.
        </p>
      </div>
      
      {/* Featured items section */}
      <div className="mb-16">
        <h2 className="text-3xl font-playfair text-grill-gold text-center mb-8">Featured Selections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularItems.map(item => (
            <Card key={item.id} className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 menu-item">
              <div className="aspect-video overflow-hidden bg-muted">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="animate-pulse bg-secondary/20 w-full h-full"></div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-xl text-grill-gold">{item.name}</h3>
                  <span className="font-medium text-lg text-white">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <Button className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black">
                  Add to Order
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Menu tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
        </TabsList>
        
        {["breakfast", "lunch", "dinner"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <Card key={item.id} className="overflow-hidden bg-card hover:shadow-lg transition-all duration-300 menu-item">
                  <div className="aspect-video overflow-hidden bg-muted">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <div className="animate-pulse bg-secondary/20 w-full h-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair text-xl text-grill-gold">{item.name}</h3>
                      <span className="font-medium text-lg text-white">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                    <Button className="w-full bg-grill-gold hover:bg-grill-orange text-grill-black">
                      Add to Order
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuContent;

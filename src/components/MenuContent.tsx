
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MENU_ITEMS } from '../data/menuItems';
import FeaturedItems from './menu/FeaturedItems';
import CategoryItems from './menu/CategoryItems';
import { generateMenuImages } from './menu/MenuImageLoader';
import { MenuItemProps } from './menu/MenuItem';
import { toast } from "sonner";

const MenuContent = () => {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>(MENU_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadMenuImages = async () => {
      try {
        setIsLoading(true);
        console.log("Loading menu images...");
        
        // Generate images for all menu items
        const updatedItems = await generateMenuImages(menuItems);
        setMenuItems(updatedItems);
      } catch (error) {
        console.error("Error loading menu images:", error);
        toast.error("Could not load menu images");
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuImages();
  }, []);
  
  // Safely filter items, handling potential undefined values
  const filteredItems = menuItems.filter(item => item && item.category === activeTab);
  const popularItems = menuItems.filter(item => item && item.popular);
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Our Menu</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Savor the finest flavors prepared on our signature grill. From hearty breakfasts to authentic Mexican cuisine, 
          each dish is crafted with premium ingredients and expert technique.
        </p>
      </div>
      
      {/* Featured items section */}
      <FeaturedItems items={popularItems} />
      
      {/* Menu tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch/Dinner</TabsTrigger>
          <TabsTrigger value="bowls">Bowls & Salads</TabsTrigger>
        </TabsList>
        
        {["breakfast", "lunch", "bowls"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-grill-gold text-center mb-4">
                {category === "breakfast" ? "Breakfast Menu" : 
                 category === "lunch" ? "Lunch/Dinner Menu" : 
                 "Bowls & Salads"}
              </h2>
            </div>
            <CategoryItems items={filteredItems} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuContent;

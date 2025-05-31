
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MENU_ITEMS } from '../data/menuItems';
import FeaturedItems from './menu/FeaturedItems';
import CategoryItems from './menu/CategoryItems';
import { generateMenuImages } from './menu/MenuImageLoader';
import { MenuItemProps } from './menu/MenuItem';
import { supabase } from '@/integrations/supabase/client';

const MenuContent = () => {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>(MENU_ITEMS);
  const [popularItems, setPopularItems] = useState<MenuItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadMenuImages = async () => {
      try {
        setIsLoading(true);
        console.log("Loading static menu images...");
        
        // Assign static images to all menu items
        const updatedItems = await generateMenuImages(menuItems);
        setMenuItems(updatedItems);
        
        // Fetch most popular items from user views
        await fetchMostPopularItems(updatedItems);
      } catch (error) {
        console.error("Error loading menu images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuImages();
  }, []);

  const fetchMostPopularItems = async (items: MenuItemProps[]) => {
    try {
      // Query the user_viewed_items table to get the most viewed items
      const { data: viewedItems, error } = await supabase
        .from('user_viewed_items')
        .select('menu_item_id, COUNT(*) as view_count')
        .group('menu_item_id')
        .order('view_count', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching popular items:', error);
        // Fallback to items marked as popular in the data
        const fallbackPopular = items.filter(item => item && item.popular).slice(0, 3);
        setPopularItems(fallbackPopular);
        return;
      }

      // Map the most viewed items to our menu items
      const popularMenuItems: MenuItemProps[] = [];
      
      if (viewedItems && viewedItems.length > 0) {
        viewedItems.forEach((viewedItem: any) => {
          const menuItem = items.find(item => item.id === viewedItem.menu_item_id);
          if (menuItem) {
            popularMenuItems.push(menuItem);
          }
        });
      }

      // If we don't have enough popular items from views, fill with items marked as popular
      if (popularMenuItems.length < 3) {
        const remainingSlots = 3 - popularMenuItems.length;
        const fallbackItems = items
          .filter(item => item && item.popular && !popularMenuItems.find(p => p.id === item.id))
          .slice(0, remainingSlots);
        
        popularMenuItems.push(...fallbackItems);
      }

      // If still not enough, add any random items to fill the spots
      if (popularMenuItems.length < 3) {
        const remainingSlots = 3 - popularMenuItems.length;
        const randomItems = items
          .filter(item => item && !popularMenuItems.find(p => p.id === item.id))
          .slice(0, remainingSlots);
        
        popularMenuItems.push(...randomItems);
      }

      setPopularItems(popularMenuItems.slice(0, 3));
    } catch (error) {
      console.error('Error in fetchMostPopularItems:', error);
      // Fallback to items marked as popular in the data
      const fallbackPopular = items.filter(item => item && item.popular).slice(0, 3);
      setPopularItems(fallbackPopular);
    }
  };
  
  // Safely filter items, handling potential undefined values
  const filteredItems = menuItems.filter(item => item && item.category === activeTab);
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-grill-gold">Our Menu</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Savor the finest flavors prepared on our signature grill. From hearty breakfasts to authentic Mexican cuisine, 
          each dish is crafted with premium ingredients and expert technique.
        </p>
      </div>
      
      {/* Most Popular Items section */}
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

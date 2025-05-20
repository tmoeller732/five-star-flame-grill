
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MENU_ITEMS } from '../data/menuItems';
import FeaturedItems from './menu/FeaturedItems';
import CategoryItems from './menu/CategoryItems';
import { generateMenuImages, loadCachedMenuImages, generateImagesWithRunware, clearCachedMenuImages } from './menu/MenuImageLoader';
import { MenuItemProps } from './menu/MenuItem';
import { toast } from "sonner";

const MenuContent = () => {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>(MENU_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  useEffect(() => {
    const loadMenuImages = async () => {
      try {
        setIsLoading(true);
        
        // Clear cache first to ensure we get fresh images
        clearCachedMenuImages();
        
        // Generate new images
        console.log("Loading menu images");
        const updatedItems = await generateMenuImages(menuItems);
        console.log("Menu items with images:", updatedItems);
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
  
  // Enable admin interface with a secret key combo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press 'Ctrl+Shift+A' to toggle admin interface
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
        if (!showAdmin) {
          toast.info("Admin interface enabled");
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdmin]);
  
  const handleGenerateImages = async () => {
    if (confirm("This will use Runware to generate new images for menu items. Continue?")) {
      try {
        setIsLoading(true);
        toast.info("Generating images with Runware. Check console for results.");
        await generateImagesWithRunware(MENU_ITEMS);
      } catch (error) {
        console.error("Error generating images:", error);
        toast.error("Failed to generate images");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRefreshImages = async () => {
    try {
      setIsLoading(true);
      clearCachedMenuImages();
      toast.info("Refreshing menu images...");
      const updatedItems = await generateMenuImages(MENU_ITEMS);
      setMenuItems(updatedItems);
      toast.success("Menu images refreshed!");
    } catch (error) {
      console.error("Error refreshing images:", error);
      toast.error("Failed to refresh images");
    } finally {
      setIsLoading(false);
    }
  };
  
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
        
        <div className="mt-4">
          <Button 
            onClick={handleRefreshImages}
            disabled={isLoading}
            className="bg-grill-gold hover:bg-grill-orange text-grill-black"
          >
            {isLoading ? "Refreshing..." : "Refresh Menu Images"}
          </Button>
        </div>
        
        {showAdmin && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-md">
            <h2 className="text-red-400 mb-2">Admin Interface</h2>
            <Button 
              onClick={handleGenerateImages}
              disabled={isLoading}
              className="bg-red-700 hover:bg-red-800"
            >
              {isLoading ? "Processing..." : "Generate Images with Runware"}
            </Button>
            <p className="text-sm text-gray-400 mt-2">
              Generated image URLs will appear in the browser console. Add them to STATIC_MENU_IMAGES in MenuImageLoader.ts
            </p>
          </div>
        )}
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

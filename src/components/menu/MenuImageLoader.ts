
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";
import runwareService from '../../services/RunwareService';

// Define static image URLs for menu items - these will be the same for all users
const STATIC_MENU_IMAGES = {
  // Breakfast items
  "#1 'CLASSIC' EGG & CHEESE": "https://im.runware.ai/image/ii/822bf26b-9117-4d04-9354-5eec8f9dc34c.WEBP",
  "#2 EGG & CHEESE W/MEAT": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#3 STEAK EGG & CHEESE": "https://im.runware.ai/image/ii/3827222d-7c9e-4111-b179-be6f950a4aaa.WEBP",
  "#4 WESTERN OMELET SANDWICH": "https://im.runware.ai/image/ii/0d030efb-c51a-4589-b0e4-1059ab205139.WEBP",
  "#5 CLASSIC BREAKFAST PLATE": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#6 BREAKFAST PLATE W/MEAT": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#7 BAGEL WITH BUTTER": "https://im.runware.ai/image/ii/3827222d-7c9e-4111-b179-be6f950a4aaa.WEBP",
  "#8 BAGEL WITH CREAM CHEESE": "https://im.runware.ai/image/ii/3827222d-7c9e-4111-b179-be6f950a4aaa.WEBP",
  "#9 HOME FRIES": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#10 HASH BROWN": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#11 EXTRA MEAT": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#12 AVOCADO": "https://im.runware.ai/image/ii/3827222d-7c9e-4111-b179-be6f950a4aaa.WEBP",
  
  // Lunch/Dinner items
  "#1 Chorizo Tacos": "https://im.runware.ai/image/ii/d77d49dc-c694-4edd-9fa6-f6acb3527216.WEBP",
  "#2 Chicken Tacos": "https://im.runware.ai/image/ii/d77d49dc-c694-4edd-9fa6-f6acb3527216.WEBP",
  "#3 Steak Tacos": "https://im.runware.ai/image/ii/d77d49dc-c694-4edd-9fa6-f6acb3527216.WEBP",
  "#4 Chorizo Burrito": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#5 Chicken Burrito": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#6 Steak Burrito": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#7 Smash Burger": "https://im.runware.ai/image/ii/a7fb47a3-f06e-4158-8805-d22d6affb6fe.WEBP",
  "#8 Beef Burger": "https://im.runware.ai/image/ii/02d30d43-f0c4-4ccc-b19d-93f592054c9d.WEBP",
  "#9 Chicken Sandwich": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#10 Steak Quesadilla": "https://im.runware.ai/image/ii/dc9f0872-ee13-42f8-b1c4-759cdbdf1f6f.WEBP",
  "#11 Chicken Quesadilla": "https://im.runware.ai/image/ii/dc9f0872-ee13-42f8-b1c4-759cdbdf1f6f.WEBP",
  "#12 Steak Torta": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#13 Chorizo Torta": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#14 Chicken Torta": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#15 Philly Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "#16 Chicken Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "#17 California Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "#18 Chicken Wings": "https://im.runware.ai/image/ii/5be288e2-1b00-4647-956b-b143a10d81af.WEBP",
  "#19 Chicken Nuggets": "https://im.runware.ai/image/ii/5be288e2-1b00-4647-956b-b143a10d81af.WEBP",
  "#20 Chicken Tenders & Fries": "https://im.runware.ai/image/ii/5be288e2-1b00-4647-956b-b143a10d81af.WEBP",
  "#21 Turkey & Cheese": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#22 Ham & Cheese": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#23 Roast Beef": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "#24 French Fries": "https://im.runware.ai/image/ii/02d30d43-f0c4-4ccc-b19d-93f592054c9d.WEBP",
  "#25 Cheese Fries": "https://im.runware.ai/image/ii/02d30d43-f0c4-4ccc-b19d-93f592054c9d.WEBP",
  "#26 Onion Rings": "https://im.runware.ai/image/ii/02d30d43-f0c4-4ccc-b19d-93f592054c9d.WEBP",
  
  // Bowls & Salads
  "#1 CHICKEN BURRITO BOWL": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#2 CHORIZO BURRITO BOWL": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#3 STEAK BURRITO BOWL": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#4 ICEBERG SALAD": "https://im.runware.ai/image/ii/7ca60825-3883-436b-9743-22e9bbf704e4.WEBP",
  "#5 ROMAINE SALAD": "https://im.runware.ai/image/ii/7ca60825-3883-436b-9743-22e9bbf704e4.WEBP",
  "#6 GARDEN SALAD": "https://im.runware.ai/image/ii/7ca60825-3883-436b-9743-22e9bbf704e4.WEBP",
  "#7 CAESAR SALAD": "https://im.runware.ai/image/ii/1189e400-bc2a-4358-857d-5b7dc9588a62.WEBP",
  "#8 CHICKEN TACO SALAD": "https://im.runware.ai/image/ii/187b4643-0f8f-4964-aaf9-718f9c45b584.WEBP",
  "#9 CHORIZO TACO SALAD": "https://im.runware.ai/image/ii/187b4643-0f8f-4964-aaf9-718f9c45b584.WEBP",
  "#10 STEAK TACO SALAD": "https://im.runware.ai/image/ii/187b4643-0f8f-4964-aaf9-718f9c45b584.WEBP",
  
  // Default fallback image
  "default": "/placeholder.svg"
};

// Remove any previously cached menu items to force regeneration
export const clearCachedMenuImages = () => {
  localStorage.removeItem('menuItemsWithImages');
};

// This function will be used by admin to generate images once
export const generateImagesWithRunware = async (menuItems: MenuItemProps[]) => {
  try {
    const updatedItems = [...menuItems];
    let generated = 0;
    
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      if (!STATIC_MENU_IMAGES[item.name]) {
        try {
          console.log(`Generating image for ${item.name}...`);
          const result = await runwareService.generateImage({
            positivePrompt: `Professional food photography of ${item.name}, ${item.description}, gourmet restaurant quality, extreme close-up, bokeh background, high definition`,
            width: 1024,
            height: 1024
          });
          
          if (result.imageURL) {
            console.log(`Image generated for ${item.name}: ${result.imageURL}`);
            console.log(`ADD THIS TO STATIC_MENU_IMAGES: "${item.name}": "${result.imageURL}",`);
            generated++;
          }
        } catch (err) {
          console.error("Failed to generate image for:", item.name, err);
        }
      }
    }
    
    toast.success(`Generated ${generated} new menu item images. Copy the URLs from the console.`);
    
  } catch (error) {
    console.error("Error generating images:", error);
    toast.error("Failed to generate menu images");
  }
};

export const generateMenuImages = async (menuItems: MenuItemProps[]) => {
  try {
    // Force clear cache to ensure all users get consistent images
    clearCachedMenuImages();
    
    const updatedItems = [...menuItems];
    
    // Assign static images to menu items based on their names
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      // Look up the image in our static mapping, or use default if not found
      const staticImageUrl = STATIC_MENU_IMAGES[item.name] || STATIC_MENU_IMAGES.default;
      
      console.log(`Assigning static image for ${item.name}: ${staticImageUrl}`);
      updatedItems[i] = {
        ...item,
        imageUrl: staticImageUrl
      };
    }
    
    // Store the menu items with static images in localStorage for faster loading next time
    localStorage.setItem('menuItemsWithImages', JSON.stringify(updatedItems));
    
    return updatedItems;
  } catch (error) {
    console.error("Error assigning static images:", error);
    toast.error("Failed to load menu images");
    return menuItems;
  }
};

// Function to load cached menu items with images
export const loadCachedMenuImages = () => {
  try {
    const cachedItems = localStorage.getItem('menuItemsWithImages');
    return cachedItems ? JSON.parse(cachedItems) : null;
  } catch (error) {
    console.error("Error loading cached menu items:", error);
    return null;
  }
};

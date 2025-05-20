
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";
import runwareService from '../../services/RunwareService';

// Define static image URLs for menu items - these will be the same for all users
const STATIC_MENU_IMAGES = {
  // Breakfast items
  "Breakfast Sandwich": "/static/images/breakfast-sandwich.jpg",
  "Breakfast Platter": "/static/images/breakfast-platter.jpg",
  "Avocado Toast": "/static/images/avocado-toast.jpg",
  "Omelette": "/static/images/omelette.jpg",
  
  // Lunch/Dinner items
  "Signature Cheesesteak": "/static/images/cheesesteak.jpg",
  "Smash Burger": "/static/images/smash-burger.jpg",
  "Spanish Paella": "/static/images/paella.jpg",
  "Fish Tacos": "/static/images/fish-tacos.jpg",
  
  // Bowls & Salads
  "Chicken Bowl": "/static/images/chicken-bowl.jpg",
  "Steak Bowl": "/static/images/steak-bowl.jpg",
  "Cesar Salad": "/static/images/cesar-salad.jpg",
  "Mediterranean Salad": "/static/images/mediterranean-salad.jpg",
  
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
    // First check if we already have cached images
    const cachedItems = loadCachedMenuImages();
    if (cachedItems) {
      console.log("Using cached menu items with images");
      return cachedItems;
    }
    
    const updatedItems = [...menuItems];
    
    // Assign static images to menu items based on their names
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      if (!item.imageUrl) {
        // Look up the image in our static mapping, or use default if not found
        const staticImageUrl = STATIC_MENU_IMAGES[item.name] || STATIC_MENU_IMAGES.default;
        
        console.log(`Assigning static image for ${item.name}: ${staticImageUrl}`);
        updatedItems[i] = {
          ...item,
          imageUrl: staticImageUrl
        };
      }
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



import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";
import runwareService from '../../services/RunwareService';

// Static menu image URLs that are consistent for all users
// These will be used after being generated once with Runware
const STATIC_MENU_IMAGES = {
  // Each menu item will have a consistent image URL added here
  // after the first generation using Runware
};

// Generate images for menu items using Runware
export const generateImagesWithRunware = async (menuItems: MenuItemProps[]) => {
  try {
    const updatedItems = [...menuItems];
    let generated = 0;
    
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      
      try {
        // First check if we already have a static image for this item
        if (STATIC_MENU_IMAGES[item.id]) {
          console.log(`Using static image for ${item.name}: ${STATIC_MENU_IMAGES[item.id]}`);
          updatedItems[i] = {
            ...item,
            imageUrl: STATIC_MENU_IMAGES[item.id]
          };
          continue;
        }
        
        console.log(`Generating image for ${item.name}...`);
        const result = await runwareService.generateImage({
          positivePrompt: `Professional food photography of ${item.name}, ${item.description}, gourmet restaurant quality, extreme close-up, bokeh background, high definition`,
          width: 1024,
          height: 1024
        });
        
        if (result.imageURL) {
          console.log(`Image generated for ${item.name}: ${result.imageURL}`);
          updatedItems[i] = {
            ...item,
            imageUrl: result.imageURL
          };
          generated++;
          
          // Uncomment this in development once to generate URLs
          // then hard-code them in STATIC_MENU_IMAGES
          // console.log(`STATIC_MENU_IMAGES[${item.id}] = "${result.imageURL}";`);
        }
      } catch (err) {
        console.error("Failed to generate image for:", item.name, err);
      }
    }
    
    if (generated > 0) {
      toast.success(`Generated ${generated} menu item images.`);
    }
    return updatedItems;
    
  } catch (error) {
    console.error("Error generating images:", error);
    toast.error("Failed to generate menu images");
    return menuItems;
  }
};

// Function to load cached menu images
export const loadCachedMenuImages = () => {
  try {
    // Check for static images first
    const hasStaticImages = Object.keys(STATIC_MENU_IMAGES).length > 0;
    if (hasStaticImages) {
      return null; // Return null to trigger generation with static images
    }
    
    const cachedItems = localStorage.getItem('menuItemsWithImages');
    return cachedItems ? JSON.parse(cachedItems) : null;
  } catch (error) {
    console.error("Error loading cached menu items:", error);
    return null;
  }
};

// Generate menu images - uses Runware to generate images for all items only once
export const generateMenuImages = async (menuItems: MenuItemProps[]) => {
  try {
    // Check if we have cached items first
    const cachedItems = loadCachedMenuImages();
    if (cachedItems) {
      console.log("Using cached menu items with images");
      return cachedItems;
    }
    
    // If no cached items, generate new images
    console.log("No cached images found, generating new images with Runware");
    const items = await generateImagesWithRunware(menuItems);
    
    // Save to localStorage as backup, but prefer static URLs
    localStorage.setItem('menuItemsWithImages', JSON.stringify(items));
    
    return items;
  } catch (error) {
    console.error("Error generating menu images:", error);
    toast.error("Failed to load menu images");
    return menuItems;
  }
};

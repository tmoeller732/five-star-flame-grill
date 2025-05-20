
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";
import runwareService from '../../services/RunwareService';

// Clear cached menu images to force new image generation
export const clearCachedMenuImages = () => {
  localStorage.removeItem('menuItemsWithImages');
};

// Generate images for menu items using Runware
export const generateImagesWithRunware = async (menuItems: MenuItemProps[]) => {
  try {
    const updatedItems = [...menuItems];
    let generated = 0;
    
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      
      try {
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
        }
      } catch (err) {
        console.error("Failed to generate image for:", item.name, err);
      }
    }
    
    toast.success(`Generated ${generated} new menu item images.`);
    localStorage.setItem('menuItemsWithImages', JSON.stringify(updatedItems));
    return updatedItems;
    
  } catch (error) {
    console.error("Error generating images:", error);
    toast.error("Failed to generate menu images");
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

// Generate menu images - uses Runware to generate images for all items
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
    return await generateImagesWithRunware(menuItems);
  } catch (error) {
    console.error("Error generating menu images:", error);
    toast.error("Failed to load menu images");
    return menuItems;
  }
};

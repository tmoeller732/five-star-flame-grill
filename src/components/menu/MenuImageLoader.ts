
import runwareService from '../../services/RunwareService';
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";

// Remove any previously cached menu items to force regeneration
export const clearCachedMenuImages = () => {
  localStorage.removeItem('menuItemsWithImages');
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
    let anyImagesGenerated = false;
    
    for (let i = 0; i < updatedItems.length; i++) {
      const item = updatedItems[i];
      if (!item.imageUrl) {
        try {
          console.log(`Generating image for ${item.name}...`);
          const result = await runwareService.generateImage({
            positivePrompt: `Professional food photography of ${item.name}, ${item.description}, gourmet restaurant quality, extreme close-up, bokeh background, high definition`,
            width: 512,
            height: 512
          });
          
          if (result.imageURL) {
            console.log(`Image generated for ${item.name}: ${result.imageURL}`);
            updatedItems[i] = {
              ...item,
              imageUrl: result.imageURL
            };
            anyImagesGenerated = true;
          }
        } catch (err) {
          console.error("Failed to generate image for:", item.name, err);
          // Continue with other items even if one fails
        }
      }
    }
    
    if (anyImagesGenerated) {
      // Store generated images in localStorage to avoid regenerating them
      localStorage.setItem('menuItemsWithImages', JSON.stringify(updatedItems));
    }
    
    return updatedItems;
  } catch (error) {
    console.error("Error generating images:", error);
    toast.error("Failed to generate some menu images");
    return menuItems;
  }
};

// Function to load cached menu items with images
export const loadCachedMenuImages = () => {
  const cachedItems = localStorage.getItem('menuItemsWithImages');
  return cachedItems ? JSON.parse(cachedItems) : null;
};

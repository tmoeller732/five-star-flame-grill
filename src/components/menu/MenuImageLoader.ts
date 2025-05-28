
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";
import runwareService from '../../services/RunwareService';

// Static menu image URLs that are consistent for all users
// These will be used after being generated once with Runware
const STATIC_MENU_IMAGES: Record<number, string> = {
  // Breakfast items
  2: "/lovable-uploads/ba333c2d-418a-46d2-90fc-3d2eea29f4e2.png", // #2 EGG & CHEESE W/MEAT
  5: "/lovable-uploads/b369f913-1a26-4603-80ad-9f5c4b543de7.png", // #5 CLASSIC BREAKFAST PLATE (egg & cheese)
  
  // Lunch/Dinner items
  16: "/lovable-uploads/0bb5bd35-cbe4-45c5-a384-cebda05d5fef.png", // #4 Chorizo Burrito
  19: "/lovable-uploads/77ef296c-9173-4533-97e1-85cacb65110a.png", // #7 Smash Burger
  27: "/lovable-uploads/10cee1c0-7c1a-4ef7-adb6-4e67ea383e79.png", // #15 Philly Cheesesteak
  38: "/lovable-uploads/fdd4faf9-1373-48a9-ba98-36679fbc644d.png", // #26 Onion Rings
  
  // Bowls & Salads
  40: "/lovable-uploads/d47c4ca4-82f4-4f4e-b3c1-dcb268245077.png", // #2 CHORIZO BURRITO BOWL
  41: "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png", // #3 STEAK BURRITO BOWL
  
  // Additional items that could match the uploaded images
  24: "/lovable-uploads/ace242e7-03ef-472d-9227-df6d70a34c5e.png", // #12 Steak Torta
  14: "/lovable-uploads/14aa238b-6aaf-443a-a340-204a07e411e7.png", // #2 Chicken Tacos (burrito style)
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

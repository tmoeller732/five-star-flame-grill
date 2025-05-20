
import { MenuItemProps } from './MenuItem';
import { toast } from "sonner";
import runwareService from '../../services/RunwareService';

// Define static image URLs for menu items - these will be the same for all users
const STATIC_MENU_IMAGES = {
  // Breakfast items
  "Breakfast Sandwich": "https://im.runware.ai/image/ii/822bf26b-9117-4d04-9354-5eec8f9dc34c.WEBP",
  "Breakfast Platter": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "Avocado Toast": "https://im.runware.ai/image/ii/3827222d-7c9e-4111-b179-be6f950a4aaa.WEBP",
  "Omelette": "https://im.runware.ai/image/ii/0d030efb-c51a-4589-b0e4-1059ab205139.WEBP",
  
  // Lunch/Dinner items
  "Signature Cheesesteak": "https://im.runware.ai/image/ii/5d0d84c5-6f3d-4fff-9b5b-2f29778151c9.WEBP",
  "Smash Burger": "https://im.runware.ai/image/ii/a7fb47a3-f06e-4158-8805-d22d6affb6fe.WEBP",
  "Spanish Paella": "https://im.runware.ai/image/ii/60f1d981-b146-40e9-b0fa-4373b963085e.WEBP",
  "Fish Tacos": "https://im.runware.ai/image/ii/486c88a5-e2b0-4858-b864-d847cc7bfa19.WEBP",
  "Chicken Quesadilla": "https://im.runware.ai/image/ii/dc9f0872-ee13-42f8-b1c4-759cdbdf1f6f.WEBP",
  "Philly Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "Grilled BBQ Ribs": "https://im.runware.ai/image/ii/b6768e84-1080-4601-99cd-2f43c88e0d5e.WEBP",
  "Beef Burger": "https://im.runware.ai/image/ii/02d30d43-f0c4-4ccc-b19d-93f592054c9d.WEBP",
  "Taco Platter": "https://im.runware.ai/image/ii/d77d49dc-c694-4edd-9fa6-f6acb3527216.WEBP",
  "Grilled Steak": "https://im.runware.ai/image/ii/5444012e-ca06-4ffd-a2a1-10925e2543ed.WEBP",
  
  // Bowls & Salads
  "Chicken Bowl": "https://im.runware.ai/image/ii/fa8d9b55-cee5-4682-a39c-0594f99d3ea3.WEBP",
  "Steak Bowl": "https://im.runware.ai/image/ii/c67bd848-85f8-410f-8118-1905e8d57245.WEBP",
  "Cesar Salad": "https://im.runware.ai/image/ii/1189e400-bc2a-4358-857d-5b7dc9588a62.WEBP",
  "Mediterranean Salad": "https://im.runware.ai/image/ii/46a5f9f9-14e4-4346-a288-96e88cccc910.WEBP",
  "Quinoa Bowl": "https://im.runware.ai/image/ii/495e527d-e64c-4910-8ae8-0c30c27e27b8.WEBP",
  "Garden Salad": "https://im.runware.ai/image/ii/7ca60825-3883-436b-9743-22e9bbf704e4.WEBP",
  "Poke Bowl": "https://im.runware.ai/image/ii/6555e415-ccd1-4959-ac9b-f835b288235c.WEBP",
  "Cobb Salad": "https://im.runware.ai/image/ii/1620cf8a-7763-479b-9b1c-f22e7c6d6023.WEBP",
  "Buddha Bowl": "https://im.runware.ai/image/ii/e2abf3e0-c11d-4cdf-9b1c-7db167c6a7fe.WEBP",
  "Greek Salad": "https://im.runware.ai/image/ii/4cd9b1b8-f6c6-46b3-9bc2-69de37994c4c.WEBP",
  "Burrito Bowl": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "Waldorf Salad": "https://im.runware.ai/image/ii/0354a0cd-2c91-48c5-91cf-7a54fb9678a9.WEBP",
  "Acai Bowl": "https://im.runware.ai/image/ii/d433d7bb-77ca-4dcf-a614-33d7b4af88a1.WEBP",
  "Spinach Salad": "https://im.runware.ai/image/ii/30fc2f3f-a8f0-47f8-9200-c994ada9859b.WEBP",
  "Power Bowl": "https://im.runware.ai/image/ii/132c71e1-2142-45dc-9565-4bec1a484a3f.WEBP",
  "Asian Fusion Salad": "https://im.runware.ai/image/ii/61709fc5-04c9-435b-ac66-d6868b2098d5.WEBP",
  "Breakfast Bowl": "https://im.runware.ai/image/ii/28fad783-be57-4578-82a0-c540f4b3edcc.WEBP",
  "Taco Salad": "https://im.runware.ai/image/ii/187b4643-0f8f-4964-aaf9-718f9c45b584.WEBP",
  "Veggie Bowl": "https://im.runware.ai/image/ii/9e987c55-6044-45d7-8538-f904327a8e38.WEBP",
  "Chicken Caesar Wrap": "https://im.runware.ai/image/ii/8f24c365-79b1-4693-8157-c508c4f428c5.WEBP",
  "Grain Bowl": "https://im.runware.ai/image/ii/0af721f3-d22d-45ce-ace4-30a451208b8c.WEBP",
  "Fruit Salad": "https://im.runware.ai/image/ii/7f8682bc-6d0c-4ebc-aaaf-20a38219c519.WEBP",
  "Mexican Bowl": "https://im.runware.ai/image/ii/865cc6c1-db33-4689-89c9-dae845a3b7c8.WEBP",
  "Grilled Chicken Salad": "https://im.runware.ai/image/ii/5be288e2-1b00-4647-956b-b143a10d81af.WEBP",
  "Rice Bowl": "https://im.runware.ai/image/ii/ee833910-eba2-4c3d-a43d-49e590311f0b.WEBP",
  "Southwest Salad": "https://im.runware.ai/image/ii/c649523f-1270-4780-a6d0-7ff9be670ee7.WEBP",
  "Teriyaki Bowl": "https://im.runware.ai/image/ii/53884578-345e-413d-8e0e-803fd16c53ad.WEBP",
  "Caprese Salad": "https://im.runware.ai/image/ii/bfa11858-61df-454a-9cf6-aab3ec31aeff.WEBP",
  "Protein Bowl": "https://im.runware.ai/image/ii/cae08cca-9a3a-4973-b367-3de4298c6284.WEBP",
  "Chef Salad": "https://im.runware.ai/image/ii/ff1092c0-f655-47cf-a01a-71a24992bef6.WEBP",
  "Buddha Bowl Deluxe": "https://im.runware.ai/image/ii/1b2b132a-9352-4027-b1d0-1fccbc9eecf6.WEBP",
  "Superfood Salad": "https://im.runware.ai/image/ii/4c9ddf26-642f-41c0-bdd4-51c7a557763e.WEBP",
  "Mediterranean Bowl": "https://im.runware.ai/image/ii/1e7b5b1e-1a27-4043-ae0b-8e9309522d1d.WEBP",
  "Keto Bowl": "https://im.runware.ai/image/ii/3caca178-0f2d-46bc-8514-aa54ccb4c8f0.WEBP",
  
  // Now let's add mappings for our actual menu item names
  "#1 'CLASSIC' EGG & CHEESE": "https://im.runware.ai/image/ii/822bf26b-9117-4d04-9354-5eec8f9dc34c.WEBP",
  "#2 EGG & CHEESE W/MEAT": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#3 STEAK EGG & CHEESE": "https://im.runware.ai/image/ii/0d030efb-c51a-4589-b0e4-1059ab205139.WEBP",
  "#4 WESTERN OMELET SANDWICH": "https://im.runware.ai/image/ii/0d030efb-c51a-4589-b0e4-1059ab205139.WEBP",
  "#5 CLASSIC BREAKFAST PLATE": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#6 BREAKFAST PLATE W/MEAT": "https://im.runware.ai/image/ii/d3a4f8ab-b4f9-4571-8934-b4e1f346c988.WEBP",
  "#7 BAGEL WITH BUTTER": "https://im.runware.ai/image/ii/822bf26b-9117-4d04-9354-5eec8f9dc34c.WEBP",
  "#8 BAGEL WITH CREAM CHEESE": "https://im.runware.ai/image/ii/822bf26b-9117-4d04-9354-5eec8f9dc34c.WEBP",
  
  // Lunch items
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
  "#15 Philly Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "#16 Chicken Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "#17 California Cheesesteak": "https://im.runware.ai/image/ii/1d4c1afc-9f12-428b-b101-71faf949a8b6.WEBP",
  "#18 Chicken Wings": "https://im.runware.ai/image/ii/b6768e84-1080-4601-99cd-2f43c88e0d5e.WEBP",
  
  // Bowls & Salads
  "#1 CHICKEN BURRITO BOWL": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#2 CHORIZO BURRITO BOWL": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#3 STEAK BURRITO BOWL": "https://im.runware.ai/image/ii/cce3a605-22b7-4e50-8127-a4b6f058c548.WEBP",
  "#4 ICEBERG SALAD": "https://im.runware.ai/image/ii/7ca60825-3883-436b-9743-22e9bbf704e4.WEBP",
  "#5 ROMAINE SALAD": "https://im.runware.ai/image/ii/1189e400-bc2a-4358-857d-5b7dc9588a62.WEBP",
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
  console.log("Clearing cached menu images");
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
    
    console.log("No cached menu items found, assigning images to menu items");
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


import { MenuItemProps } from './MenuItem';

// Static menu image URLs using your uploaded images
const STATIC_MENU_IMAGES: Record<number, string> = {
  // Breakfast items
  1: "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png", // Classic Egg & Cheese
  2: "/lovable-uploads/14aa238b-6aaf-443a-a340-204a07e411e7.png", // Egg & Cheese w/Meat
  3: "/lovable-uploads/0bb5bd35-cbe4-45c5-a384-cebda05d5fef.png", // Steak Egg & Cheese
  4: "/lovable-uploads/b369f913-1a26-4603-80ad-9f5c4b543de7.png", // Western Omelet
  5: "/lovable-uploads/ace242e7-03ef-472d-9227-df6d70a34c5e.png", // Classic Breakfast Plate
  6: "/lovable-uploads/d47c4ca4-82f4-4f4e-b3c1-dcb268245077.png", // Breakfast Plate w/Meat
  7: "/lovable-uploads/ba333c2d-418a-46d2-90fc-3d2eea29f4e2.png", // Bagel with Butter
  8: "/lovable-uploads/fdd4faf9-1373-48a9-ba98-36679fbc644d.png", // Bagel with Cream Cheese
  9: "/lovable-uploads/77ef296c-9173-4533-97e1-85cacb65110a.png", // Home Fries
  10: "/lovable-uploads/10cee1c0-7c1a-4ef7-adb6-4e67ea383e79.png", // Hash Brown
  
  // Lunch/Dinner items - using your uploaded images where available, fallback to stock
  13: "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png", // Chorizo Tacos
  14: "/lovable-uploads/14aa238b-6aaf-443a-a340-204a07e411e7.png", // Chicken Tacos
  15: "/lovable-uploads/0bb5bd35-cbe4-45c5-a384-cebda05d5fef.png", // Steak Tacos
  16: "/lovable-uploads/b369f913-1a26-4603-80ad-9f5c4b543de7.png", // Chorizo Burrito
  17: "/lovable-uploads/ace242e7-03ef-472d-9227-df6d70a34c5e.png", // Chicken Burrito
  18: "/lovable-uploads/d47c4ca4-82f4-4f4e-b3c1-dcb268245077.png", // Steak Burrito
  19: "/lovable-uploads/ba333c2d-418a-46d2-90fc-3d2eea29f4e2.png", // Smash Burger
  20: "/lovable-uploads/fdd4faf9-1373-48a9-ba98-36679fbc644d.png", // Beef Burger
  21: "/lovable-uploads/77ef296c-9173-4533-97e1-85cacb65110a.png", // Chicken Sandwich
  22: "/lovable-uploads/10cee1c0-7c1a-4ef7-adb6-4e67ea383e79.png", // Steak Quesadilla
  23: "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png", // Chicken Quesadilla
  24: "/lovable-uploads/14aa238b-6aaf-443a-a340-204a07e411e7.png", // Steak Torta
  25: "/lovable-uploads/0bb5bd35-cbe4-45c5-a384-cebda05d5fef.png", // Chorizo Torta
  26: "/lovable-uploads/b369f913-1a26-4603-80ad-9f5c4b543de7.png", // Chicken Torta
  27: "/lovable-uploads/ace242e7-03ef-472d-9227-df6d70a34c5e.png", // Philly Cheesesteak
  28: "/lovable-uploads/d47c4ca4-82f4-4f4e-b3c1-dcb268245077.png", // Chicken Cheesesteak
  29: "/lovable-uploads/ba333c2d-418a-46d2-90fc-3d2eea29f4e2.png", // California Cheesesteak
  30: "/lovable-uploads/fdd4faf9-1373-48a9-ba98-36679fbc644d.png", // Chicken Wings
  31: "/lovable-uploads/77ef296c-9173-4533-97e1-85cacb65110a.png", // Chicken Nuggets
  32: "/lovable-uploads/10cee1c0-7c1a-4ef7-adb6-4e67ea383e79.png", // Chicken Tenders & Fries
  33: "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png", // Turkey & Cheese
  34: "/lovable-uploads/14aa238b-6aaf-443a-a340-204a07e411e7.png", // Ham & Cheese
  35: "/lovable-uploads/0bb5bd35-cbe4-45c5-a384-cebda05d5fef.png", // Roast Beef
  36: "/lovable-uploads/b369f913-1a26-4603-80ad-9f5c4b543de7.png", // French Fries
  37: "/lovable-uploads/ace242e7-03ef-472d-9227-df6d70a34c5e.png", // Cheese Fries
  38: "/lovable-uploads/d47c4ca4-82f4-4f4e-b3c1-dcb268245077.png", // Onion Rings

  // Bowls & Salads
  39: "/lovable-uploads/ba333c2d-418a-46d2-90fc-3d2eea29f4e2.png", // Chicken Burrito Bowl
  40: "/lovable-uploads/fdd4faf9-1373-48a9-ba98-36679fbc644d.png", // Chorizo Burrito Bowl
  41: "/lovable-uploads/77ef296c-9173-4533-97e1-85cacb65110a.png", // Steak Burrito Bowl
  42: "/lovable-uploads/10cee1c0-7c1a-4ef7-adb6-4e67ea383e79.png", // Iceberg Salad
  43: "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png", // Romaine Salad
  44: "/lovable-uploads/14aa238b-6aaf-443a-a340-204a07e411e7.png", // Garden Salad
  45: "/lovable-uploads/0bb5bd35-cbe4-45c5-a384-cebda05d5fef.png", // Caesar Salad
  46: "/lovable-uploads/b369f913-1a26-4603-80ad-9f5c4b543de7.png", // Chicken Taco Salad
  47: "/lovable-uploads/ace242e7-03ef-472d-9227-df6d70a34c5e.png", // Chorizo Taco Salad
  48: "/lovable-uploads/d47c4ca4-82f4-4f4e-b3c1-dcb268245077.png", // Steak Taco Salad
};

// Load static menu images
export const loadCachedMenuImages = () => {
  return null; // Always return null to trigger static image assignment
};

// Generate menu images - now just assigns your uploaded images
export const generateMenuImages = async (menuItems: MenuItemProps[]) => {
  try {
    console.log("Assigning your uploaded images to menu items");
    
    const updatedItems = menuItems.map(item => ({
      ...item,
      imageUrl: STATIC_MENU_IMAGES[item.id] || "/lovable-uploads/ec42cff8-73a2-4ad9-a63c-94a6e5769dfe.png"
    }));
    
    return updatedItems;
  } catch (error) {
    console.error("Error assigning uploaded images:", error);
    return menuItems;
  }
};

import { MenuItemProps } from './MenuItem';

// Static menu image URLs using your uploaded images matched by product names
const STATIC_MENU_IMAGES: Record<number, string> = {
  // Breakfast items
  1: "/lovable-uploads/7d3c07e6-bba7-4f52-bbab-c222ee0abc4a.png", // Classic Egg & Cheese
  2: "/lovable-uploads/8827be8c-ca1e-4166-bde8-82ec8341d368.png", // Egg & Cheese w/Meat
  3: "/lovable-uploads/73b38622-1859-437c-8db8-296794bfdfbf.png", // Steak Egg & Cheese
  4: "/lovable-uploads/343280a0-5555-4dcf-914f-62588a49652e.png", // Western Omelet
  5: "/lovable-uploads/90c63af3-f433-495a-840c-1b3259cb76c0.png", // Classic Breakfast Plate
  6: "/lovable-uploads/3c6b206f-2590-49b4-a4c3-be6247dbae49.png", // Breakfast Plate w/Meat
  7: "/lovable-uploads/d1748119-a22b-43d0-82fc-537b4be9622c.png", // Bagel with Butter
  8: "/lovable-uploads/391b5531-0fc7-4ab1-b8a2-03ddf9c1d951.png", // Bagel with Cream Cheese
  9: "/lovable-uploads/4c45e36b-c3c1-4b89-acc7-ebf5632cf279.png", // Home Fries
  10: "/lovable-uploads/b4dc910e-1e29-48ee-a1d7-86f86394bba1.png", // Hash Brown
  11: "/lovable-uploads/22006ae6-85f3-4442-93d6-cf7445f90909.png", // Extra Meat
  12: "/lovable-uploads/3018387e-4c80-4288-8050-b2ec99ec1e01.png", // Avocado
  
  // Lunch/Dinner items
  13: "/lovable-uploads/a0935d79-0fe9-4b5e-b973-ca5e5b489636.png", // Chorizo Tacos
  14: "/lovable-uploads/fc484edd-6493-4f48-a6e9-bdf6b0372a25.png", // Chicken Tacos
  15: "/lovable-uploads/40feca39-22a1-451e-9a21-7c80a2112ca1.png", // Steak Tacos
  16: "/lovable-uploads/66818be7-aa88-4356-b8de-36e6f9bee28a.png", // Chorizo Burrito
  17: "/lovable-uploads/edbdc67e-988a-48f1-9ada-58151da1c3d8.png", // Chicken Burrito
  18: "/lovable-uploads/283a4f73-dfd3-4b54-9540-64ff05343ace.png", // Steak Burrito
  19: "/lovable-uploads/b117cf44-c026-48fb-95a4-173f1cdb5dfc.png", // Smash Burger
  20: "/lovable-uploads/f7997e84-c600-4b8b-815d-d668e914a93b.png", // Beef Burger
  21: "/lovable-uploads/c351f719-1e0e-4967-8880-e05286140d4e.png", // Chicken Sandwich
  22: "/lovable-uploads/b7fa3319-8094-476b-9277-4bdcfdef2bb9.png", // Steak Quesadilla
  23: "/lovable-uploads/a6638500-303e-48f6-9ab7-18b0bdc4f523.png", // Chicken Quesadilla
  24: "/lovable-uploads/2418b9e0-1513-4883-ae1b-f835ac0707ec.png", // Steak Torta
  25: "/lovable-uploads/fe7e1054-b826-4f82-bf6d-39bdd926b73e.png", // Chorizo Torta
  26: "/lovable-uploads/90ec4069-3135-497e-8788-5fa7346d7db1.png", // Chicken Torta
  27: "/lovable-uploads/46218ea0-2d66-45c3-b931-42fbaa354636.png", // Philly Cheesesteak
  28: "/lovable-uploads/342c0916-b1ac-4740-ba82-0899133adca1.png", // Chicken Cheesesteak
  29: "/lovable-uploads/9fbae82d-8125-47d9-aaf0-71aeedd70e40.png", // California Cheesesteak
  30: "/lovable-uploads/90796269-77d0-489e-bf63-94bff8bffb1d.png", // Chicken Wings
  31: "/lovable-uploads/44b48b4c-5338-4e9a-8a50-d61d23e2fdc2.png", // Chicken Nuggets
  32: "/lovable-uploads/96f36f38-218f-48a8-93eb-ba26e9cbaa4c.png", // Chicken Tenders & Fries
  33: "/lovable-uploads/1d5950ff-f5f9-408a-813b-67fcda786a9f.png", // Turkey & Cheese
  34: "/lovable-uploads/af396862-acc0-48c8-98ec-39fe5f8e3e8e.png", // Ham & Cheese
  35: "/lovable-uploads/e013a387-db8b-4f72-a653-b566f3e3255c.png", // Roast Beef
  36: "/lovable-uploads/b962bdf4-dda1-464d-9a2c-592a7ca7a7f1.png", // French Fries
  37: "/lovable-uploads/a98dca21-627a-447d-8974-c267c8a4d7f7.png", // Cheese Fries
  38: "/lovable-uploads/d0834d60-1a92-492a-9f20-effad479e27c.png", // Onion Rings
  
  // Bowls & Salads
  39: "/lovable-uploads/290d10fc-b8f7-4c28-a607-360fbce2bf4e.png", // Chicken Burrito Bowl
  40: "/lovable-uploads/4889753a-7939-4c28-885e-2ece522173fd.png", // Chorizo Burrito Bowl
  41: "/lovable-uploads/ec3cfe56-abe0-4897-b7fe-9c334494a8ba.png", // Steak Burrito Bowl
  42: "/lovable-uploads/dd9df0d5-96b5-4048-9fc7-84e1d66679e5.png", // Iceberg Salad
  43: "/lovable-uploads/07edd3ca-3375-40d5-b5e1-50ed23e4ed6f.png", // Romaine Salad
  44: "/lovable-uploads/5a5c0d03-5982-42b7-9a0c-2bcc68841cc8.png", // Garden Salad
  45: "/lovable-uploads/1e539b2f-7778-4b53-908c-534d935e243c.png", // Caesar Salad
  46: "/lovable-uploads/fde690f2-1316-48ce-888b-8fc66e7c5b52.png", // Chicken Taco Salad
  47: "/lovable-uploads/859c1e67-5d3e-44f3-9bba-729751aec974.png", // Chorizo Taco Salad
  48: "/lovable-uploads/a43ad802-f88b-4a11-82e7-4fe8675b0bbe.png", // Steak Taco Salad
};

// Load static menu images
export const loadCachedMenuImages = () => {
  return null; // Always return null to trigger static image assignment
};

// Generate menu images - now uses your uploaded images where available
export const generateMenuImages = async (menuItems: MenuItemProps[]) => {
  try {
    console.log("Assigning your uploaded images to matching menu items");
    
    const updatedItems = menuItems.map(item => ({
      ...item,
      imageUrl: STATIC_MENU_IMAGES[item.id] || "/placeholder.svg"
    }));
    
    return updatedItems;
  } catch (error) {
    console.error("Error assigning uploaded images:", error);
    return menuItems;
  }
};

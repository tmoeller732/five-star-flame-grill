import { MenuItemProps } from './MenuItem';

// Static menu image URLs using your uploaded images matched by product names
const STATIC_MENU_IMAGES: Record<number, string> = {
  // Breakfast items
  1: "/lovable-uploads/7d3c07e6-bba7-4f52-bbab-c222ee0abc4a.png", // Classic Egg & Cheese
  2: "/lovable-uploads/8827be8c-ca1e-4166-bde8-82ec8341d368.png", // Egg & Cheese w/Meat
  3: "/lovable-uploads/73b38622-1859-437c-8db8-296794bfdfbf.png", // Steak Egg & Cheese
  4: "/lovable-uploads/343280a0-5555-4dcf-914f-62588a49652e.png", // Western Omelet
  5: "/placeholder.svg", // Classic Breakfast Plate - no matching image
  6: "/placeholder.svg", // Breakfast Plate w/Meat - no matching image
  7: "/placeholder.svg", // Bagel with Butter - no matching image
  8: "/placeholder.svg", // Bagel with Cream Cheese - no matching image
  9: "/placeholder.svg", // Home Fries - no matching image
  10: "/placeholder.svg", // Hash Brown - no matching image
  
  // Lunch/Dinner items
  13: "/lovable-uploads/a0935d79-0fe9-4b5e-b973-ca5e5b489636.png", // Chorizo Tacos
  14: "/placeholder.svg", // Chicken Tacos - no matching image
  15: "/placeholder.svg", // Steak Tacos - no matching image
  16: "/lovable-uploads/66818be7-aa88-4356-b8de-36e6f9bee28a.png", // Chorizo Burrito
  17: "/lovable-uploads/2a39dd31-a26a-4b20-9634-b93b6b8e7b39.png", // Chicken Burrito
  18: "/lovable-uploads/c7e46825-73ef-40bd-8cb0-fa6e4b8a772d.png", // Steak Burrito
  19: "/lovable-uploads/b117cf44-c026-48fb-95a4-173f1cdb5dfc.png", // Smash Burger
  20: "/placeholder.svg", // Beef Burger - no matching image
  21: "/placeholder.svg", // Chicken Sandwich - no matching image
  22: "/placeholder.svg", // Steak Quesadilla - no matching image
  23: "/placeholder.svg", // Chicken Quesadilla - no matching image
  24: "/lovable-uploads/2418b9e0-1513-4883-ae1b-f835ac0707ec.png", // Steak Torta
  25: "/lovable-uploads/fe7e1054-b826-4f82-bf6d-39bdd926b73e.png", // Chorizo Torta
  26: "/placeholder.svg", // Chicken Torta - no matching image
  27: "/lovable-uploads/46218ea0-2d66-45c3-b931-42fbaa354636.png", // Philly Cheesesteak
  28: "/placeholder.svg", // Chicken Cheesesteak - no matching image
  29: "/placeholder.svg", // California Cheesesteak - no matching image
  30: "/placeholder.svg", // Chicken Wings - no matching image
  31: "/placeholder.svg", // Chicken Nuggets - no matching image
  32: "/placeholder.svg", // Chicken Tenders & Fries - no matching image
  33: "/placeholder.svg", // Turkey & Cheese - no matching image
  34: "/placeholder.svg", // Ham & Cheese - no matching image
  35: "/placeholder.svg", // Roast Beef - no matching image
  36: "/placeholder.svg", // French Fries - no matching image
  37: "/placeholder.svg", // Cheese Fries - no matching image
  38: "/lovable-uploads/8e958574-1ee0-464d-84a6-722c15c49192.png", // Onion Rings

  // Bowls & Salads
  39: "/lovable-uploads/290d10fc-b8f7-4c28-a607-360fbce2bf4e.png", // Chicken Burrito Bowl
  40: "/placeholder.svg", // Chorizo Burrito Bowl - no matching image
  41: "/lovable-uploads/ec3cfe56-abe0-4897-b7fe-9c334494a8ba.png", // Steak Burrito Bowl
  42: "/placeholder.svg", // Iceberg Salad - no matching image
  43: "/placeholder.svg", // Romaine Salad - no matching image
  44: "/lovable-uploads/5a5c0d03-5982-42b7-9a0c-2bcc68841cc8.png", // Garden Salad
  45: "/lovable-uploads/1e539b2f-7778-4b53-908c-534d935e243c.png", // Caesar Salad
  46: "/lovable-uploads/fde690f2-1316-48ce-888b-8fc66e7c5b52.png", // Chicken Taco Salad
  47: "/lovable-uploads/859c1e67-5d3e-44f3-9bba-729751aec974.png", // Chorizo Taco Salad
  48: "/placeholder.svg", // Steak Taco Salad - no matching image
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

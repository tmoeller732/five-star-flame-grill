
import { MenuItemProps } from './MenuItem';

// Static menu image URLs using stock images from the internet
const STATIC_MENU_IMAGES: Record<number, string> = {
  // Breakfast items
  1: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400", // Classic Egg & Cheese
  2: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400", // Egg & Cheese w/Meat
  3: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", // Steak Egg & Cheese
  4: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400", // Western Omelet
  5: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400", // Classic Breakfast Plate
  6: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400", // Breakfast Plate w/Meat
  7: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", // Bagel with Butter
  8: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", // Bagel with Cream Cheese
  9: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400", // Home Fries
  10: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400", // Hash Brown
  
  // Lunch/Dinner items
  13: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=400", // Chorizo Tacos
  14: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400", // Chicken Tacos
  15: "https://images.unsplash.com/photo-1551782450-17144efb5c50?w=400", // Steak Tacos
  16: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400", // Chorizo Burrito
  17: "https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=400", // Chicken Burrito
  18: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=400", // Steak Burrito
  19: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", // Smash Burger
  20: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400", // Beef Burger
  21: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400", // Chicken Sandwich
  22: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400", // Steak Quesadilla
  23: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", // Chicken Quesadilla
  24: "https://images.unsplash.com/photo-1619740455993-8c4c03c0bb57?w=400", // Steak Torta
  25: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400", // Chorizo Torta
  26: "https://images.unsplash.com/photo-1619740455993-8c4c03c0bb57?w=400", // Chicken Torta
  27: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400", // Philly Cheesesteak
  28: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400", // Chicken Cheesesteak
  29: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400", // California Cheesesteak
  30: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400", // Chicken Wings
  31: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400", // Chicken Nuggets
  32: "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=400", // Chicken Tenders & Fries
  33: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400", // Turkey & Cheese
  34: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400", // Ham & Cheese
  35: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400", // Roast Beef
  36: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", // French Fries
  37: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400", // Cheese Fries
  38: "https://images.unsplash.com/photo-1639744211787-9cb99ce9bbe1?w=400", // Onion Rings

  // Bowls & Salads
  39: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", // Chicken Burrito Bowl
  40: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", // Chorizo Burrito Bowl
  41: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", // Steak Burrito Bowl
  42: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", // Iceberg Salad
  43: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", // Romaine Salad
  44: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", // Garden Salad
  45: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400", // Caesar Salad
  46: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", // Chicken Taco Salad
  47: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", // Chorizo Taco Salad
  48: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400", // Steak Taco Salad
};

// Load static menu images
export const loadCachedMenuImages = () => {
  return null; // Always return null to trigger static image assignment
};

// Generate menu images - now just assigns static images
export const generateMenuImages = async (menuItems: MenuItemProps[]) => {
  try {
    console.log("Assigning static images to menu items");
    
    const updatedItems = menuItems.map(item => ({
      ...item,
      imageUrl: STATIC_MENU_IMAGES[item.id] || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400"
    }));
    
    return updatedItems;
  } catch (error) {
    console.error("Error assigning static images:", error);
    return menuItems;
  }
};

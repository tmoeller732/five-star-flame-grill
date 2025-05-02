
import { MenuItemProps } from '../components/menu/MenuItem';

export const MENU_ITEMS: MenuItemProps[] = [
  // Breakfast Items
  { 
    id: 1, 
    name: "Classic American Breakfast", 
    description: "Two eggs your way, crispy bacon, home fries, and toast", 
    price: 12.99, 
    imageUrl: "", 
    category: "breakfast",
    popular: true
  },
  { 
    id: 2, 
    name: "Buttermilk Pancakes", 
    description: "Fluffy pancakes served with maple syrup and butter", 
    price: 10.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 3, 
    name: "Smoked Salmon Benedict", 
    description: "English muffin topped with smoked salmon, poached eggs, and hollandaise", 
    price: 15.99, 
    imageUrl: "", 
    category: "breakfast",
    popular: true
  },
  { 
    id: 4, 
    name: "Veggie Omelette", 
    description: "Three egg omelette with bell peppers, onions, mushrooms, and cheddar cheese", 
    price: 13.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  
  // Lunch Items
  { 
    id: 5, 
    name: "Angus Burger", 
    description: "8oz Angus beef patty with lettuce, tomato, onion, and special sauce on a brioche bun", 
    price: 16.99, 
    imageUrl: "", 
    category: "lunch",
    popular: true
  },
  { 
    id: 6, 
    name: "Grilled Chicken Caesar Salad", 
    description: "Romaine lettuce, grilled chicken, parmesan, croutons, and Caesar dressing", 
    price: 14.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 7, 
    name: "Philly Cheesesteak", 
    description: "Thinly sliced ribeye with grilled onions, peppers, and provolone on a hoagie roll", 
    price: 15.99, 
    imageUrl: "", 
    category: "lunch",
    popular: true
  },
  { 
    id: 8, 
    name: "Fish Tacos", 
    description: "Grilled mahi-mahi with cabbage slaw, pico de gallo, and chipotle aioli in corn tortillas", 
    price: 17.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  
  // Dinner Items
  { 
    id: 9, 
    name: "New York Strip Steak", 
    description: "12oz USDA Prime steak, grilled to perfection, served with mashed potatoes and seasonal vegetables", 
    price: 32.99, 
    imageUrl: "", 
    category: "dinner",
    popular: true
  },
  { 
    id: 10, 
    name: "Grilled Atlantic Salmon", 
    description: "Fresh salmon fillet with lemon herb butter, wild rice, and asparagus", 
    price: 26.99, 
    imageUrl: "", 
    category: "dinner" 
  },
  { 
    id: 11, 
    name: "Chicken Parmesan", 
    description: "Breaded chicken breast topped with marinara and mozzarella, served with pasta", 
    price: 22.99, 
    imageUrl: "", 
    category: "dinner",
    popular: true
  },
  { 
    id: 12, 
    name: "Vegetable Stir Fry", 
    description: "Seasonal vegetables and tofu in a savory sauce, served over jasmine rice", 
    price: 19.99, 
    imageUrl: "", 
    category: "dinner" 
  }
];

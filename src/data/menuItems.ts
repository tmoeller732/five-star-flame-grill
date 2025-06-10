import { MenuItemProps } from '../components/menu/MenuItem';

export const MENU_ITEMS: MenuItemProps[] = [
  // Breakfast Items - Sandwiches & Plates
  { 
    id: 1, 
    name: "#1 'CLASSIC' EGG & CHEESE", 
    description: "roll, croissant, or bagel", 
    price: 5.99, 
    imageUrl: "", 
    category: "breakfast"
  },
  { 
    id: 2, 
    name: "#2 EGG & CHEESE W/MEAT", 
    description: "bacon, turkey bacon, sausage", 
    price: 8.79, 
    imageUrl: "", 
    category: "breakfast",
    popular: true
  },
  { 
    id: 3, 
    name: "#3 STEAK EGG & CHEESE", 
    description: "roll, croissant, or bagel", 
    price: 9.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 4, 
    name: "#4 WESTERN OMELET SANDWICH", 
    description: "eggs, ham, onions, and bell peppers", 
    price: 8.49, 
    imageUrl: "", 
    category: "breakfast",
    popular: true
  },
  { 
    id: 5, 
    name: "#5 CLASSIC BREAKFAST PLATE", 
    description: "eggs, home fries, toast", 
    price: 7.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 6, 
    name: "#6 BREAKFAST PLATE W/MEAT", 
    description: "eggs, home fries, toast, choice of meat", 
    price: 10.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 7, 
    name: "#7 BAGEL WITH BUTTER", 
    description: "Fresh bagel served with butter", 
    price: 2.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 8, 
    name: "#8 BAGEL WITH CREAM CHEESE", 
    description: "Fresh bagel served with cream cheese", 
    price: 2.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  { 
    id: 9, 
    name: "#9 HOME FRIES", 
    description: "Seasoned diced potatoes", 
    price: 3.99, 
    imageUrl: "", 
    category: "breakfast" 
  },
  
  // Lunch/Dinner Menu
  { 
    id: 13, 
    name: "#1 Chorizo Tacos", 
    description: "Three soft corn tortillas filled with chorizo, fresh cilantro, onions, and lime.", 
    price: 12.99, 
    imageUrl: "", 
    category: "lunch",
    popular: true
  },
  { 
    id: 14, 
    name: "#2 Chicken Tacos", 
    description: "Three soft corn tortillas loaded with seasoned chicken, fresh cilantro, diced onions, and lime for authentic flavor!", 
    price: 12.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 15, 
    name: "#3 Steak Tacos", 
    description: "Three soft corn tortillas filled with savory grilled steak, topped with fresh cilantro, diced onions, and zesty lime!", 
    price: 14.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 16, 
    name: "#4 Chorizo Burrito", 
    description: "Hearty chorizo burrito packed with seasoned chorizo, lettuce, tomato, cheese, rice and beans wrapped in a warm flour tortilla.", 
    price: 11.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 17, 
    name: "#5 Chicken Burrito", 
    description: "Savory chicken burrito filled with tender chicken, lettuce, tomato, and cheese, rice and beans wrapped in a soft flour tortilla.", 
    price: 12.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 18, 
    name: "#6 Steak Burrito", 
    description: "Loaded steak burrito stuffed with grilled steak, fresh lettuce, tomato, cheese, rice and beans in a warm flour tortilla.", 
    price: 14.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 19, 
    name: "#7 Smash Burger", 
    description: "Delicious Angus beef smash burger, seared to perfection. Loaded with tender steak, melted cheese, grilled and served on a soft brioche bun.", 
    price: 9.99, 
    imageUrl: "", 
    category: "lunch",
    popular: true 
  },
  { 
    id: 20, 
    name: "#8 Beef Burger", 
    description: "Classic beef burger made with seasoned ground beef, grilled to perfection and served on a brioche bun with fresh toppings.", 
    price: 9.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 21, 
    name: "#9 Chicken Sandwich", 
    description: "Chicken sandwich-grilled or fried-served on a brioche bun with lettuce, tomato, mayo, and melted cheese.", 
    price: 11.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 22, 
    name: "#10 Steak Quesadilla", 
    description: "Grilled steak quesadilla loaded with melted cheese, served in a golden toasted tortilla with lettuce, tomato, pico, and sour cream.", 
    price: 14.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 23, 
    name: "#11 Chicken Quesadilla", 
    description: "Savory chicken quesadilla filled with melted cheese, served in a toasted tortilla.", 
    price: 12.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 24, 
    name: "#12 Steak Torta", 
    description: "Steak torta on toasted roll with lettuce, tomato, pico de gallo, sour cream, and melted cheese.", 
    price: 13.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 25, 
    name: "#13 Chorizo Torta", 
    description: "Stacked with spicy Mexican sausage, fresh avocado, lettuce, tomato, and mayo on a toasted bolillo roll.", 
    price: 12.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 26, 
    name: "#14 Chicken Torta", 
    description: "Chicken torta on a toasted roll with lettuce, tomato, pico de gallo, sour cream, and melted cheese.", 
    price: 10.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 27, 
    name: "#15 Philly Cheesesteak", 
    description: "Classic Philly cheesesteak with sautéed onions, peppers, and mushrooms on a toasted hoagie roll.", 
    price: 8.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 28, 
    name: "#16 Chicken Cheesesteak", 
    description: "Packed with grilled chicken, melted cheese, sautéed onions, peppers, and mushrooms on a toasted hoagie roll.", 
    price: 9.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 29, 
    name: "#17 California Cheesesteak", 
    description: "Served on a fresh roll with tender roast beef, crisp. Stacked with steak, melted cheese, lettuce, tomato, and lettuce, tomato, mayo, and a crunchy pickle spear.", 
    price: 10.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 30, 
    name: "#18 Chicken Wings", 
    description: "Our famous chicken wings-six per order-fried to crispy perfection, served hot and juicy, tossed in your choice of delicious, flavorful signature sauces.", 
    price: 8.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 31, 
    name: "#19 Chicken Nuggets", 
    description: "These chicken nuggets are amazing! Perfectly golden and crispy on the outside, tender and juicy on the inside.", 
    price: 6.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 32, 
    name: "#20 Chicken Tenders & Fries", 
    description: "The chicken tenders are fantastic-crispy, golden coating with juicy, flavorful chicken inside. Perfectly cooked and delicious with dipping sauce. Served with an order of fries.", 
    price: 10.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 33, 
    name: "#21 Turkey & Cheese", 
    description: "Served on a fresh roll with sliced turkey, melted cheese, crisp lettuce, tomato, mayo, and a crunchy pickle spear.", 
    price: 8.49, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 34, 
    name: "#22 Ham & Cheese", 
    description: "Served on a fresh roll with sliced ham, melted cheese, crisp lettuce, tomato, mayo, and a crunchy pickle spear.", 
    price: 8.49, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 35, 
    name: "#23 Roast Beef", 
    description: "Served on a fresh roll with sliced roast beef, crisp lettuce, tomato, and a crunchy pickle spear.", 
    price: 8.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 36, 
    name: "#24 French Fries", 
    description: "Golden, crispy french fries freshly cooked and lightly salted-served hot, delicious, and perfect for dipping or enjoying as a tasty side.", 
    price: 4.49, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 37, 
    name: "#25 Cheese Fries", 
    description: "Crispy golden fries topped generously with creamy melted American cheese-served hot and delicious, perfect for sharing or savoring solo!", 
    price: 6.99, 
    imageUrl: "", 
    category: "lunch" 
  },
  { 
    id: 38, 
    name: "#26 Onion Rings", 
    description: "Golden, crispy onion rings lightly battered and fried to perfection-hot, delicious, and great for dipping or as a tasty snack!", 
    price: 4.99, 
    imageUrl: "", 
    category: "lunch" 
  },

  // Bowls & Salads
  { 
    id: 39, 
    name: "#1 CHICKEN BURRITO BOWL", 
    description: "Grilled chicken, rice, beans, lettuce, tomato, pico de gio, sour cream, cheese", 
    price: 11.99, 
    imageUrl: "", 
    category: "bowls",
    popular: true
  },
  { 
    id: 40, 
    name: "#2 CHORIZO BURRITO BOWL", 
    description: "Chorizo, rice, beans, lettuce, tomato, pico de gio, sour cream, cheese", 
    price: 11.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 41, 
    name: "#3 STEAK BURRITO BOWL", 
    description: "Steak, rice, beans, lettuce, tomato, pico de gio, sour cream, cheese", 
    price: 14.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 42, 
    name: "#4 ICEBERG SALAD", 
    description: "Crisp iceberg lettuce with tomato, onion, cucumber, croutons, and your choice of dressing. A classic, refreshing salad. 32 OZ.", 
    price: 9.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 43, 
    name: "#5 ROMAINE SALAD", 
    description: "Fresh romaine lettuce topped with tomato, onion, cucumber, croutons, and your choice of dressing. 32 OZ.", 
    price: 9.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 44, 
    name: "#6 GARDEN SALAD", 
    description: "A fresh mix of crisp lettuces, topped with tomato, onion, cucumber, croutons, and your choice of dressing. A vibrant, classic favorite. 32 OZ.", 
    price: 9.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 45, 
    name: "#7 CAESAR SALAD", 
    description: "Crisp romaine lettuce tossed with creamy Caesar dressing, parmesan cheese, and crunchy croutons. A timeless classic. 32 OZ.", 
    price: 9.99, 
    imageUrl: "", 
    category: "bowls",
    popular: true
  },
  { 
    id: 46, 
    name: "#8 CHICKEN TACO SALAD", 
    description: "Grilled chicken, rice, beans, romaine lettuce, tomato, pico de gio, sour cream, cheese. Served in a fried taco shell bowl", 
    price: 12.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 47, 
    name: "#9 CHORIZO TACO SALAD", 
    description: "Chorizo, rice, beans, romaine lettuce, tomato, pico de gio, sour cream, cheese. Served in a fried taco shell bowl", 
    price: 12.99, 
    imageUrl: "", 
    category: "bowls" 
  },
  { 
    id: 48, 
    name: "#10 STEAK TACO SALAD", 
    description: "Steak, rice, beans, romaine lettuce, tomato, pico de gio, sour cream, cheese. Served in a fried taco shell bowl", 
    price: 14.99, 
    imageUrl: "", 
    category: "bowls" 
  }
];

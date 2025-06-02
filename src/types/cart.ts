
export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface CartItem {
  id: string;
  menuItemId: number;
  name: string;
  description: string;
  basePrice: number;
  quantity: number;
  customizations: CartCustomization[];
  totalPrice: number;
  category: 'breakfast' | 'lunch' | 'bowls';
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'totalPrice'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

export interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

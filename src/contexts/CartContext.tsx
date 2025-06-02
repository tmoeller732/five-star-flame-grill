
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartState, CartAction, CustomizationOption } from '../types/cart';
import { useCartPersistence } from '../hooks/useCartPersistence';

interface GuestData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  setGuestData: (data: GuestData) => void;
  guestData: GuestData | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      
      // Check if item with same customizations already exists
      const existingItemIndex = state.items.findIndex(item => 
        item.menuItemId === newItem.menuItemId &&
        JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { 
                ...item, 
                quantity: item.quantity + newItem.quantity,
                totalPrice: (item.quantity + newItem.quantity) * item.basePrice
              }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + newItem.quantity
        };
      } else {
        // Add new item
        const itemWithId: CartItem = {
          ...newItem,
          id: `${newItem.menuItemId}-${Date.now()}-${Math.random()}`,
          totalPrice: newItem.quantity * newItem.basePrice
        };

        return {
          ...state,
          items: [...state.items, itemWithId],
          itemCount: state.itemCount + newItem.quantity
        };
      }
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        itemCount: state.itemCount - itemToRemove.quantity
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;

      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId
            ? { ...item, quantity, totalPrice: quantity * item.basePrice }
            : item
        ),
        itemCount: state.itemCount + quantityDiff
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        itemCount: 0
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], itemCount: 0 });
  const [guestData, setGuestDataState] = React.useState<GuestData | null>(null);
  
  // Use the persistence hook
  useCartPersistence(state, dispatch);

  const addItem = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setGuestDataState(null);
  };

  const getCartTotal = (): number => {
    return state.items.reduce((total, item) => total + item.totalPrice, 0);
  };

  const setGuestData = (data: GuestData) => {
    setGuestDataState(data);
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    setGuestData,
    guestData
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import React, { createContext, useContext, useReducer } from 'react';
import { CartState, CartAction, CartContextType, CartItem } from '../types/cart';
import { useCartPersistence } from '../hooks/useCartPersistence';

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const calculateItemTotal = (item: Omit<CartItem, 'id' | 'totalPrice'>): number => {
  const customizationsTotal = item.customizations.reduce((sum, customization) => sum + customization.price, 0);
  return (item.basePrice + customizationsTotal) * item.quantity;
};

const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const totalPrice = calculateItemTotal(action.payload);
      
      const newItem: CartItem = {
        ...action.payload,
        id: newId,
        totalPrice,
      };

      const updatedItems = [...state.items, newItem];
      
      return {
        items: updatedItems,
        total: calculateCartTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        items: updatedItems,
        total: calculateCartTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item.id === action.payload.id) {
          const updatedItem = { ...item, quantity: action.payload.quantity };
          updatedItem.totalPrice = calculateItemTotal(updatedItem);
          return updatedItem;
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      return {
        items: updatedItems,
        total: calculateCartTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    case 'LOAD_CART':
      return action.payload;
    
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Set up cart persistence
  useCartPersistence(state, dispatch);

  const addItem = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => state.total;
  const getItemCount = () => state.itemCount;

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

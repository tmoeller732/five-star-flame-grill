
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

const CartContent = () => {
  const { state, updateQuantity, removeItem, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
        duration: 2000,
      });
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId);
    toast({
      title: "Item removed",
      description: `${itemName} has been removed from your cart.`,
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to place your order.",
        variant: "default"
      });
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  if (state.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full max-h-[60vh] md:max-h-96">
          <div className="space-y-4 pr-4">
            {state.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <Separator />
      
      <div className="space-y-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">${getCartTotal().toFixed(2)}</span>
        </div>
        
        {!user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              Sign in to place your order and enjoy 5 Star Grill!
            </p>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="flex-1"
          >
            Clear Cart
          </Button>
          <Button 
            onClick={handleCheckout}
            className="flex-1 bg-grill-gold hover:bg-grill-orange text-grill-black"
          >
            {user ? 'Checkout' : 'Sign In to Order'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
